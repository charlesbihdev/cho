<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\DishController;
use App\Http\Controllers\FoodController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\VendorController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\LocationController;

// Route::get('/', function () {
//     return Inertia::render('Landing', []);
// });

Route::get('/', [LandingController::class, 'index'])->name('landing');

Route::get('/cart', function () {
    return Inertia::render('Cart');
})->name('cart');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/orders', [OrderController::class, 'index'])->name('orders');

Route::get('/food-types', [FoodController::class, 'index'])->name('food');

Route::get('/dish', [DishController::class, 'index'])->name('dish');

Route::get('/vendors', [VendorController::class, 'index'])->name('vendors');

Route::get('/location', [LocationController::class, 'index'])->name('location');

Route::post('/pay', [PaymentController::class, 'redirectToGateway'])->name('paystack.pay');


Route::get('/payment/callback', [PaymentController::class, 'handleGatewayCallback'])->name('paystack.callback');


require __DIR__ . '/auth.php';
