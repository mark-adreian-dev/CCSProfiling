<?php

namespace App\Domain\Entities;

class StudentProfileEntity
{
    public function __construct(
        public ?int $id = null,
        public string $student_no,
        public int $program_id,
        public int $academic_year,
        public string $academic_status,
        public ?ProgramEntity $program = null,
    ) {
    }
}