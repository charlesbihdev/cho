<?php

namespace App\Models;

use App\Models\Vendor;
use App\Models\Variant;
use App\Models\Category;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Food extends Model
{
    use HasFactory;

    protected $table = 'foods';


    protected $fillable = ['name', 'category', 'thumbnail'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function variants()
    {
        return $this->hasMany(Variant::class);
    }


    public function vendors()
    {
        return $this->hasManyThrough(
            Vendor::class,
            Variant::class,
            'food_id', // Foreign key on the variants table
            'id',      // Foreign key on the food_vendor_variant table (vendor_id)
            'id',      // Local key on the foods table
            'id'       // Local key on the variants table
        )->join('food_vendor_variant', 'food_vendor_variant.variant_id', '=', 'variants.id')
            ->select('vendors.*'); // Select only vendor fields
    }


    public function vendors_where()
    {
        return Vendor::whereHas('variants', function ($query) {
            $query->where('food_id', $this->id);
        })->get();
    }
}
