<?php

namespace App\Infrastructure\Repositories;

use App\Domain\Entities\InterestEntity;
use App\Domain\Repositories\InterestRepositoryInterface;
use App\Infrastructure\Models\Interest;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;


class InterestRepository implements InterestRepositoryInterface
{

    public function findAllInterests(): Builder
    {
        return Interest::query();
    }

    public function findInterestByID(int $id): ?InterestEntity
    {
        $i = Interest::find($id);
        if (!$i)
            return null;

        return new InterestEntity(
            id: $i->id,
            name: $i->name,
            created_at: $i->created_at?->toDateTimeString(),
            updated_at: $i->updated_at?->toDateTimeString(),
            deleted_at: $i->deleted_at?->toDateTimeString(),
        );
    }

    public function createInterest(InterestEntity $interestEntity): InterestEntity
    {
        return DB::transaction(function () use ($interestEntity) {
            $interest = Interest::create([
                'name' => $interestEntity->name,
            ]);

            $interestEntity->id = $interest->id;
            $interestEntity->created_at = $interest->created_at?->toDateTimeString();
            $interestEntity->updated_at = $interest->updated_at?->toDateTimeString();

            return $interestEntity;
        });
    }

    public function updateInterest(int $id, InterestEntity $interestEntity): InterestEntity
    {
        return DB::transaction(function () use ($id, $interestEntity) {
            $interest = Interest::findOrFail($id);

            $interest->update([
                'name' => $interestEntity->name ?? $interest->name,
            ]);

            $interestEntity->id = $interest->id;
            $interestEntity->updated_at = $interest->updated_at?->toDateTimeString();

            return $interestEntity;
        });
    }

    public function deleteInterest(int $id): bool
    {
        $interest = Interest::findOrFail($id);
        return $interest->delete();
    }

    public function addUserInterest(int $interestId): void
    {
        $user = Auth::user();

        if (!$user) {
            throw new \Exception("Unauthenticated");
        }

        // Check if pivot already exists (including soft deleted)
        $existing = DB::table('user_interests')
            ->where('user_id', $user->id)
            ->where('interest_id', $interestId)
            ->first();

        if ($existing) {
            // Restore if soft deleted OR update existing
            DB::table('user_interests')
                ->where('user_id', $user->id)
                ->where('interest_id', $interestId)
                ->update([
                    'deleted_at' => null,
                    'started_at' => now(),
                    'ended_at' => null,
                    'updated_at' => now(),
                ]);
        } else {
            // Create new pivot
            $user->interests()->attach($interestId, [
                'started_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    public function removeUserInterest(int $interestId): void
    {
        $user = Auth::user();

        if (!$user) {
            throw new \Exception("Unauthenticated");
        }

        DB::table('user_interests')
            ->where('user_id', $user->id)
            ->where('interest_id', $interestId)
            ->update([
                'ended_at' => now(),
                'deleted_at' => now(),
                'updated_at' => now(),
            ]);
    }
}