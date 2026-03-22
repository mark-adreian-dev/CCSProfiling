<?php

namespace App\Domain\Entities;
use Illuminate\Support\Facades\Hash;
class UserEntity
{
    public function __construct(
        public ?int $id,
        public string $email,
        public string $password,

        public ?string $role,

        public ?int $department_id = null,

        public ?string $name_prefix = null,
        public string $first_name,
        public ?string $middle_name = null,
        public string $last_name,
        public ?string $name_suffix = null,
        public ?string $age = null,

        public string $date_of_birth,

        public string $sex,

        public ?string $contact_number = null,
        public ?string $address = null,
        public ?string $profile_picture = null,

        public ?string $created_at = null,
        public ?string $updated_at = null,
        public ?string $deleted_at = null,
        public ?StudentProfileEntity $studentProfile = null,
        public ?FacultyProfileEntity $facultyProfile = null
    ) {
    }

    public function checkPassword(string $plainPassword): bool
    {
        return Hash::check( $plainPassword, $this->password);
    }
}