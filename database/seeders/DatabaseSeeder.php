<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\FoodSeeder;
use Database\Seeders\OrderSeeder;
use Database\Seeders\VendorSeeder;
use Database\Seeders\VariantSeeder;
use Database\Seeders\CategorySeeder;
use Database\Seeders\LocationSeeder;
use Database\Seeders\OrderItemSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            // VendorSeeder::class,
            CategorySeeder::class,
            // FoodSeeder::class,
            LocationSeeder::class,
            // OrderSeeder::class,
            VariantSeeder::class,
            // OrderItemSeeder::class,
            FoodVendorVariantSeeder::class,

            VendorSeeder::class,
            FoodSeeder::class,
            VariantSeeder::class,

        ]);

        // User::factory(10)->create();

        //     User::factory()->create([
        //         'name' => 'Test User',
        //         'email' => 'test@example.com',
        //     ]);
    }
}
