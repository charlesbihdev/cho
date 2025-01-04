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
use Illuminate\Support\Facades\Hash;
use Database\Seeders\OrderItemSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            CategorySeeder::class,
            // LocationSeeder::class,
            // VariantSeeder::class,

            // VendorSeeder::class,
            // FoodSeeder::class,
            // FoodVendorVariantSeeder::class,


        ]);

        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Charles Bih',
            'email' => 'charlesowusubih@gmail.com',
            'password' => Hash::make('@Sambo2000'),
        ]);
    }
}
