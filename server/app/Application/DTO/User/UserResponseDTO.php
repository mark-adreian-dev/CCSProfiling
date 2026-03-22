<?php

namespace App\Application\DTO\User;

use App\Domain\Entities\UserEntity;
use stdClass;

class UserResponseDTO
{
    public static function responseData(UserEntity $user): stdClass
    {
        $response = new stdClass();

        // Basic Info & Identity
        $response->id = $user->id;
        $response->email = $user->email;
        $response->role = $user->role;
        $response->department_id = $user->department_id;

        // Name Details
        $response->name_prefix = $user->name_prefix;
        $response->first_name = $user->first_name;
        $response->middle_name = $user->middle_name;
        $response->last_name = $user->last_name;
        $response->name_suffix = $user->name_suffix;

        // Personal Details
        $response->date_of_birth = $user->date_of_birth;
        $response->sex = $user->sex;
        $response->contact_number = $user->contact_number;
        $response->address = $user->address;
        $response->profile_picture = $user->profile_picture;
        $response->created_at = $user->created_at;

        if ($user->studentProfile) {
            $response->studentProfile = (object) [
                'id' => $user->studentProfile->id,
                'student_no' => $user->studentProfile->student_no,
                'academic_year' => $user->studentProfile->academic_year,
                'academic_status' => $user->studentProfile->academic_status,
            ];
        }

        if ($user->facultyProfile) {
            $response->facultyProfile = (object) [
                'id' => $user->facultyProfile->id,
                'employee_no' => $user->facultyProfile->employee_no,
                'expertise' => $user->facultyProfile->expertise,
            ];
        }

        return $response;
    }
}