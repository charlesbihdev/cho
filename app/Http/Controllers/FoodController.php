<?php

namespace App\Http\Controllers;

use App\Models\Food;
use Inertia\Inertia;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FoodController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        $foods = Food::with(['category' => function ($query) {
            $query->select('id', 'name', 'thumbnail');
        }])
            ->latest()
            ->get();
        return Inertia::render('Admin/FoodType', [
            'foods' => $foods,
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {

        // Validate the incoming request
        $validated = $request->validate([


            'name' => 'required|string|max:255',
            'thumbnail' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Validate image
            'category_id' => 'required', // Ensure the category exists
        ]);

        // Handle the thumbnail upload
        if ($request->hasFile('thumbnail')) {
            $thumbnailPath = $request->file('thumbnail')->store('thumbnails', 'public'); // Store in 'storage/app/public/thumbnails'
            $thumbnailUrl = asset('storage/' . $thumbnailPath); // Generate URL
        }

        // Create the Food item
        Food::create([
            'name' => $validated['name'],
            'thumbnail' => $thumbnailUrl, // Save the URL
            'category_id' => $validated['category_id'],
        ]);

        return back()->with('success', 'Food saved successfully');
    }


    public function destroy($id)
    {
        $food = Food::find($id);
        if ($food->thumbnail) {
            $thumbnailPath = str_replace(asset('storage/'), '', $food->thumbnail); // Convert URL to relative path
            Storage::disk('public')->delete($thumbnailPath);
        }
        $food->delete();

        return back()->with('success', 'Food deleted successfully');
    }
}
