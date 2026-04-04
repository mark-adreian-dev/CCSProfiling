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
        $response->interests = $user->interests;

        // Affiliations
        if ($user->affiliations) {
            $response->affiliations = array_map(function ($affiliation) {
                return (object) [
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
            }, $user->affiliations);
        } else {
            $response->affiliations = [];
        }

        // Student Profile
        if ($user->studentProfile) {
            $student = $user->studentProfile;

            $studentData = new stdClass();
            $studentData->id = $student->id;
            $studentData->student_no = $student->student_no;
            $studentData->academic_year = $student->academic_year;
            $studentData->academic_status = $student->academic_status;

            // Include Program
            if ($student->program) {
                $program = $student->program;
                $studentData->program = (object) [
                    'id' => $program->id,
                    'name' => $program->name,
                    'code' => $program->code,
                    'department_id' => $program->department_id,
                    'description' => $program->description,
                    'created_at' => $program->created_at,
                    'department' => $program->department ?? null,
                ];
            } else {
                $studentData->program = null;
            }

            $response->studentProfile = $studentData;
        }

        // Faculty Profile
        if ($user->facultyProfile) {
            $faculty = $user->facultyProfile;
            $response->facultyProfile = (object) [
                'id' => $faculty->id,
                'employee_no' => $faculty->employee_no,
                'expertise' => $faculty->expertise,
            ];
        }

        return $response;
    }
}