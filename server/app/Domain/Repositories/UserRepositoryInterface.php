<?php

namespace App\Domain\Repositories;
use App\Domain\Entities\UserEntity;

interface UserRepositoryInterface
{
    public function findByIndentificationId(string $identification_id): ?UserEntity;

    public function findAuthenticatedUser(): ?UserEntity;
    public function unAuthenticateUser();

}