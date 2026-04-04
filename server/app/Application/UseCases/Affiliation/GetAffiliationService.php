<?php

namespace App\Application\UseCases\Affiliation;

use App\Domain\Repositories\AffiliationRepositoryInterface;
use App\Domain\Entities\AffiliationEntity;

class GetAffiliationService
{
    public function __construct(
        private AffiliationRepositoryInterface $repository
    ) {
    }

    public function execute(int $id): ?AffiliationEntity
    {
        return $this->repository->findAffiliationByID($id);
    }
}