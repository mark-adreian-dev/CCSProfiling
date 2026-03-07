<?php

namespace App\Application\UseCases\Authentication;

use App\Application\DTO\AuthDTO;
use App\Domain\Repositories\UserRepositoryInterface;
use Illuminate\Support\Facades\Hash;
use Exception;

class AuthUser
{
    public function __construct(
        protected UserRepositoryInterface $userRepository
    ) {
    }

    public function execute(AuthDTO $dto)
    {
        $user = $this->userRepository->findByEmail($dto->email);

        if (!$user) {
            throw new Exception("User not found");
        }

        if (!Hash::check($dto->password, $user->password)) {
            throw new Exception("Invalid credentials");
        }

        return $user;
    }
}