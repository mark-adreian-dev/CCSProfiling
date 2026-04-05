<?php

namespace App\Domain\Repositories;

interface GradeRepositoryInterface
{
    public function getGradesByStudentId(int $studentId): array;

    public function getStructuredCurriculum(): array;
}