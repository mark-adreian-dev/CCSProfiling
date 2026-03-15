<?php

namespace App\Application\UseCases\User;

use App\Domain\Entities\UserEntity;
use App\Domain\Entities\StudentProfileEntity;
use App\Domain\Entities\FacultyProfileEntity;
use App\Domain\Repositories\UserRepositoryInterface;
use App\Domain\Enums\RoleEnum;
use Exception;
use Hash;

class StoreUserService
{
    public function __construct(
        private readonly UserRepositoryInterface $userRepository
    ) {
    }

    /**
     * @param array<string, mixed> $data
     * @throws Exception
     */
    public function execute(array $data): UserEntity
    {

        $userEntity = new UserEntity(
            id: null,
            email: $data['email'],
            password: Hash::make('password'),
            role: $data['role'],
            department_id: isset($data['department_id']) ? (int) $data['department_id'] : null,
            name_prefix: $data['name_prefix'] ?? null,
            first_name: $data['first_name'],
            middle_name: $data['middle_name'] ?? null,
            last_name: $data['last_name'],
            name_suffix: $data['name_suffix'] ?? null,
            date_of_birth: $data['date_of_birth'],
            sex: $data['sex'],
            contact_number: $data['contact_number'] ?? null,
            address: $data['address'] ?? null,
            profile_picture: $data['profile_picture'] ?? null,
        );

        if ($userEntity->role === RoleEnum::ADMIN) {
            return $this->userRepository->createAdminUser($userEntity);
        } else if ($userEntity->role === RoleEnum::STUDENT) {
            return $this->userRepository->createStudentUser($userEntity, $data);
        } else {
            return $this->userRepository->createFacultyUser($userEntity, $data);
        }
    }
}