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
        $foods = Food::with(['category', 'vendors.variants', 'vendors.locations'])->get();

        $foodData = [
            'foods' => $foods->map(function ($food) {
                return [
                    'id' => $food->id,
                    'name' => $food->name,
                    'thumbnail' => $food->thumbnail,
                    'category' => [
                        'id' => $food->category->id,
                        'name' => $food->category->name,
                    ],
                    'vendors' => $food->vendors->map(function ($vendor) {
                        return [
                            'id' => $vendor->id,
                            'name' => $vendor->name,
                            'variants' => $vendor->variants->map(function ($variant) {
                                return [
                                    'id' => $variant->id,
                                    'name' => $variant->name,
                                    'price' => $variant->price,
                                ];
                            }),
                            'locations' => $vendor->locations->map(function ($location) {
                                return [
                                    'id' => $location->id,
                                    'destination' => $location->destination,
                                    'price' => $location->amount,
                                ];
                            }),
                        ];
                    }),
                ];
            }),
        ];

        // dd($foodData['foods']);

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
            'foodData' => $foodData['foods'],
            'locations' => $locations,
            'categories' => Category::latest()->get()->pluck('name'),
        ]);
    }
}
