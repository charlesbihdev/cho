<?php

namespace App\Http\Controllers;

use App\Models\Food;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FoodController extends Controller
{
    public function index()
    {
        $foods = Food::with(['category' => function ($query) {
            $query->select('id', 'name'); // Only select the 'id' and 'name' fields
        }])->get();
        return Inertia::render('FoodType', [
            'foods' => $foods
        ]);
    }
}
