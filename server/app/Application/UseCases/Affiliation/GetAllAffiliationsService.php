<?php

namespace App\Application\UseCases\Affiliation;

use App\Domain\Repositories\AffiliationRepositoryInterface;
use Illuminate\Database\Eloquent\Builder;

class GetAllAffiliationsService
{
    public function __construct(
        private AffiliationRepositoryInterface $repository
    ) {
    }

    public function execute(): Builder
    {
        return $this->repository->findAllAffiliations();
    }
}