<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = [
        'transaction_id',
        'amount',
        'currency',
        'payment_reference',
        'payment_method',
        'payment_date',
        'status',
        'email',
        'phone',
        'name',
    ];
}
