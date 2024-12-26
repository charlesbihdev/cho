<?php

namespace App\Http\Controllers;

use App\Models\Food;
use Inertia\Inertia;
use App\Models\Category;
use App\Models\Location;
use Illuminate\Http\Request;

class LandingController extends Controller
{
    public function index()
    {
        // Fetch all foods with their related vendors and variants
        $foods = Food::with(['variants', 'vendors'])->get();

        // Fetch all categories
        $categories = Category::pluck('name');

        // Fetch all delivery locations
        $locations = Location::pluck('name');

        // Pass data to the frontend
        return Inertia::render('Landing', [
            'foods' => $foods,
            'categories' => $categories,
            'locations' => $locations,
        ]);
    }
}
