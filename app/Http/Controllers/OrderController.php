<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {

        // $orders = Order::with(['location.vendor', 'orderItems.variant.food'])->latest()->get();
        $orders = Order::with(['location.vendor', 'orderItems.variant', 'orderItems.variant.food'])->latest()->get();


        $orderItems = OrderItem::with('variant.food')->get();
        // dd($orderItems);


        return Inertia::render('Admin/Orders', [
            'orders' => $orders,
        ]);
    }

    public function show($order_id)
    {
        $order = Order::with(['location.vendor', 'orderItems.variant', 'orderItems.variant.food'])->where('order_id', $order_id);

        return Inertia::render('ViewOrder', [
            'order' => $order,
        ]);
    }

    public function destroy(Request $request, $id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        if ($request->user()->cannot('delete', $order)) {
            return response()->json(['message' => 'Unauthorized action'], 403);
        }

        $order->delete();
    }



    public function update(Request $request, $id)
    {
        $order = Order::find($id);
        $newStatus = $order->status === 'pending' ? 'completed' : 'pending';
        $order->update(['status' => $newStatus]);
    }
}
