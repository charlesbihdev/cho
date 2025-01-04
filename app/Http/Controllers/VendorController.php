<?php

namespace App\Http\Controllers;

use App\Models\Vendor;
use Inertia\Inertia;
use Illuminate\Http\Request;

class VendorController extends Controller
{
    public function index()
    {
        $vendors = Vendor::latest()->get();
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
        $vendors = Vendor::find($id);
        if(!$vendors){
            return response()->json(['message' => 'Vendor not found'], 404);
        }
        $vendors->delete();
    }
}