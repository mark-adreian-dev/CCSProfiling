<?php

namespace App\Application\DTO\Affiliation;

use App\Domain\Entities\AffiliationEntity;

class AffiliationResponseDTO
{
    public static function responseData(AffiliationEntity $affiliation): array
    {
        return [
            'id' => $affiliation->id,
            'user_id' => $affiliation->user_id,
            'role' => $affiliation->role,
            'affiliation_name' => $affiliation->affiliation_name,
            'description' => $affiliation->description,
            'date_start' => $affiliation->date_start,
            'date_end' => $affiliation->date_end,
            'created_at' => $affiliation->created_at,
            'updated_at' => $affiliation->updated_at,
            'deleted_at' => $affiliation->deleted_at,
        ];
    }
}