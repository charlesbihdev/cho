<?php

namespace App\Models;

use App\Models\Food;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Variant extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'base_price', 'food_id'];

    public function food()
    {
        return $this->belongsTo(Food::class);
    }
}
