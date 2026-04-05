<?php

namespace App\Application\UseCases\Grade;
use App\Domain\Repositories\GradeRepositoryInterface;

class GetCurriculumService
{
    public function __construct(
        private GradeRepositoryInterface $curriculumRepository
    ) {
    }

    public function execute(): array
    {
        return $this->curriculumRepository->getStructuredCurriculum();
    }
}