<?php

namespace App\Application\UseCases\Affiliation;

use App\Domain\Repositories\AffiliationRepositoryInterface;
use App\Domain\Entities\AffiliationEntity;

class UpdateAffiliationService
{
    public function __construct(
        private AffiliationRepositoryInterface $repository
    ) {
    }

    public function execute(int $id, AffiliationEntity $affiliationEntity): AffiliationEntity
    {
        return $this->repository->updateAffiliation($id, $affiliationEntity);
    }
}