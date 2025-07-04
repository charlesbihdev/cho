<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RestrictIPMiddleware
{
    /**
     * Allowed IPs.
     */
    protected $allowedIps = [
        '52.31.139.75',
        '52.49.173.169',
        '52.214.14.220',
    ];

    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (! in_array($request->ip(), $this->allowedIps)) {
            abort(403, 'Access denied.');
        }

        return $next($request);
    }
}
