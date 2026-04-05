<?php

namespace App\Application\UseCases\Grade;

use App\Domain\Repositories\GradeRepositoryInterface;

class GetGradesByUserIdService
{
    public function __construct(private GradeRepositoryInterface $repository)
    {
    }

    public function execute(int $studentId): array
    {
        return $this->repository->getGradesByStudentId($studentId);
    }
}