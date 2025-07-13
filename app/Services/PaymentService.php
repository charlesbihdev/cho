<?php

namespace App\Services;

use App\Models\Order;
use App\Models\Variant;
use App\Models\OrderItem;
use Illuminate\Support\Facades\Notification;
use App\Notifications\OrderPlacedNotification;
// use Illuminate\Support\Facades\Notification;
// use App\Notifications\OrderPlacedNotification;

class PaymentService
{
    /**
     * Process payment verification and order creation.
     *
     * @param array $paymentDetails Paystack payment verification response
     * @param array $metadata Metadata containing order data and customer info
     * @param \App\Models\Payment $payment Payment model instance
     * @return array Result with status and message
     */
    public function processPayment(
        array $paymentDetails,
        $payment,
        array $metadata,
        string $transactionId
    ) {
        // Extract transaction ID from payment details


        if ($paymentDetails['status'] === 'success') {
            if (!$metadata) {
                return ['status' => 'error', 'message' => 'Missing metadata in payment details.'];
            }

            if ($payment && $metadata && $payment->status !== 'successful') {
                $payment->transaction_id = $transactionId;

                // Process and create orders
                $payment->status = 'successful';
                $payment->save();


                $this->createOrders($metadata, $payment);


                return ['status' => 'success', 'message' => 'Payment successful'];
            } else {
                if ($payment->status === 'successful') {
                    return [
                        'status' => 'already_processed',
                        'message' => 'Your order has already been processed successfully. No need to verify payment'
                    ];
                }
            }
        }

        // Payment failed
        $payment->status = 'failed';
        $payment->transaction_id = $transactionId;
        $payment->save();

        return [
            'status' => 'failed',
            'message' => 'Payment verification failed. Approve transaction and verify'
        ];
    }

    /**
     * Create orders and order items from metadata.
     *
     * @param array $metadata Order data and customer info
     * @param \App\Models\Payment $payment Payment model instance
     */
    private function createOrders($metadata)
    {
        $orderData = $metadata['order_data'];
        $groupedOrders = [];

        // Group order items by location and vendor
        foreach ($orderData as $item) {
            $locationId = $item['location_id'];
            $vendorId = $item['vendor_id'];
            $variantId = $item['variant_id'];
            $note = $item['food_note'] ?? null;
            $key = "{$locationId}_{$vendorId}";

            if (!isset($groupedOrders[$key])) {
                $groupedOrders[$key] = [
                    'location_id' => $locationId,
                    'vendor_id' => $vendorId,
                    'items' => [],
                    'total_price' => 0,
                    'note' => $note,
                ];
            }

            $variant = Variant::findOrFail($variantId);
            $item['price'] = $variant->price;
            $item['note'] = $note;
            $groupedOrders[$key]['items'][] = $item;
            $groupedOrders[$key]['total_price'] += $item['price'] * $item['quantity'];
        }

        // Create orders and order items
        foreach ($groupedOrders as $orderGroup) {
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

            foreach ($orderGroup['items'] as $item) {
                OrderItem::create([
                    'quantity' => $item['quantity'],
                    'price' => $item['price'] * $item['quantity'],
                    'variant_id' => $item['variant_id'],
                    'note' => $item['note'] ?? null,
                    'order_id' => $order->id,
                ]);
            }

            Notification::send($order, new OrderPlacedNotification($order->order_id));
        }
    }
}
