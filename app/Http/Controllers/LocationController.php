<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Location;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function index()
    {
        $location = Location::all();

        return Inertia::render('Location', [
            'location' => $location
        ]);
    }
}
