<?php

namespace App\Application\DTO;

class AuthDTO
{
    public function __construct(
        public string $email,
        public string $password
    ) {
    }
}