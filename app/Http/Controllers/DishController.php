<?php

namespace App\Http\Controllers;

use App\Models\Food;
use Inertia\Inertia;
use App\Models\Vendor;
use Illuminate\Support\Facades\Request;


class DishController extends Controller
{
    public function index()
    {
        $foods = Food::all();
        $vendors = Vendor::all();


        return Inertia::render('Admin/Dish', [
            'vendors' => $vendors,
            'foods' => $foods
        ]);
    }


    public function store(Request $request)
    {
        dd($request->all());
        Vendor::create([
            'name' => $request->name
        ]);
    }

    public function destroy(Request $request, $id)
    {
        Vendor::destroy($id);
    }
}
