<?php

namespace App\Domain\Entities;

class FacultyProfileEntity
{
    public function __construct(
        public int $id,
        public string $expertise,
        public string $employee_no,
    ) {
    }
}