<?php

namespace App\Http\Controllers;

use App\Models\Food;
use Inertia\Inertia;
use App\Models\Vendor;
use App\Models\Variant;
use Termwind\Components\Dd;
use Illuminate\Http\Request;
use App\Models\FoodVendorVariant;
use Illuminate\Support\Facades\Log;

class DishController extends Controller
{
    public function index()
    {
        $foods = Food::all();
        $vendors = Vendor::all();

        $dishes = Food::with(['vendors.variants'])->latest()->get();

        $formattedDishes = $dishes->map(function ($food) {
            return [
                'id' => $food->id,
                'name' => $food->name,
                'category' => $food->category->name,
                'thumbnail' => $food->thumbnail,
                'vendors' => $food->vendors->map(function ($vendor) {
                    return [
                        'id' => $vendor->id,
                        'name' => $vendor->name,
                        'variants' => $vendor->variants->map(function ($variant) {
                            return [
                                'id' => $variant->id,
                                'name' => $variant->name,
                                'price' => $variant->price,
                                'active' => $variant->active
                            ];
                        }),
                    ];
                }),
            ];
        });

        // dd($formattedDishes);


        return Inertia::render('Admin/Dish', [
            'vendors' => $vendors,
            'foods' => $foods,
            'dishes' => $formattedDishes
        ]);
    }


    public function store(Request $request)
    {

        // dd($request->all());
        // Validate the incoming request
        $request->validate([
            'food_id' => 'required|exists:foods,id',
            'vendor_id' => 'required|exists:vendors,id',
            'variants' => 'required|array',
            'variants.*.name' => 'required|string|max:255',
            'variants.*.price' => 'required|numeric|min:0',
        ]);

        // dd($request->all());
        // Log::info('data', $request->all());


        foreach ($request->variants as $variantData) {

            try {
                // Log::info('varrr', $variantData);

                $variant = Variant::create([
                    'name' => $variantData['name'],
                    'price' => $variantData['price'],
                    'food_id' => $request->food_id,
                    'vendor_id' => $request->vendor_id,
                ]);

                FoodVendorVariant::create([
                    'variant_id' => $variant->id,
                    'vendor_id' => $request->vendor_id,
                ]);
            } catch (\Exception $e) {
                Log::error('Loop error: ' . $e->getMessage());
            }
        }
    }

    public function toggleActive(Request $request, $id)
    {
        $variant = Variant::find($id);
        $isActive = $variant->active;

        $variant->active = !$isActive;
        $variant->save();

        return back()->with([
            'success' => 'Variant status changed'
        ]);
    }

    public function destroy(Request $request, $id)
    {
        $variant = Variant::find($id);

        $variant->delete();

        return back()->with('success', 'Dish deleted successfully');
    }
}
