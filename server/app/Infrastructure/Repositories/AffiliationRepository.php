<?php

namespace App\Infrastructure\Repositories;

use App\Domain\Entities\AffiliationEntity;
use App\Domain\Repositories\AffiliationRepositoryInterface;
use App\Infrastructure\Models\Affiliation;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class AffiliationRepository implements AffiliationRepositoryInterface
{
    /**
     * Get all affiliations (including soft deleted if needed separately)
     */
    public function findAllAffiliations(): Builder
    {
        return Affiliation::query();
    }

    /**
     * Find a single affiliation by ID
     */
    public function findAffiliationByID(int $id): ?AffiliationEntity
    {
        $affiliation = Affiliation::withTrashed()->find($id);
        if (!$affiliation)
            return null;

        return new AffiliationEntity(
            id: $affiliation->id,
            user_id: $affiliation->user_id,
            role: $affiliation->role,
            affiliation_name: $affiliation->affiliation_name,
            description: $affiliation->description,
            date_start: $affiliation->date_start?->toDateString(),
            date_end: $affiliation->date_end?->toDateString(),
            created_at: $affiliation->created_at?->toDateTimeString(),
            updated_at: $affiliation->updated_at?->toDateTimeString(),
            deleted_at: $affiliation->deleted_at?->toDateTimeString(),
        );
    }

    /**
     * Create a new affiliation
     */
    public function createAffiliation(AffiliationEntity $affiliationEntity): AffiliationEntity
    {
        return DB::transaction(function () use ($affiliationEntity) {
            $affiliation = Affiliation::create([
                'user_id' => $affiliationEntity->user_id,
                'role' => $affiliationEntity->role,
                'affiliation_name' => $affiliationEntity->affiliation_name,
                'description' => $affiliationEntity->description,
                'date_start' => $affiliationEntity->date_start,
                'date_end' => $affiliationEntity->date_end,
            ]);

            $affiliationEntity->id = $affiliation->id;
            $affiliationEntity->created_at = $affiliation->created_at?->toDateTimeString();
            $affiliationEntity->updated_at = $affiliation->updated_at?->toDateTimeString();

            return $affiliationEntity;
        });
    }

    /**
     * Update an existing affiliation
     */
    public function updateAffiliation(int $id, AffiliationEntity $affiliationEntity): AffiliationEntity
    {
        return DB::transaction(function () use ($id, $affiliationEntity) {
            $affiliation = Affiliation::withTrashed()->findOrFail($id);

            $affiliation->update([
                'user_id' => $affiliationEntity->user_id ?? $affiliation->user_id,
                'role' => $affiliationEntity->role ?? $affiliation->role,
                'affiliation_name' => $affiliationEntity->affiliation_name ?? $affiliation->affiliation_name,
                'description' => $affiliationEntity->description ?? $affiliation->description,
                'date_start' => $affiliationEntity->date_start ?? $affiliation->date_start,
                'date_end' => $affiliationEntity->date_end ?? $affiliation->date_end,
            ]);

            $affiliationEntity->id = $affiliation->id;
            $affiliationEntity->updated_at = $affiliation->updated_at?->toDateTimeString();

            return $affiliationEntity;
        });
    }

    /**
     * Soft delete an affiliation
     */
    public function deleteAffiliation(int $id): bool
    {
        $affiliation = Affiliation::findOrFail($id);
        return $affiliation->delete();
    }
}