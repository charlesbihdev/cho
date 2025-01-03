<?php

namespace App\Http\Controllers;

use App\Models\Vendor;
use Inertia\Inertia;
use Illuminate\Http\Request;

class VendorController extends Controller
{
    public function index()
    {
        $vendors = Vendor::all();
        return Inertia::render('Admin/Vendors', [
            'vendors' => $vendors
        ]);
    }

    public function store(Request $request)
    {
        Vendor::create([
            'name' => $request->name
        ]);
    }

    public function destroy($id)
    {
        $vendor = Vendor::findOrFail($id); // Find the vendor
        $vendor->delete(); // Delete it
        return redirect()->route('vendors.index')->with('success', 'Vendor deleted successfully.');
    }
}