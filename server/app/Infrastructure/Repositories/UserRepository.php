<?php

namespace App\Infrastructure\Repositories;

use App\Domain\Entities\AffiliationEntity;
use App\Domain\Entities\ProgramEntity;
use App\Domain\Enums\RoleEnum;
use App\Domain\Repositories\UserRepositoryInterface;
use App\Infrastructure\Models\FacultyProfile;
use App\Infrastructure\Models\StudentProfile;
use App\Infrastructure\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Domain\Entities\UserEntity;
use App\Domain\Entities\StudentProfileEntity;
use App\Domain\Entities\FacultyProfileEntity;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

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
                program_id: $student->program_id,
                academic_year: $student->academic_year,
                academic_status: $student->academic_status
            );
        }

        if ($faculty) {
            $facultyEntity = new FacultyProfileEntity(
                id: $faculty->id,
                employee_no: $faculty->employee_no,
                expertise: $faculty->expertise

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
            age: $user->age,
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
    public function findAuthenticatedUser(): ?UserEntity
    {
        // Eager load student profile with program, faculty profile, and interests
        $user = Auth::user()->load([
            'studentProfile.program',
            'facultyProfile',
            'interests',
            'affiliations'
        ]);

        if (!$user) {
            return null;
        }

        $affiliationsArray = $user->affiliations
            ? $user->affiliations->map(function ($affiliation) {
                return new AffiliationEntity(
                    id: $affiliation->id,
                    user_id: $affiliation->user_id,
                    role: $affiliation->role,
                    affiliation_name: $affiliation->affiliation_name,
                    description: $affiliation->description,
                    date_start: $affiliation->date_start?->toDateString(),
                    date_end: $affiliation->date_end?->toDateString(),
                    created_at: $affiliation->created_at?->toDateTimeString(),
                    updated_at: $affiliation->updated_at?->toDateTimeString(),
                    deleted_at: $affiliation->deleted_at?->toDateTimeString(),
                );
            })->toArray()
            : [];

        // Map ProgramEntity if student has a program
        $programEntity = $user->studentProfile && $user->studentProfile->program
            ? new ProgramEntity(
                id: $user->studentProfile->program->id,
                name: $user->studentProfile->program->name,
                code: $user->studentProfile->program->code,
                department_id: (int) $user->studentProfile->program->department_id,
                description: $user->studentProfile->program->description,
                created_at: $user->studentProfile->program->created_at,
                department: $user->studentProfile->program->department ?? null
            )
            : null;

        // Map StudentProfileEntity
        $studentEntity = $user->studentProfile
            ? new StudentProfileEntity(
                id: $user->studentProfile->id,
                student_no: $user->studentProfile->student_no,
                program_id: (int) $user->studentProfile->program_id,
                program: $programEntity,
                academic_year: (int) $user->studentProfile->academic_year,
                academic_status: $user->studentProfile->academic_status
            )
            : null;

        // Map FacultyProfileEntity
        $facultyEntity = $user->facultyProfile
            ? new FacultyProfileEntity(
                id: $user->facultyProfile->id,
                employee_no: $user->facultyProfile->employee_no,
                expertise: $user->facultyProfile->expertise
            )
            : null;

        // Map Interests as array
        $interestsArray = $user->interests->map(function ($interest) {
            return [
                'id' => $interest->id,
                'name' => $interest->name,
            ];
        })->toArray();

        // Map and return UserEntity
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
            age: $user->age,
            date_of_birth: $user->date_of_birth,
            sex: $user->sex,
            contact_number: $user->contact_number,
            address: $user->address,
            profile_picture: $user->profile_picture,
            created_at: $user->created_at,
            updated_at: $user->updated_at,
            deleted_at: $user->deleted_at,
            studentProfile: $studentEntity,
            facultyProfile: $facultyEntity,
            interests: $interestsArray,
            affiliations: $affiliationsArray
        );
    }
    public function unAuthenticateUser() {
        request()->session()->invalidate();
        request()->session()->regenerateToken();
    }
    public function findAllStudentProfiles(): Builder
    {
        return User::query()
            ->where('role', RoleEnum::STUDENT->value)
            ->with('studentProfile');
    }
    public function findAllFacultyProfiles(): Builder
    {
        return User::query()
            ->with('facultyProfile')

            ->whereNotIn('role', [
                RoleEnum::STUDENT->value,
                RoleEnum::ADMIN->value,
            ]);
    }
    public function findAllFacultyProfilesById(string $employee_no): Builder
    {
        return User::query()
            ->with('facultyProfile')
            ->whereHas('facultyProfile', function ($query) use ($employee_no) {
                $query->where('employee_no', $employee_no);
            })
            ->whereNotIn('role', [
                RoleEnum::STUDENT->value,
                RoleEnum::ADMIN->value,
            ]);
    }
    public function findFacultyByID(int $id): ?UserEntity
    {
        // Fetch the user with the profile and interests relationships
        $user = User::with(['facultyProfile', 'interests', 'affiliations'])
            ->whereNotIn('role', [
                RoleEnum::STUDENT->value,
                RoleEnum::ADMIN->value,
            ])
            ->find($id);

        if (!$user) {
            return null;
        }

        $affiliationsArray = $user->affiliations
            ? $user->affiliations->map(function ($affiliation) {
                return new AffiliationEntity(
                    id: $affiliation->id,
                    user_id: $affiliation->user_id,
                    role: $affiliation->role,
                    affiliation_name: $affiliation->affiliation_name,
                    description: $affiliation->description,
                    date_start: $affiliation->date_start?->toDateString(),
                    date_end: $affiliation->date_end?->toDateString(),
                    created_at: $affiliation->created_at?->toDateTimeString(),
                    updated_at: $affiliation->updated_at?->toDateTimeString(),
                    deleted_at: $affiliation->deleted_at?->toDateTimeString(),
                );
            })->toArray()
            : [];

        // Hydrate the FacultyProfileEntity if the relation exists
        $facultyEntity = $user->facultyProfile
            ? new FacultyProfileEntity(
                id: $user->facultyProfile->id,
                employee_no: $user->facultyProfile->employee_no,
                expertise: $user->facultyProfile->expertise
            )
            : null;



        // Map interests
        $interestsArray = $user->interests->map(function ($interest) {
            return [
                'id' => $interest->id,
                'name' => $interest->name,
                'code' => $interest->code ?? null,
                'description' => $interest->description ?? null,
                // Optional: include pivot dates if you want
                'started_at' => $interest->pivot->started_at ?? null,
                'ended_at' => $interest->pivot->ended_at ?? null,
            ];
        })->toArray();

        // Map to the UserEntity (following your established structure)
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
            age: $user->age,
            date_of_birth: $user->date_of_birth,
            sex: $user->sex,
            contact_number: $user->contact_number,
            address: $user->address,
            profile_picture: $user->profile_picture,
            created_at: $user->created_at,
            updated_at: $user->updated_at,
            deleted_at: $user->deleted_at,
            studentProfile: null,
            facultyProfile: $facultyEntity,
            interests: $interestsArray,
            affiliations: $affiliationsArray
        );
    }
    public function updateFaculty(int $id, array $data): UserEntity
    {
        return DB::transaction(function () use ($id, $data) {
            $user = User::findOrFail($id);

            // Update User table (email, name, etc.)
            $user->update(collect($data)->except(['expertise'])->toArray());

            // Update Faculty Profile (expertise)
            if (isset($data['expertise'])) {
                $user->facultyProfile()->updateOrCreate(
                    ['user_id' => $user->id],
                    ['expertise' => $data['expertise']]
                );
            }

            $facultyEntity = $user->facultyProfile
                ? new FacultyProfileEntity(
                    id: $user->facultyProfile->id,
                    employee_no: $user->facultyProfile->employee_no,
                    expertise: $user->facultyProfile->expertise
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
                age: $user->age,
                date_of_birth: $user->date_of_birth,
                sex: $user->sex,
                contact_number: $user->contact_number,
                address: $user->address,
                profile_picture: $user->profile_picture,
                created_at: $user->created_at,
                updated_at: $user->updated_at,
                deleted_at: $user->deleted_at,
                studentProfile: null,
                facultyProfile: $facultyEntity
            );
        });
    }
    public function createAdminUser(UserEntity $userEntity): UserEntity
    {
        // 1. Create the Eloquent Model
        $user = User::create([
            'email' => $userEntity->email,
            'role' => $userEntity->role,
            'password' => Hash::make('dangal_password'),
            'department_id' => 1,
            'name_prefix' => $userEntity->name_prefix,
            'first_name' => $userEntity->first_name,
            'middle_name' => $userEntity->middle_name,
            'last_name' => $userEntity->last_name,
            'name_suffix' => $userEntity->name_suffix,
            'date_of_birth' => $userEntity->date_of_birth,
            'sex' => $userEntity->sex,
            'contact_number' => $userEntity->contact_number,
            'address' => $userEntity->address,
            'profile_picture' => $userEntity->profile_picture,
        ]);

        // 2. Hydrate the Entity with DB-generated values
        $userEntity->id = $user->id;
        $userEntity->created_at = (string) $user->created_at;
        $userEntity->updated_at = (string) $user->updated_at;

        // 3. Return the Entity to satisfy the Use Case type hint
        return $userEntity;
    }
    public function createFacultyUser(UserEntity $userEntity, array $data): UserEntity
    {
        return DB::transaction(function () use ($userEntity, $data) {

            $user = User::create([
                'email' => $userEntity->email,
                'role' => $userEntity->role,
                'password' => Hash::make('dangal_password'),
                'department_id' => 1,
                'age' => $userEntity->age,
                'name_prefix' => $userEntity->name_prefix,
                'first_name' => $userEntity->first_name,
                'middle_name' => $userEntity->middle_name,
                'last_name' => $userEntity->last_name,
                'name_suffix' => $userEntity->name_suffix,
                'date_of_birth' => $userEntity->date_of_birth,
                'sex' => $userEntity->sex,
                'contact_number' => $userEntity->contact_number,
                'address' => $userEntity->address,
                'profile_picture' => $userEntity->profile_picture,
            ]);

            // 2. Generate Employee No
            $lastNo = (int) FacultyProfile::max('employee_no') ?: 0;
            $newEmployeeNo = str_pad($lastNo + 1, 7, '0', STR_PAD_LEFT);

            // 3. Create Profile using the $data array passed from the Use Case
            $profileModel = FacultyProfile::create([
                'user_id' => $user->id,
                'employee_no' => $newEmployeeNo,
                'expertise' => $data['expertise'] ?? null, // Expertise extracted here!
            ]);

            // 4. Hydrate Entity for response
            $userEntity->id = $user->id;
            $userEntity->department_id = $user->department_id;
            $userEntity->created_at = $user->created_at;
            $userEntity->facultyProfile = new FacultyProfileEntity(
                id: $profileModel->id,
                employee_no: $profileModel->employee_no,
                expertise: $profileModel->expertise
            );

            return $userEntity;
        });
    }
    public function createStudentUser(UserEntity $userEntity, array $data): UserEntity
    {
        return DB::transaction(function () use ($userEntity, $data) {

            // 1. Create User
            $user = User::create([
                'email' => $userEntity->email,
                'role' => $userEntity->role,
                'password' => Hash::make('dangal_password'),
                'department_id' => 1,
                'age' => $userEntity->age,
                'name_prefix' => $userEntity->name_prefix,
                'first_name' => $userEntity->first_name,
                'middle_name' => $userEntity->middle_name,
                'last_name' => $userEntity->last_name,
                'name_suffix' => $userEntity->name_suffix,
                'date_of_birth' => $userEntity->date_of_birth,
                'sex' => $userEntity->sex,
                'contact_number' => $userEntity->contact_number,
                'address' => $userEntity->address,
                'profile_picture' => $userEntity->profile_picture,
            ]);

            // 2. Generate Student No
            $lastNo = (int) StudentProfile::max('student_no') ?: 0;
            $newStudentNo = str_pad($lastNo + 1, 7, '0', STR_PAD_LEFT);

            // 3. Create Student Profile with defaults if missing
            $studentProfile = StudentProfile::create([
                'user_id' => $user->id,
                'student_no' => $newStudentNo,
                'program_id' => $data['program_id'] ?? null,
                'academic_status' => $data['academic_status'] ?? null, // default
                'academic_year' => $data['academic_year'] ?? null,             // default
            ]);

            // 4. Hydrate Entity for response
            $userEntity->id = $user->id;
            $userEntity->department_id = $user->department_id;
            $userEntity->created_at = $user->created_at;

            $userEntity->studentProfile = new StudentProfileEntity(
                id: $studentProfile->id,
                student_no: $studentProfile->student_no,
                program_id: (int) $studentProfile->program_id,
                academic_year: (int) $studentProfile->academic_year,
                academic_status: $studentProfile->academic_status
            );

            return $userEntity;
        });
    }
    public function updateStudent(int $id, array $data): UserEntity
    {

        return DB::transaction(function () use ($id, $data) {
            $user = User::findOrFail($id);

            // 1. Update User table (exclude student-specific fields)
            $user->update(collect($data)->except([
                'program_id',
                'academic_year',
                'academic_status'
            ])->toArray());

            // 2. Update Student Profile
            $studentProfile = $user->studentProfile()->updateOrCreate(
                ['user_id' => $user->id],
                [
                    'program_id' => isset($data['program_id']) ? (int) $data['program_id'] : null,
                    'academic_year' => isset($data['academic_year']) ? (int) $data['academic_year'] : null,
                    'academic_status' => $data['academic_status'] ?? null,
                ]
            );

            // 3. Build StudentProfileEntity
            $studentEntity = $studentProfile
                ? new StudentProfileEntity(
                    id: $studentProfile->id,
                    student_no: $studentProfile->student_no,
                    program_id: (int) $studentProfile->program_id,
                    academic_year: (int) $studentProfile->academic_year,
                    academic_status: $studentProfile->academic_status
                )
                : null;

            // 4. Return UserEntity (aligned with create + faculty structure)
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
                age: $user->age,
                date_of_birth: $user->date_of_birth,
                sex: $user->sex,
                contact_number: $user->contact_number,
                address: $user->address,
                profile_picture: $user->profile_picture,
                created_at: $user->created_at,
                updated_at: $user->updated_at,
                deleted_at: $user->deleted_at,
                studentProfile: $studentEntity,
                facultyProfile: null
            );
        });
    }
    public function findStudentByID(int $id): ?UserEntity
    {
        // 1. Fetch user WITH student profile, program, and interests
        $user = User::with(['studentProfile.program', 'interests'])
            ->where('role', RoleEnum::STUDENT->value)
            ->find($id);

        if (!$user) {
            return null;
        }

        $affiliationsArray = $user->affiliations
            ? $user->affiliations->map(function ($affiliation) {
                return new AffiliationEntity(
                    id: $affiliation->id,
                    user_id: $affiliation->user_id,
                    role: $affiliation->role,
                    affiliation_name: $affiliation->affiliation_name,
                    description: $affiliation->description,
                    date_start: $affiliation->date_start?->toDateString(),
                    date_end: $affiliation->date_end?->toDateString(),
                    created_at: $affiliation->created_at?->toDateTimeString(),
                    updated_at: $affiliation->updated_at?->toDateTimeString(),
                    deleted_at: $affiliation->deleted_at?->toDateTimeString(),
                );
            })->toArray()
            : [];

        // 2. Hydrate ProgramEntity if it exists
        $programEntity = $user->studentProfile && $user->studentProfile->program
            ? new ProgramEntity(
                id: $user->studentProfile->program->id,
                name: $user->studentProfile->program->name,
                code: $user->studentProfile->program->code,
                department_id: $user->studentProfile->program->department_id,
                description: $user->studentProfile->program->description,
                created_at: $user->studentProfile->program->created_at,
                department: $user->studentProfile->program->department ?? null
            )
            : null;

        // 3. Hydrate StudentProfileEntity
        $studentEntity = $user->studentProfile
            ? new StudentProfileEntity(
                id: $user->studentProfile->id,
                student_no: $user->studentProfile->student_no,
                program_id: (int) $user->studentProfile->program_id,
                academic_year: (int) $user->studentProfile->academic_year,
                academic_status: $user->studentProfile->academic_status,
                program: $programEntity
            )
            : null;

        // 4. Map interests
        $interestsArray = $user->interests->map(function ($interest) {
            return [
                'id' => $interest->id,
                'name' => $interest->name,
                'code' => $interest->code ?? null,
                'description' => $interest->description ?? null,
                'started_at' => $interest->pivot->started_at ?? null,
                'ended_at' => $interest->pivot->ended_at ?? null,
            ];
        })->toArray();

        // 5. Return UserEntity
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
            age: $user->age,
            date_of_birth: $user->date_of_birth,
            sex: $user->sex,
            contact_number: $user->contact_number,
            address: $user->address,
            profile_picture: $user->profile_picture,
            created_at: $user->created_at,
            updated_at: $user->updated_at,
            deleted_at: $user->deleted_at,
            studentProfile: $studentEntity,
            facultyProfile: null,
            interests: $interestsArray,
            affiliations: $affiliationsArray
        );
    }
}
