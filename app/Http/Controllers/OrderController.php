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
        $orders = Order::with(['location.vendor', 'orderItems'])->latest()->get();

        return Inertia::render('Admin/Orders', [
            'orders' => $orders,
        ]);
    }
}
