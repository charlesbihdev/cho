<?php

namespace App\Http\Controllers;

use App\Models\Vendors;
use Inertia\Inertia;
use Illuminate\Http\Request;

class VendorController extends Controller
{
    public function index()
    {
        $vendor = Vendors::all();
        return Inertia::render('Vendors', [
            'vendor' => $vendor
        ]);
    }
}
