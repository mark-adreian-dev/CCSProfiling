<?php

namespace App\Application\UseCases\Interest;

use App\Domain\Entities\InterestEntity;
use App\Domain\Repositories\InterestRepositoryInterface;

class StoreInterestService
{
    public function __construct(
        private readonly InterestRepositoryInterface $repository
    ) {
    }

    /**
     * @param array<string, mixed> $data
     */
    public function execute(array $data): InterestEntity
    {
        $interestEntity = new InterestEntity(
            id: null,
            name: $data['name']
        );

        return $this->repository->createInterest($interestEntity);
    }
}