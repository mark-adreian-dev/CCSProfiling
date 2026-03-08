<?php

namespace App\Domain\Entities;

class StudentProfileEntity
{
    public function __construct(
        public int $id,
        public string $student_no,
        public ?string $course = null,
        public ?int $year_level = null
    ) {
    }
}