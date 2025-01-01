<?php

namespace App\Http\Controllers;

use Exception;
use Inertia\Inertia;
use App\Models\Payment;
use App\Models\Variant;
use App\Models\Location;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Log;


class PaymentController extends Controller


{

    public function redirectToGateway(Request $request)
    {

        $request->validate([
            'email' => 'required|email',
            'phone' => 'nullable|regex:/^0\d{9}$/',
            'order_data' => 'required|array',
        ]);

        // dd($request->input('order_data'));


        try {
            $totalAmount = 0;
            $deliveryFees = [];
            $locationIds = [];


            foreach ($request->input('order_data') as $order) {
                $variantId = $order['variant_id'];
                $quantity = $order['quantity'];
                $locationId = $order['location_id'];

                // Fetch variant price
                $variant = Variant::findOrFail($variantId);
                $variantPrice = $variant->price;

                // Check if the location is valid and corresponds to the vendor
                $location = Location::findOrFail($locationId);
                if ($location->vendor_id !== $variant->vendor_id) {
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
            $payableAmount = $totalAmount + $totalDeliveryFee;

            // Generate a unique transaction reference
            $reference = paystack()->genTranxRef();

            // Prepare payment data
            $paymentData = [
                'transaction_id' => $reference,
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
                    "phone" => $request->input('phone'),
                    "order_data" => $request->input('order_data'),
                ],
            ];

            // Save the payment record
            Payment::create($paymentData);

            // Redirect to Paystack for authorization
            $url = paystack()->getAuthorizationUrl($data);
            Payment::create($paymentData);
            return Inertia::location($url->url);
        } catch (Exception $e) {
            dd($e->getMessage());
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
            $transactionId = $paymentDetails['data']['id'];
            $payment = Payment::where('payment_reference', $reference)->first();
            $metadata = $paymentDetails['data']['metadata'];

            if (!$payment) {
                // throw new Exception("Payment record not found.");
                return back()->with([
                    'error' => 'Payment record not found.',
                ]);
            }

            if ($paymentDetails['status'] && $paymentDetails['data']['status'] === 'success') {

                if (!$metadata) {
                    // throw new Exception("Missing metadata in payment details.");
                    return back()->with([
                        'error' => 'Missing metadata in payment details.',
                    ]);
                }

                if ($payment && $metadata) {
                    $payment->transaction_id = $transactionId;
                    $eventTitle = $metadata['event_title'];

                    if (empty($metadata['event_id']) || empty($metadata['user_id'])) {
                        // throw new Exception("Event ID is required for 'event' payment type.");
                        return back()->with([
                            'error' => 'No metadata found in payment details.',
                        ]);
                    }
                    $eventId = $metadata['event_id'];

                    $payment->event_id = $eventId;
                    $payment->status = 'successful';
                    $payment->save();


                    return redirect()->route('cart')
                        ->with([
                            'success' => 'Payment successful. You can go live now',
                        ]);
                }
            } else {
                $payment->status = 'failed';
                $payment->transaction_id = $transactionId;
                $payment->save();
                return back()->with([
                    'error' => 'Payment failed',
                ]);
            }
        } catch (Exception $e) {
            // Log the error message for debugging purposes
            Log::error("Payment handling error: " . $e->getMessage());

            // Return back with an error message
            return back()->with([
                'error' => 'An error occurred during payment processing: ' . $e->getMessage(),
            ]);
        }
    }
}
