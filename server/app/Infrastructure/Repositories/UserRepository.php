<?php

namespace App\Infrastructure\Repositories;

use App\Domain\Repositories\UserRepositoryInterface;
use App\Domain\Entities\User as DomainUser;
use App\Infrastructure\Models\User;

class UserRepository implements UserRepositoryInterface
{
    public function findByEmail(string $email): ?DomainUser
    {
        $user = User::where('email', $email)->first();

        if (!$user) {
            return null;
        }

        return new DomainUser(
            $user->id,
            $user->email,
            $user->password
        );
    }
}