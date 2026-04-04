<?php

namespace App\Application\UseCases\Interest;

use App\Domain\Entities\InterestEntity;
use App\Domain\Repositories\InterestRepositoryInterface;

class GetInterestService
{
    public function __construct(
        private readonly InterestRepositoryInterface $repository
    ) {
    }

    public function execute(int $id): ?InterestEntity
    {
        return $this->repository->findInterestByID($id);
    }
}