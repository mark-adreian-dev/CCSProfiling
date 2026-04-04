<?php

namespace App\Application\UseCases\Interest;

use App\Domain\Repositories\InterestRepositoryInterface;

class DeleteUserInterestService
{
    protected InterestRepositoryInterface $repository;

    public function __construct(InterestRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Remove an interest from a user
     *
     * @param int $userId
     * @param int $interestId
     * @param string|null $endedAt
     * @return void
     */
    public function execute(int $interestId): void
    {
        $this->repository->removeUserInterest($interestId);
    }
}