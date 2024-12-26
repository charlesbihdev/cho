<?php

namespace App\Models;

use App\Models\Food;
use App\Models\Order;
use App\Models\Location;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Vendor extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function foods()
    {
        return $this->hasMany(Food::class);
    }

    public function locations()
    {
        return $this->hasMany(Location::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
