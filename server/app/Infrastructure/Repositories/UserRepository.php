<?php

namespace App\Infrastructure\Repositories;

use App\Domain\Repositories\UserRepositoryInterface;
use App\Infrastructure\Models\FacultyProfile;
use App\Infrastructure\Models\StudentProfile;
use App\Infrastructure\Models\User;
use Illuminate\Support\Facades\Auth;
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

        $user = User::find($userId);

        if (!$user) {
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
            id: $user->id,
            email: $user->email,
            password: $user->password,

            role: $user->role,

            department_id: $user->department_id,

            name_prefix: $user->name_prefix,
            first_name: $user->first_name,
            middle_name: $user->middle_name,
            last_name: $user->last_name,
            name_suffix: $user->name_suffix,

            date_of_birth: $user->date_of_birth,

            sex: $user->sex,

            contact_number: $user->contact_number,
            address: $user->address,
            profile_picture: $user->profile_picture,

            created_at: $user->created_at,
            updated_at: $user->updated_at,
            deleted_at: $user->deleted_at,

            studentProfile: $studentEntity,
            facultyProfile: $facultyEntity
        );
    }

    public function findAuthenticatedUser(): ?UserEntity {
        $user = Auth::user()->load(['studentProfile', 'facultyProfile']);

        if (!$user) {
            return null;
        }

        $studentEntity = $user->studentProfile
            ? new StudentProfileEntity(
                id: $user->studentProfile->id,
                student_no: $user->studentProfile->student_no,
                course: $user->studentProfile->course,
                year_level: $user->studentProfile->year_level
            )
            : null;

        $facultyEntity = $user->facultyProfile
            ? new FacultyProfileEntity(
                id: $user->facultyProfile->id,
                employee_no: $user->facultyProfile->employee_no,
                position: $user->facultyProfile->position
            )
            : null;

        return new UserEntity(
            id: $user->id,
            email: $user->email,
            password: $user->password,

            role: $user->role,

            department_id: $user->department_id,

            name_prefix: $user->name_prefix,
            first_name: $user->first_name,
            middle_name: $user->middle_name,
            last_name: $user->last_name,
            name_suffix: $user->name_suffix,

            date_of_birth: $user->date_of_birth,

            sex: $user->sex,

            contact_number: $user->contact_number,
            address: $user->address,
            profile_picture: $user->profile_picture,

            created_at: $user->created_at,
            updated_at: $user->updated_at,
            deleted_at: $user->deleted_at,

            studentProfile: $studentEntity,
            facultyProfile: $facultyEntity
        );
    }

    public function unAuthenticateUser() {
        request()->session()->invalidate();
        request()->session()->regenerateToken();
    }
}