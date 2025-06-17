<?php

namespace App\Services;

use Unicodeveloper\Paystack\Paystack;

class CustomPaystack extends Paystack
{
    public function verifyTransactionAtGateway($reference)
    {
        return $this->verifyTransactionAtGateway($reference);
    }
}
