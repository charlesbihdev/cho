<?php

namespace App\Http\Controllers;

use Exception;
use Inertia\Inertia;
use App\Models\Payment;
use App\Models\Variant;
use App\Models\Location;
use Illuminate\Http\Request;
use App\Services\CustomPaystack;
use App\Services\PaymentService;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{
    protected $paymentService;

    public function __construct(PaymentService $paymentService)
    {
        $this->paymentService = $paymentService;
    }

    public function redirectToGateway(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'phone' => 'required|regex:/^0\d{9}$/',
            'order_data' => 'required|array|min:1',
        ], [
            'order_data' => 'No food items in the cart.', // Custom error message
        ]);

        $orderData = $request->input('order_data');

        try {
            $totalAmount = 0;
            $deliveryFees = [];
            $locationIds = [];


            foreach ($orderData as $order) {
                $variantId = $order['variant_id'];
                $vendorId = $order['vendor_id'];
                $quantity = $order['quantity'];
                $locationId = $order['location_id'];

                // Fetch variant price
                $variant = Variant::findOrFail($variantId);
                $order['vendor_id'] = $variant->vendor_id;
                $variantPrice = $variant->price;

                // Check if the location is valid and corresponds to the vendor
                $location = Location::findOrFail($locationId);
                if ($location->vendor_id !== $variant->vendor_id && $variant->vendor_id !== $vendorId) {
                    return back()->with([
                        'error' => 'Selected location does not match the vendor of the food item.',
                    ]);
                }

                // Calculate subtotal for this item
                $subtotal = $variantPrice * $quantity;
                $totalAmount += $subtotal;

                // Add delivery fee if not already added for this location
                if (!in_array($locationId, $locationIds)) {
                    $deliveryFees[] = $location->amount; // Delivery fee for this location
                    $locationIds[] = $locationId; // Track unique location IDs
                }
            }


            // Sum up the delivery fees
            $totalDeliveryFee = array_sum($deliveryFees);

            // Calculate the final total amount
            $payableAmount = number_format($totalAmount + $totalDeliveryFee, 1);

            //paystack fee
            $serviceFee = 0.19 * $payableAmount;

            $payableAmount = ceil($payableAmount + $serviceFee);

            // dd($payableAmount);

            // Generate a unique transaction reference
            $reference = paystack()->genTranxRef();

            // Prepare payment data
            $paymentData = [
                'transaction_id' => $reference,
                "name" => $request->input('name'),
                "email" => $request->input('email'),
                'phone' => $request->input('phone'),
                'amount' => $payableAmount,
                'currency' => "GHS",
                'payment_reference' => $reference,
                'payment_method' => 'paystack',
                'payment_date' => now(),
                'status' => 'pending',
            ];

            // Prepare data for Paystack
            $data = [
                "amount" => $payableAmount * 100, // Convert to cedi
                "currency" => "GHS",
                "email" => $request->input('email'),
                "reference" => $reference,
                "callback_url" => route('paystack.callback'), // Define your callback route
                "metadata" => [
                    "name" => $request->input('name'),
                    "phone" => $request->input('phone'),
                    "email" => $request->input('email'),
                    "order_data" => $orderData,
                ],
            ];

            // Save the payment record
            Payment::create($paymentData);

            // Redirect to Paystack for authorization
            $url = paystack()->getAuthorizationUrl($data);

            return Inertia::location($url->url);
        } catch (Exception $e) {
            // dd($e->getMessage());
            return back()->with([
                'error' => 'Couldn\'t to initiate payment. Connect and try Again',
            ]);
        }
    }


    public function handleGatewayCallback()
    {
        try {
            $paymentDetails = paystack()->getPaymentData();
            $reference = $paymentDetails['data']['reference'];
            $payment = Payment::where('payment_reference', $reference)->first();
            $metadata = $paymentDetails['data']['metadata'];
            // Log::info('payment details', $paymentDetails);

            // dd($metadata);
            if (!$payment) {
                // throw new Exception("Payment record not found.");
                return back()->with([
                    'error' => 'Payment record not found.',
                ]);
            }

            $result = $this->paymentService->processPayment(false, $paymentDetails, $metadata, $payment);

            if ($result['status'] === 'success') {
                return redirect()->route('ordersucess')->with(['success' => $result['message']]);
            } elseif ($result['status'] === 'already_processed') {
                return back()->with(['success' => $result['message']]);
            } elseif ($result['status'] === 'failed') {
                return redirect()->route('paystack.manual.verify', ['trxref' => $reference])
                    ->with(['error' => $result['message']]);
            }

            return back()->with(['error' => $result['message']]);
        } catch (Exception $e) {
            // Log the error message for debugging purposes
            // dd($e->getMessage());
            // Return back with an error message
            return back()->with([
                'error' => 'An error occurred during payment processing: ',
            ]);
        }
    }

    public function showManualVerificationPage($trxref)
    {
        return Inertia::render('ManualVerifyPayment', [
            'trxref' => $trxref,
        ]);
    }


    public function handleWebhook(Request $request, CustomPaystack $paystack)
    {
        $paymentDetails = $request->all();

        Log::info('details', $paymentDetails);

        $reference = $paymentDetails['data']['reference'];
        $payment = Payment::where('payment_reference', $reference)->first();
        $metadata = $paymentDetails['data']['metadata'];

        // Log::info('Reference', ['ref' => $reference]);
        // Log::info('payment', ['met' => $payment]);
        // Log::info('MEtadata', ['met' => $metadata]);

        $verifyTrx = paystack()->isTransactionVerificationValid($reference);

        if ($verifyTrx) {

            $result = $this->paymentService->processPayment(true, $paymentDetails, $metadata, $payment);
        }


        $result = $this->paymentService->processPayment(true, $paymentDetails, $metadata, $payment);


        if ($result) {
            return response()->json(['status' => 'success'], 200);
        } else {
            return response()->json(['status' => 'error', 'message' => 'Payment verification failed.'], 400);
        }
    }
}
