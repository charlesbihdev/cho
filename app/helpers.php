<?php
// app/helpers.php

use App\Models\Setting;

if (!function_exists('setting')) {
    function setting(string $key, $default = null): mixed
    {
        return Setting::getValue($key, $default);
    }
}
