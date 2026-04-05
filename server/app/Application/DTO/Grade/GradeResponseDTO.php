<?php

namespace App\Application\DTO\Grade;

use App\Domain\Entities\GradeEntity;

class GradeResponseDTO
{
    public static function responseData(GradeEntity $grade): array
    {
        return [
            'id' => $grade->id,
            'grade_value' => $grade->grade_value,
            'curriculum' => $grade->curriculum,
            'subject' => $grade->subject,
            'semester' => $grade->semester,
            'academic_year' => $grade->academic_year,
        ];
    }
}