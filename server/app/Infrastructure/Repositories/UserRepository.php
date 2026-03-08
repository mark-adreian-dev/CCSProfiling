<?php

namespace App\Infrastructure\Repositories;

use App\Domain\Repositories\UserRepositoryInterface;
use App\Infrastructure\Models\FacultyProfile;
use App\Infrastructure\Models\StudentProfile;
use App\Infrastructure\Models\User;

use App\Domain\Entities\UserEntity;
use App\Domain\Entities\StudentProfileEntity;
use App\Domain\Entities\FacultyProfileEntity;

class UserRepository implements UserRepositoryInterface
{
    public function findByIndentificationId(string $identification_id): ?UserEntity
    {
        $student = StudentProfile::where('student_no', $identification_id)->first();
        $faculty = FacultyProfile::where('employee_no', $identification_id)->first();

        if (!$student && !$faculty) {
            //If no record for student and faculty is found
            return null;
        }

        $userId = $student?->user_id ?? $faculty?->user_id; //Identifies if student or faculty

        if (!$userId) {
            return null;
        }

        $userData = User::find($userId);

        if (!$userData) {
            return null;
        }

        $studentEntity = null;
        $facultyEntity = null;

        if ($student) {
            $studentEntity = new StudentProfileEntity(
                id: $student->id,
                student_no: $student->student_no,
                course: $student->course,
                year_level: $student->year_level
            );
        }

        if ($faculty) {
            $facultyEntity = new FacultyProfileEntity(
                id: $faculty->id,
                employee_no: $faculty->employee_no,
                position: $faculty->position
            );
        }

        return new UserEntity(
            id: $userData->id,
            email: $userData->email,
            password: $userData->password,

            role: $userData->role,

            department_id: $userData->department_id,

            name_prefix: $userData->name_prefix,
            first_name: $userData->first_name,
            middle_name: $userData->middle_name,
            last_name: $userData->last_name,
            name_suffix: $userData->name_suffix,

            date_of_birth: $userData->date_of_birth,

            sex: $userData->sex,

            contact_number: $userData->contact_number,
            address: $userData->address,
            profile_picture: $userData->profile_picture,

            created_at: $userData->created_at,
            updated_at: $userData->updated_at,
            deleted_at: $userData->deleted_at,

            studentProfile: $studentEntity,
            facultyProfile: $facultyEntity
        );
    }
}