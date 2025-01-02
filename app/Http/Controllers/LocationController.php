<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Location;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function index()
    {
        $locations = Location::with(['vendor' => function ($query) {
            $query->select('id', 'name'); // Only select the 'id' and 'name' fields
        }])->get();

        return Inertia::render('Location', [
            'locations' => $locations
        ]);
    }
}
