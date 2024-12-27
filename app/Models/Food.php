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
        return Vendor::whereHas('variants', function ($query) {
            $query->where('food_id', $this->id);
        })->get();
    }
}
