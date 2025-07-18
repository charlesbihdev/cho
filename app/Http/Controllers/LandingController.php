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
        // Fetch discount settings

        $settings = [
            'delivery_discount' => setting('delivery_discount'),
            'delivery_discount_active' => setting('delivery_discount_active') == '1' ? true : false,
        ];

        // Get all foods with their variants and associated vendors
        $foods = Food::with(['category', 'vendors.variants', 'vendors.locations'])->latest()->get();

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
                    'vendors' => $food->vendors->map(function ($vendor) use ($food) {
                        return [
                            'id' => $vendor->id,
                            'name' => $vendor->name,
                            'isActive' => $vendor->active,
                            'variants' => $vendor->variants
                                ->where('food_id', $food->id)
                                ->values()
                                ->map(function ($variant) {
                                    return [
                                        'id' => $variant->id,
                                        'name' => $variant->name,
                                        'price' => $variant->price,
                                        'isActive' => $variant->active,

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
            'categories' => Category::get()->pluck('name'),
            'deliveryDiscountData' => [
                'value' => (int) $settings['delivery_discount'],
                'active' => $settings['delivery_discount_active'],
            ],

        ]);
    }


    public function cart()
    {
        $settings = [
            'delivery_discount' => setting('delivery_discount'),
            'delivery_discount_active' => setting('delivery_discount_active') == '1' ? true : false,
        ];

        return Inertia::render('Cart', [
            'deliveryDiscountData' => [
                'value' => (int) $settings['delivery_discount'],
                'active' => $settings['delivery_discount_active'],
            ],

        ]);
    }
}
