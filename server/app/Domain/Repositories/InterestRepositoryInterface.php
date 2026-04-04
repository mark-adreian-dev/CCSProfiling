<?php

namespace App\Domain\Repositories;

use App\Domain\Entities\InterestEntity;
use Illuminate\Database\Eloquent\Builder;

interface InterestRepositoryInterface
{
    public function findAllInterests(): Builder; // returns array of InterestEntity
    public function findInterestByID(int $id): ?InterestEntity;
    public function createInterest(InterestEntity $interestEntity): InterestEntity;
    public function updateInterest(int $id, InterestEntity $interestEntity): InterestEntity;
    public function deleteInterest(int $id): bool;
    public function addUserInterest(int $interestId): void;
    public function removeUserInterest(int $interestId): void;
}