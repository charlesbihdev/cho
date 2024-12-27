<?php

namespace Database\Factories;

use App\Models\Vendor;
use App\Models\Location;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'location_id' => Location::factory(),
            'vendor_id' => Vendor::factory(),
            'note' => $this->faker->sentence,
            'status' => $this->faker->randomElement(['pending', 'completed', 'cancelled']),
            'total_price' => $this->faker->randomFloat(2, 20, 500),
        ];
    }
}
