<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Garantia extends Model
{
    protected $guarded = [];

    public function getImageAttribute($value)
    {
        return asset('storage/' . $value);
    }

    public function getBannerAttribute($value)
    {
        return asset('storage/' . $value);
    }
}
