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
}
