<?php

namespace App\Http\Controllers;

use Exception;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\Payment;
use App\Models\Variant;
use App\Models\Location;
use App\Models\OrderItem;
use App\Notifications\OrderPlacedNotification;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;


class PaymentController extends Controller


{

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
            $transactionId = $paymentDetails['data']['id'];
            $payment = Payment::where('payment_reference', $reference)->first();
            $metadata = $paymentDetails['data']['metadata'];
            // dd($metadata);
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

                if ($payment && $metadata && $payment->status !== 'successful') {
                    $payment->transaction_id = $transactionId;
                    $orderData = $metadata['order_data'];

                    foreach ($orderData as $item) {
                        $locationId = $item['location_id'];
                        $note = $item['food_note'];
                        $vendorId = $item['vendor_id'];
                        $variantId = $item['variant_id'];

                        // Create a unique key for grouping
                        $key = "{$locationId}_{$vendorId}";

                        if (!isset($groupedOrders[$key])) {
                            $groupedOrders[$key] = [
                                'location_id' => $locationId,
                                'vendor_id' => $vendorId,
                                'items' => [],
                                'total_price' => 0,
                                'note' => $note ?? null,
                            ];
                        }

                        $variant = Variant::findOrFail($variantId);
                        $item['price'] = $variant->price;

                        // Add item to the grouped order
                        $item['note'] = $note;
                        $groupedOrders[$key]['items'][] = $item;
                        $groupedOrders[$key]['total_price'] += $item['price'] * $item['quantity'];
                    }

                    // Create orders and order items
                    foreach ($groupedOrders as $orderGroup) {
                        // Create the order
                        $order = Order::create([
                            'order_id' => Order::generateUniqueOrderId(),
                            'location_id' => $orderGroup['location_id'],
                            'vendor_id' => $orderGroup['vendor_id'],
                            'status' => 'pending',
                            'total_price' => $orderGroup['total_price'],
                            'name' => $metadata['name'] ?? null,
                            'email' => $metadata['email'] ?? null,
                            'phone' => $metadata['phone'] ?? null,
                        ]);



                        // Create the order items
                        foreach ($orderGroup['items'] as $item) {
                            OrderItem::create([
                                'quantity' => $item['quantity'],
                                'price' => $item['price'] * $item['quantity'],
                                'variant_id' => $item['variant_id'],
                                'note' => $item['note'] ?? null,
                                'order_id' => $order->id,
                            ]);
                        }

                        Notification::send($payment, new OrderPlacedNotification($order->order_id));
                    }


                    $payment->status = 'successful';
                    $payment->save();


                    return redirect()->route('ordersucess')
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
            // dd($e->getMessage());
            // Return back with an error message
            return back()->with([
                'error' => 'An error occurred during payment processing: ' . $e->getMessage(),
            ]);
        }
    }
}
