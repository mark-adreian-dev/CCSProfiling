<?php

namespace App\Application\UseCases\Interest;

use App\Domain\Repositories\InterestRepositoryInterface;

class InterestChartDataService
{
    public function __construct(
        private readonly InterestRepositoryInterface $repository
    ) {
    }

    public function execute(): array
    {
        return $this->repository->getInterestChartData();
    }
}
