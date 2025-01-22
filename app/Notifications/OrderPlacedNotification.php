<?php

namespace App\Notifications;

use App\Channels\SmsChannel;
use Illuminate\Bus\Queueable;
use Illuminate\Support\Carbon;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class OrderPlacedNotification extends Notification
{
    use Queueable;

    private $orderId;

    /**
     * Create a new notification instance.
     */
    public function __construct($orderId)
    {
        $this->orderId = $orderId;
    }


    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', SmsChannel::class];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $trackingUrl = route('orders.track', ['order_id' => $this->orderId]);

        return (new MailMessage)
            ->subject('Order Confirmation - CHO')
            ->greeting('Hello,')
            ->line('Your order has been placed successfully!')
            ->line('You can track your order using the link below:')
            ->action('Track Your Order', $trackingUrl)
            ->line('Thank you for choosing our service!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */


    /**
     * Get the SMS representation of the notification.
     */


    public function toSms($notifiable): string
    {
        $trackingUrl = route('orders.track', ['order_id' => $this->orderId]);

        // Retrieve event details

        return "Hello, your order has been placed successfully. You can track your order here: $trackingUrl";
    }



    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
