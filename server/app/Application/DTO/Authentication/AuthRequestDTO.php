<?php

namespace App\Application\DTO\Authentication;

class AuthRequestDTO
{
    public function __construct(
        public string $identification_id,
        public string $password
    ) {
    }
}