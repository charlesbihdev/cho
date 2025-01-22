<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    // public function index()
    // {

    //     // $orders = Order::with(['location.vendor', 'orderItems.variant.food'])->latest()->get();
    //     $orders = Order::with(['location.vendor', 'orderItems.variant', 'orderItems.variant.food'])->latest()->get();


    //     // $orderItems = OrderItem::with('variant.food')->get();
    //     // dd($orderItems);


    //     return Inertia::render('Admin/Orders', [
    //         'orders' => $orders,
    //     ]);
    // }

    // public function index(Request $request)
    // {
    //     // Retrieve query parameters
    //     $filters = $request->only(['email', 'phone', 'order_id', 'status']);

    //     // Build the query with filters
    //     $query = Order::with(['location.vendor', 'orderItems.variant', 'orderItems.variant.food']);

    //     // Apply filters dynamically
    //     foreach ($filters as $key => $value) {
    //         if (!empty($value)) {
    //             $query->where($key, 'like', "%$value%");
    //         }
    //     }

    //     // Fetch filtered results
    //     $orders = $query->latest()->get();

    //     // Return filtered results to the Inertia view
    //     return Inertia::render('Admin/Orders', [
    //         'orders' => $orders,
    //     ]);
    // }

    public function index(Request $request)
    {
        // Get the search query
        $search = $request->input('search');

        // Build the query with relations
        $query = Order::with(['location.vendor', 'orderItems.variant', 'orderItems.variant.food']);

        // Apply search if a term is provided
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('email', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhere('order_id', 'like', "%{$search}%")
                    ->orWhere('status', 'like', "%{$search}%");
            });
        }

        // Fetch filtered results
        $orders = $query->latest()->get();

        // Return filtered results to the Inertia view
        return Inertia::render('Admin/Orders', [
            'orders' => $orders,
        ]);
    }


    public function show($order_id)
    {
        $order = Order::with(['location.vendor', 'orderItems.variant', 'orderItems.variant.food'])->where('order_id', $order_id)->first();

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
