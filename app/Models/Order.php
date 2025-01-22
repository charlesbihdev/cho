<?php

namespace App\Models;

use App\Models\Vendor;
use App\Models\Location;
use App\Models\OrderItem;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Order extends Model
{
    use HasFactory, Notifiable;


    protected $fillable = ['order_id', 'location_id', 'vendor_id', 'status', 'name', 'phone', 'email', 'total_price'];

    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    public function vendor()
    {
        return $this->belongsTo(Vendor::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    public static function generateUniqueOrderId($length = 6)
    {
        $characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ123456789';
        $code = '';

        do {
            $code = '';
            for ($i = 0; $i < $length; $i++) {
                // Use random_int() for cryptographically secure randomness
                $code .= $characters[random_int(0, strlen($characters) - 1)];
            }
        } while (self::where('ticket_code', $code)->exists()); // Check for uniqueness

        return $code;
    }


    public function routeNotificationForSms()
    {
        return $this->phone;
    }
}
