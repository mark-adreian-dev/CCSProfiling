<?php

namespace App\Application\UseCases\Interest;

use App\Domain\Entities\InterestEntity;
use App\Domain\Repositories\InterestRepositoryInterface;

class UpdateInterestService
{
    public function __construct(
        private readonly InterestRepositoryInterface $repository
    ) {
    }

    public function execute(int $id, array $data): InterestEntity
    {
        $interestEntity = new InterestEntity(
            id: $id,
            name: $data['name'] ?? ''
        );

        return $this->repository->updateInterest($id, $interestEntity);
    }
}