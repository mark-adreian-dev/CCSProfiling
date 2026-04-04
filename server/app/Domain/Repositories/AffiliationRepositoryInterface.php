<?php

namespace App\Domain\Repositories;

use App\Domain\Entities\AffiliationEntity;
use Illuminate\Database\Eloquent\Builder;

interface AffiliationRepositoryInterface
{
    public function findAllAffiliations(): Builder;
    public function findAffiliationByID(int $id): ?AffiliationEntity;
    public function createAffiliation(AffiliationEntity $affiliationEntity): AffiliationEntity;
    public function updateAffiliation(int $id, AffiliationEntity $affiliationEntity): AffiliationEntity;
    public function deleteAffiliation(int $id): bool;
}