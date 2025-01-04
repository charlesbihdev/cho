<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DishController;
use App\Http\Controllers\FoodController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\VendorController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\LocationController;

Route::get('/', [LandingController::class, 'index'])->name('landing');

Route::get('/cart', function () {
    return Inertia::render('Cart');
})->name('cart');

Route::get('/order-success', function () {
    return Inertia::render('OrderSuccess');
})->name('ordersucess');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


// Admin

// Route::get('/orders', [OrderController::class, 'index'])->name('orders');
Route::resource('orders', OrderController::class);


// Route::get('/food-types', [FoodController::class, 'index'])->name('foods');
Route::resource('foods', FoodController::class);


// Route::get('/dish', [DishController::class, 'index'])->name('dishes');
Route::resource('dishes', DishController::class);


// Route::get('/vendors', [VendorController::class, 'index'])->name('vendors');
Route::resource('vendors', VendorController::class);


// Route::get('/location', [LocationController::class, 'index'])->name('locations');
Route::resource('locations', LocationController::class);

//Variants
Route::delete('/variants/{id}', [DishController::class, 'destroy'])->name('variants.destroy');




//payment
Route::post('/pay', [PaymentController::class, 'redirectToGateway'])->name('paystack.pay');

Route::get('/payment/callback', [PaymentController::class, 'handleGatewayCallback'])->name('paystack.callback');


require __DIR__ . '/auth.php';