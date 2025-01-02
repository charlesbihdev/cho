<?php

namespace Database\Factories;

use App\Models\Food;
use App\Models\Vendor;
use App\Models\Category;
use Faker\Generator as Faker;
use Illuminate\Database\Eloquent\Factories\Factory;

class FoodFactory extends Factory
{
    // Define the model that this factory is for
    protected $model = Food::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->word,
            'thumbnail' => "https://random-image-pepebigotes.vercel.app/api/random-image",
            'category_id' => $this->faker->randomElements([1, 2, 3, 4, 5]),  // Create a category for each food
        ];
    }

    /**
     * Configure the factory after creating the food.
     */
}
