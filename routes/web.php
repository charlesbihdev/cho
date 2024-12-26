<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\ProfileController;

// Route::get('/', function () {
//     return Inertia::render('Landing', []);
// });

Route::get('/', [LandingController::class, 'index']);

Route::get('/cart', function () {
    return Inertia::render('Cart');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/orders', function () {
    return Inertia::render('Orders');
});

Route::get('/food', function () {
    return Inertia::render('Food');
});

Route::get('/vendors', function () {
    return Inertia::render('Vendors');
});

Route::get('/location', function () {
    return Inertia::render('Location');
});


require __DIR__ . '/auth.php';
