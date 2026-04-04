<?php

namespace App\Application\UseCases\Affiliation;

use App\Domain\Repositories\AffiliationRepositoryInterface;

class DeleteAffiliationService
{
    public function __construct(
        private AffiliationRepositoryInterface $repository
    ) {
    }

    public function execute(int $id): bool
    {
        return $this->repository->deleteAffiliation($id);
    }
}