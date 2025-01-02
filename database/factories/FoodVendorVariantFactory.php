<?php

namespace Database\Factories;

use App\Models\Vendor;
use App\Models\Variant;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FoodVendorVariant>
 */
class FoodVendorVariantFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'variant_id' => Variant::factory(),
            'vendor_id' => Vendor::factory(),
        ];
    }
}
