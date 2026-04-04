<?php
namespace App\Application\DTO\Program;
use App\Domain\Entities\ProgramEntity;

class ProgramResponseDTO
{
    public static function responseData(ProgramEntity $program): array
    {
        return [
            'id' => $program->id,
            'name' => $program->name,
            'code' => $program->code,
            'department_id' => $program->department_id,
            'description' => $program->description,
            'created_at' => $program->created_at,

            // Optional if you eager load department
            'department' => $program->department?->name,
        ];
    }
}