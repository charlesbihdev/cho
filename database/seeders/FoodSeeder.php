<?php

namespace Database\Seeders;

use App\Models\Food;
use App\Models\Vendor;
use App\Models\Variant;
use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class FoodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    { // For each vendor, create 5 foods and associate them with the vendor
        Vendor::all()->each(function ($vendor) {
            Food::factory()->count(2)->create([
                'category_id' => Category::factory()->create()->id,
            ])->each(function ($food) use ($vendor) {
                // Create variants with the food_id linked implicitly
                $variants = Variant::factory()->count(2)->create([
                    'food_id' => $food->id, // This is needed for the Variant model
                    'vendor_id' => $vendor->id,
                ]);
                // Insert only vendor_id and variant_id into food_vendor_variant
                $variants->each(function ($variant) use ($vendor) {
                    DB::table('food_vendor_variant')->insert([
                        'vendor_id' => $vendor->id,
                        'variant_id' => $variant->id,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                });
            });
        });
    }
}
