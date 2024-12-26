<?php

namespace App\Http\Controllers;

use App\Models\Food;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FoodController extends Controller
{
    public function index()
    {
        $food = Food::all();
        return Inertia::render('Food', [
            'food' => $food
        ]);
    }
}
