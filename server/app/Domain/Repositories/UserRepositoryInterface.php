<?php

namespace App\Domain\Repositories;
use App\Domain\Entities\UserEntity;
use Illuminate\Database\Eloquent\Builder;

interface UserRepositoryInterface
{
    public function findByIndentificationId(string $identification_id): ?UserEntity;

    public function findAuthenticatedUser(): ?UserEntity;

    public function unAuthenticateUser();

    public function findAllStudentProfiles(): Builder;
    public function findAllFacultyProfiles(): Builder;
    public function findAllFacultyProfilesById(string $employee_no): Builder;

    public function createFacultyUser(UserEntity $userEntity, array $data): UserEntity;
    public function createAdminUser(UserEntity $userEntity): UserEntity;

    public function createStudentUser(UserEntity $userEntity, array $data): UserEntity;
}