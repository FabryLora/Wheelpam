<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Servicios extends Model
{
    protected $guarded = [];

    public function getIconAttribute($value)
    {
        return asset('storage/' . $value);
    }
}
