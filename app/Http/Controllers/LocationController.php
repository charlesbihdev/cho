<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Location;
use App\Models\Vendor;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function index()
    {
        $locations = Location::with(['vendor' => function ($query) {
            $query->select('id', 'name'); // Only select the 'id' and 'name' fields
        }])
            ->latest()
            ->get();

        $vendors = Vendor::all();

        return Inertia::render('Admin/Location', [
            'locations' => $locations,
            'vendors' => $vendors
        ]);
    }

    public function store(Request $request)
    {
        Location::create([
            'vendor_id' => $request->vendor_id,
            'destination' => $request->destination,
            'amount' => $request->price
        ]);
    }

    public function destroy(Request $request, $id)
    {


        Location::destroy($id);
    }
}
