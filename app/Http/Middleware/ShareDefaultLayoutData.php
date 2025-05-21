<?php

// app/Http/Middleware/ShareDefaultLayoutData.php
namespace App\Http\Middleware;

use App\Models\Contacto;
use App\Models\Logos;
use App\Models\Provincia;
use Closure;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ShareDefaultLayoutData
{
    public function handle($request, Closure $next)
    {

        Inertia::share([
            'contacto' => fn() => Contacto::first(),
            'logos' => fn() => Logos::first(),

        ]);

        return $next($request);
    }
}
