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

    /**
     * Create a new notification instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return [SmsChannel::class];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->line('The introduction to the notification.')
            ->action('Notification Action', url('/'))
            ->line('Thank you for using our application!');
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
        // Retrieve event details
        // $event = $this->event;
        // $datetime = $this->datetime;
        // $humanReadableDate = Carbon::parse($datetime)->format('l, F jS, Y \a\t g:i A');
        // $url = route('ticket.view', ['ticket_id' => $this->ticketId]);

        // Construct the SMS message
        // return "Hello {$this->name}, your ticket for {$event->name} is confirmed. Ticket ID: {$this->ticketId}. Ticket Link: {$url}. Event happening on {$humanReadableDate}. We look forward to seeing you there!";
        return "Hello your order is placed successfully";
    }



    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
