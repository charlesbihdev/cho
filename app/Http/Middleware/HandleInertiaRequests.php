<?php

namespace App\Http\Middleware;

use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;
use Illuminate\Http\Request;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),

            'auth' => [
                'user' => $request->user(),
            ],

            'flash' => [
                'message' => fn() => $request->session()->get('message'),
                'success' => fn() => $request->session()->get('success'),
                'warning' => fn() => $request->session()->get('warning'),
                'error' => fn() => $request->session()->get('error')
            ],
            'ziggy' => fn() => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'session_id' => $request->session()->getId()
        ];
    }
}
