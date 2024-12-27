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
        // Get all foods with their variants and associated vendors
        $foods = Food::with(['variants.vendors' => function ($query) {
            $query->with(['locations']); // Load locations for each vendor
        }])->get();

        $categories = Category::all()->map(function ($category) {
            return [
                'id' => $category->id,
                'name' => $category->name,
            ];
        });


        $foodData = [];

        foreach ($foods as $food) {
            $foodData[$food->name] = [
                'name' => $food->name,
                'id' => $food->id,
                'image' => $food->thumbnail,
                'description' => $food->description ?? "some desc",
                'category' => $food->category->name,
                'variants' => $food->variants->map(function ($variant) {
                    return [
                        'name' => $variant->name,
                        'basePrice' => $variant->price, // Adjusted to match your column name
                    ];
                }),
                'vendors' => $food->vendors()->map(function ($vendor) {
                    return [
                        'id' => $vendor->id,
                        'name' => $vendor->name,
                        'rating' => $vendor->rating ?? 5,
                        'locationPrices' => $vendor->locations->pluck('amount', 'destination')->toArray(),
                    ];
                }),
            ];
        }

        // dd($foodData);
        $locations = Location::all()->map(function ($location) {
            return [
                'id' => $location->id,
                'vendor_id' => $location->vendor_id,
                'note' => $location->note,
                'destination' => $location->destination,
                'amount' => $location->amount,
            ];
        });

        return Inertia::render('Landing', [
            'foodData' => $foodData,
            'locations' => $locations,
            'categories' => Category::all()->pluck('name'),
        ]);
    }
}
