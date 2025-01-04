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


    protected $fillable = ['name', 'category_id', 'thumbnail'];

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
        return $this->belongsToMany(
            Vendor::class,
            'variants',     // The pivot table name
            'food_id',      // Foreign key on the pivot table for Food
            'vendor_id'     // Foreign key on the pivot table for Vendor
        )->distinct();      // Ensures unique vendors are retrieved
    }


    public function vendors_where()
    {
        return Vendor::whereHas('variants', function ($query) {
            $query->where('food_id', $this->id);
        })->get();
    }
}
