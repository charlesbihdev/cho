<?php

namespace App\Channels;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;
use Illuminate\Notifications\Notification;

class ArkaselSmsChannel
{
    protected $apiUrl;
    protected $senderId;
    protected $apiToken;

    public function __construct()
    {
        $this->apiUrl = env('ARKASEL_SMS_API_URL', "https://sms.arkesel.com/sms/api");
        $this->senderId = env('ARKASEL_SMS_SENDER_ID', 'CHO APP');
        $this->apiToken = env('ARKASEL_SMS_API_TOKEN');
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
            'action' => "send-sms",
            'to' => $formattedPhone,
            'from' => $this->senderId,
            'sms' => $smsMessage,
            'api_key' => $this->apiToken,
        ]);

        // https://sms.arkesel.com/sms/api?action=send-sms&api_key=YOURKEY&to=PhoneNumber&from=SenderID&sms=YourMessage

        // Optionally handle response or log errors
        if ($response->successful()) {
            // Log success or perform additional actions

            // Log::info('SMS sent successfully.', [
            //     'response_body' => $response->body(),
            // ]);
        } else {
            // Log error details
            // dd($response->body());
            Log::error('SMS sending failed: ' . $response->body());
        }
    }
}
