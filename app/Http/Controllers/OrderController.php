<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        $order = OrderItem::all();
        return Inertia::render('Orders', [
            'order' => $order
        ]);
    }
}
