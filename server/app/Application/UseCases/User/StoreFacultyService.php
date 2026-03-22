<?php

namespace App\Application\UseCases\User;

use App\Domain\Entities\UserEntity;
use App\Domain\Repositories\UserRepositoryInterface;
use App\Domain\Enums\RoleEnum;
use Exception;
use Carbon\Carbon;
use Hash;

class StoreFacultyService
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
            role: RoleEnum::FACULTY->value,
            age: Carbon::parse($data['date_of_birth'])->age,
            password: Hash::make('password'),
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

        return $this->userRepository->createFacultyUser($userEntity, $data);
    }
}
