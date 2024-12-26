<?php

namespace App\Models;

use App\Models\Food;
use App\Models\Order;
use App\Models\Variant;
use App\Models\Location;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Vendor extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function locations()
    {
        return $this->hasMany(Location::class);
    }

    public function variants()
    {
        return $this->belongsToMany(Variant::class, 'food_vendor_variant')
            ->withTimestamps();
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function foods()
    {
        return $this->belongsToMany(Food::class, 'food_vendor_variant', 'vendor_id', 'food_id');
    }
}
