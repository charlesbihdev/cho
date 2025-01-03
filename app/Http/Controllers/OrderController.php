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
        $orders = Order::with(['location.vendor', 'orderItems'])->get();

        return Inertia::render('Admin/Orders', [
            'orders' => $orders,
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
}
