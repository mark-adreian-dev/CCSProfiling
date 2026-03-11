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

}