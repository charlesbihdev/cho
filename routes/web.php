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
})->middleware(['auth'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

//track
Route::get('/orders/{order_id}/track', [OrderController::class, 'show'])->name('orders.track');

// Admin

Route::middleware('auth')->group(function () {

    Route::resource('orders', OrderController::class);


    Route::resource('foods', FoodController::class);


    Route::resource('dishes', DishController::class);


    Route::resource('vendors', VendorController::class);
    Route::post('/vendors/{id}/toggle-active', [VendorController::class, 'toggleActive'])->name('vendors.toggle-active');



    Route::resource('locations', LocationController::class);
});

//Variants


//payment
Route::post('/pay', [PaymentController::class, 'redirectToGateway'])->name('paystack.pay');

Route::get('/payment/callback', [PaymentController::class, 'handleGatewayCallback'])->name('paystack.callback');

Route::get('/verify-payment/{trxref}', [PaymentController::class, 'showManualVerificationPage'])->name('paystack.manual.verify');


require __DIR__ . '/auth.php';
