<?php

namespace App\Domain\Entities;

class GradeEntity
{
    public function __construct(
        public ?int $id = null,
        public ?int $student_id = null,
        public ?int $semester_id = null,
        public ?int $subject_id = null,
        public ?int $curriculum_id = null,
        public ?int $academic_year_id = null,
        public ?float $grade_value = null,
        public ?string $created_at = null,
        public ?string $updated_at = null,
        public ?string $deleted_at = null,
        public ?array $curriculum = null,
        public ?array $subject = null,
        public ?array $semester = null,
        public ?array $academic_year = null,
    ) {
    }
}