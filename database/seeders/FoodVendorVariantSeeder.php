<?php

namespace Database\Seeders;

use App\Models\Vendor;
use App\Models\Variant;
use Illuminate\Database\Seeder;
use App\Models\FoodVendorVariant;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class FoodVendorVariantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // FoodVendorVariant::factory()->count(50)->create();

        $vendors = Vendor::all();
        $variants = Variant::all();

        // foreach ($vendors as $vendor) {
        //     foreach ($variants as $variant) {
        //         DB::table('food_vendor_variant')->insert([
        //             'vendor_id' => $vendor->id,
        //             'variant_id' => $variant->id,
        //             'price' => rand(10, 50), // Random price for each variant/vendor combination
        //             'created_at' => now(),
        //             'updated_at' => now(),
        //         ]);
        //     }
        // }
    }
}
