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

    public function toggleActive(Request $request, $id)
    {
        $vendor = Vendor::find($id);
        $isActive = $vendor->active;

        $vendor->active = !$isActive;
        $vendor->save();

        return back()->with([
            'success' => 'Vendor status changed'
        ]);
    }

    public function destroy($id)
    {
        $vendors = Vendor::find($id);
        if (!$vendors) {
            return back()->with([
                'success' => 'Vendor not found'
            ]);
        }
        $vendors->delete();
    }
}
