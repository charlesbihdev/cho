<?php

namespace App\Models;

use App\Models\Vendor;
use App\Models\Variant;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class FoodVendorVariant extends Model
{
    use HasFactory;

    protected $fillable = ['variant_id', 'food_id', 'vendor_id',];

    protected $table = 'food_vendor_variant';

    // Defining relationships
    public function variant()
    {
        return $this->belongsTo(Variant::class);
    }

    public function vendor()
    {
        return $this->belongsTo(Vendor::class);
    }
}
