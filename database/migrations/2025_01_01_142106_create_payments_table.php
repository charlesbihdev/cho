<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->string('transaction_id')->unique(); // Unique transaction identifier
            $table->string('email'); // Email of the user making the payment
            $table->string('phone')->nullable(); // Phone number of the user
            $table->decimal('amount', 10, 2); // Total amount for the payment
            $table->string('currency')->default('GHS'); // Currency type
            $table->string('payment_reference')->unique(); // Reference from payment gateway
            $table->string('payment_method')->default('paystack');
            $table->timestamp('payment_date');
            $table->enum('status', ['pending', 'successful', 'failed']); // Payment status
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
