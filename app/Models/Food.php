<?php

namespace App\Models;

use App\Models\Vendor;
use App\Models\Variant;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Food extends Model
{
    use HasFactory;

    protected $table = 'foods';


    protected $fillable = ['name', 'category', 'thumbnail'];



    public function variants()
    {
        return $this->hasMany(Variant::class);
    }

    // Define the relationship with vendors via the pivot table
    public function vendors()
    {
        return $this->belongsToMany(Vendor::class, 'food_vendor_variant')
            ->withPivot('price') // Adding price to the pivot table
            ->withTimestamps();
    }
}
