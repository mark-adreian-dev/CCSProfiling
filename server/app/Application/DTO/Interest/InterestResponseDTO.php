<?php

namespace App\Application\DTO\Interest;

use App\Domain\Entities\InterestEntity;

class InterestResponseDTO
{
    public static function responseData(InterestEntity $interest): array
    {
        return [
            'id' => $interest->id,
            'name' => $interest->name,
            'created_at' => $interest->created_at,
            'updated_at' => $interest->updated_at,
            'deleted_at' => $interest->deleted_at,
        ];
    }
}