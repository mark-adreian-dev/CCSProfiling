<?php

namespace App\Application\UseCases\Interest;

use App\Domain\Repositories\InterestRepositoryInterface;

class DeleteInterestService
{
    public function __construct(
        private readonly InterestRepositoryInterface $repository
    ) {
    }

    public function execute(int $id): bool
    {
        return $this->repository->deleteInterest($id);
    }
}