<?php

namespace App\Domain\Entities;

class FacultyProfileEntity
{
    public function __construct(
        public ?int $id = null,           // Nullable for new records
        public string $employee_no,
        public ?string $expertise = null  // Optional field
    ) {
    }
}