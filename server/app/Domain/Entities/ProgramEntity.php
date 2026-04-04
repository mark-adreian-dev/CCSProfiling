<?php

namespace App\Domain\Entities;
class ProgramEntity
{
    public function __construct(
        public int $id,
        public string $name,
        public ?string $code,
        public int $department_id,
        public ?string $description,
        public ?string $created_at,
        public $department = null,
    ) {
    }
}