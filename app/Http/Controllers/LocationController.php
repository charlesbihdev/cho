<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Locations;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function index()
    {
        $location = Locations::all();
        return Inertia::render('Location', [
            'location' => $location
        ]);
    }
}
