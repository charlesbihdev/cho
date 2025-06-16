<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Vendor;
use App\Models\Setting;
use App\Models\Location;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class SettingController extends Controller
{
    public function index()
    {
        $settings = [
            'delivery_discount' => setting('delivery_discount'),
            'delivery_discount_active' => setting('delivery_discount_active'),
        ];

        // dd($settings);

        $users = User::select('id', 'name', 'email', 'role', 'active')
            ->latest()
            ->get();

        return Inertia::render('Admin/Settings', [
            'settings' => $settings,
            'users' => $users,
        ]);
    }


    public function updateDiscount(Request $request)
    {

        // dd($request->all());

        $validated = $request->validate([
            'delivery_discount' => 'nullable|numeric|min:0',
            'delivery_discount_active' => 'nullable|boolean',
        ]);

        if (isset($validated['delivery_discount'])) {
            Setting::setValue('delivery_discount', $validated['delivery_discount']);
        }

        if (isset($validated['delivery_discount_active'])) {
            Setting::setValue('delivery_discount_active', $validated['delivery_discount_active']);
        }

        return back()->with('flash.success', 'Delivery discount updated successfully.');
    }

    public function addUser(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:6'],
        ]);

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'active' => true,
        ]);

        return redirect()->back()->with('success', 'Delivery discount updated successfully.');
    }

    public function toggleDiscountActive(Request $request)
    {
        $current = Setting::getValue('delivery_discount_active');
        $new = $current ? 0 : 1;

        Setting::setValue('delivery_discount_active', $new);

        return back()->with('success', 'Discount status updated.');
    }


    public function toggleUser($id)
    {
        $user = User::findOrFail($id);
        $user->active = !$user->active;
        $user->save();

        return back()->with('success', 'User status updated.');
    }

    public function deleteUser($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return back()->with('success', 'User deleted successfully.');
    }
}
