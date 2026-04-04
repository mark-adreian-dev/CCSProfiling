<?php

namespace App\Application\UseCases\Affiliation;

use App\Domain\Repositories\AffiliationRepositoryInterface;
use App\Domain\Entities\AffiliationEntity;

class StoreAffiliationService
{
    public function __construct(
        private AffiliationRepositoryInterface $repository
    ) {
    }

    public function execute(AffiliationEntity $affiliationEntity): AffiliationEntity
    {
        return $this->repository->createAffiliation($affiliationEntity);
    }
}