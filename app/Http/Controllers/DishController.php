<?php

namespace App\Http\Controllers;

use App\Models\Food;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class DishController extends Controller
{
    public function index()
    {

        $foods = Food::with(['category', 'variants.vendors'])->get()->map(function ($food) {
            $firstVariant = $food->variants->first();

            if ($firstVariant) {
                $firstVendor = $firstVariant->vendors->first();

                // Check if a vendor exists
                if ($firstVendor) {
                    $vendorVariants = $firstVendor->variants()->where('food_id', $food->id)->get();
                    $variantNames = $vendorVariants->pluck('name')->join(', ');
                    $variantPrices = $vendorVariants->pluck('price')->join(', ');

                    return [
                        'food_name' => $food->name,
                        'vendor_name' => $firstVendor->name,
                        'variants' => $variantNames,
                        'prices' => $variantPrices,
                    ];
                } else {
                    // If no vendor, return food information without vendor details
                    return [
                        'food_name' => $food->name,
                        'vendor_name' => null,
                        'variants' => 'No variants available',
                        'prices' => 'N/A',
                    ];
                }
            } else {
                // If no variant, return null or a message indicating no variants
                return [
                    'food_name' => $food->name,
                    'vendor_name' => null,
                    'variants' => 'No variants available',
                    'prices' => 'N/A',
                ];
            }
        })->filter();

        return Inertia::render('Admin/Dish', [
            'dishes' => $foods
        ]);
    }
}
