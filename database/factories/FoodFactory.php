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
            'category_id' => Category::factory(),  // Create a category for each food
        ];
    }

    /**
     * Configure the factory after creating the food.
     */
    public function configure()
    {
        return $this->afterCreating(function (Food $food) {
            // Create variants for the food item
            $food->variants()->createMany([
                ['name' => 'Beef', 'price' => 20],
                ['name' => 'Chicken', 'price' => 30],
            ]);

            // Attach the food to a vendor using the pivot table
            // $food->vendors()->attach(Vendor::inRandomOrder()->first()->id);
        });
    }
}
