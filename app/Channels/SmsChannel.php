<?php

namespace App\Channels;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;
use Illuminate\Notifications\Notification;

class SmsChannel
{
    protected $apiUrl;
    protected $senderId;
    protected $apiToken;

    public function __construct()
    {
        $this->apiUrl = env('SMS_API_URL');
        $this->senderId = env('SMS_SENDER_ID', 'Event-Pulse');
        $this->apiToken = env('SMS_API_TOKEN');
    }

    public function send($notifiable, Notification $notification)
    {
        $smsMessage = $notification->toSms($notifiable);
        $recipient = $notifiable->phone; // Ensure this attribute is present

        if (strpos($recipient, '+') === 0) {
            // Phone number already in international format, leave it as is
            $formattedPhone = $recipient;
        } elseif (strpos($recipient, '0') === 0) {
            // Phone number starts with '0', replace it with '+233'
            $formattedPhone = '+233' . substr($recipient, 1);
        } else {
            // Phone number is neither starting with '+' nor '0', handle as needed
            $formattedPhone = $recipient; // or add error handling
        }


        // Send the SMS using the API
        $response = Http::get($this->apiUrl, [
            'recipient' => $formattedPhone,
            'sender_id' => $this->senderId,
            'message' => $smsMessage,
            'api_token' => $this->apiToken,
        ]);

        // Optionally handle response or log errors
        if ($response->successful()) {
            // Log success or perform additional actions
        } else {
            // Log error details
            Log::error('SMS sending failed: ' . $response->body());
        }
    }
}
