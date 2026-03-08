<?php

namespace App\Application\DTO\Authentication;

use App\Domain\Entities\UserEntity;

class AuthResponseDTO
{

    public static function responseData(UserEntity $user)
    {
        $response = new \stdClass();

        $response->id = $user->id;
        $response->role = $user->role;
        $response->name_prefix = $user->name_prefix;
        $response->first_name = $user->first_name;
        $response->middle_name = $user->middle_name;
        $response->last_name = $user->last_name;
        $response->name_suffix = $user->name_suffix;

        // Conditionally add student profile
        // if ($user->studentProfile) {
        //     $response->studentProfile = (object) [
        //         'id' => $user->studentProfile->id,
        //         'student_no' => $user->studentProfile->student_no,
        //         'course' => $user->studentProfile->course,
        //         'year_level' => $user->studentProfile->year_level,
        //     ];
        // }
        // Conditionally add faculty profile
        // if ($user->facultyProfile) {
        //     $response->facultyProfile = (object) [
        //         'id' => $user->facultyProfile->id,
        //         'employee_no' => $user->facultyProfile->employee_no,
        //         'position' => $user->facultyProfile->position,
        //     ];
        // } 

        return $response;
    }
}