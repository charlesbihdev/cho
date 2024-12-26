<?php

namespace Database\Seeders;

use App\Models\Food;
use App\Models\Vendor;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class FoodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Vendor::all()->each(function ($vendor) {
            Food::factory()->count(5)->create(['vendor_id' => $vendor->id]);
        });
    }
}
