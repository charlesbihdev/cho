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

    /**
     * Route notifications for the mail channel.
     */
    public function routeNotificationForMail()
    {
        return $this->email; // Use the 'email' attribute to send email notifications
    }

    /**
     * Route notifications for the SMS channel.
     */
    public function routeNotificationForSms()
    {
        return $this->phone; // Use the 'phone' attribute to send SMS notifications
    }
}
