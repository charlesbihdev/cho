<?php

namespace App\Http\Controllers;

use App\Models\Vendor;
use Inertia\Inertia;
use Illuminate\Http\Request;

class VendorController extends Controller
{
    public function index()
    {
        $vendor = Vendor::all();
        return Inertia::render('Vendors', [
            'vendor' => $vendor
        ]);
    }
}
