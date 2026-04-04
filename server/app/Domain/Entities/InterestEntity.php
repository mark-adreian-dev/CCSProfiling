<?php

namespace App\Domain\Entities;
class InterestEntity
{
    public function __construct(
        public ?int $id = null,
        public string $name,
        public ?string $created_at = null,
        public ?string $updated_at = null,
        public ?string $deleted_at = null,
    ) {
    }
}