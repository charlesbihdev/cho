<?php

namespace App\Models;

use App\Models\Food;
use App\Models\Vendor;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Variant extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'price', 'food_id'];

    public function food()
    {
        return $this->belongsTo(Food::class);
    }

    public function vendors()
    {
        return $this->belongsToMany(Vendor::class, 'food_vendor_variant')
            ->withTimestamps(); // No price access here
    }
}
