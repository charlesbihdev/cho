<?php

namespace App\Http\Controllers;

use App\Models\Food;
use Inertia\Inertia;
use App\Models\Vendor;
use App\Models\Variant;
use Illuminate\Http\Request;
use App\Models\FoodVendorVariant;



class DishController extends Controller
{
    public function index()
    {
        $foods = Food::all();
        $vendors = Vendor::all();


        return Inertia::render('Admin/Dish', [
            'vendors' => $vendors,
            'foods' => $foods
        ]);
    }


    public function store(Request $request)
    {

        // Validate the incoming request
        $request->validate([
            'food_id' => 'required|exists:foods,id',
            'vendor_id' => 'required|exists:vendors,id',
            'variants' => 'required|array',
            'variants.*.name' => 'required|string|max:255',
            'variants.*.price' => 'required|numeric|min:0',
        ]);

        // Loop through each variant and store it
        foreach ($request->variants as $variantData) {
            // Create the variant
            $variant = Variant::create([
                'name' => $variantData['name'],
                'price' => $variantData['price'],
                'food_id' => $request->food_id,
                'vendor_id' => $request->vendor_id, // Assuming each variant is linked to the vendor
            ]);

            // Create the relationship in the food_vendor_variant table
            FoodVendorVariant::create([
                'variant_id' => $variant->id,
                'vendor_id' => $request->vendor_id,
            ]);
        }
    }

    public function destroy(Request $request, $id)
    {


        Variant::destroy($id);
    }
}
