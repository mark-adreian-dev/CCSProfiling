<?php

namespace App\Domain\Entities;

class AffiliationEntity
{
    public function __construct(
        public ?int $id = null,
        public ?int $user_id = null,
        public string $role = '',
        public string $affiliation_name = '',
        public ?string $description = null,
        public ?string $date_start = null,
        public ?string $date_end = null,
        public ?string $created_at = null,
        public ?string $updated_at = null,
        public ?string $deleted_at = null,
    ) {
    }
}