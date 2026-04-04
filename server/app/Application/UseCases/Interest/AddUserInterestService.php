<?php

namespace App\Application\UseCases\Interest;

use App\Domain\Repositories\InterestRepositoryInterface;

class AddUserInterestService
{
    protected InterestRepositoryInterface $repository;

    public function __construct(InterestRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Add an interest to a user
     *
     * @param int $userId
     * @param int $interestId
     * @param string|null $startedAt
     * @return void
     */
    public function execute(int $interestId): void
    {
        $this->repository->addUserInterest($interestId);
    }
}