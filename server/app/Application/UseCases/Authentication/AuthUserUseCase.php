<?php

namespace App\Application\UseCases\Authentication;

use App\Application\DTO\Authentication\AuthRequestDTO;;
use App\Domain\Repositories\UserRepositoryInterface;
use Illuminate\Support\Facades\Hash;
use Exception;

class AuthUserUseCase
{
    public function __construct(
        protected UserRepositoryInterface $userRepository
    ) {
    }

    public function execute(AuthRequestDTO $dto)
    {
        $user = $this->userRepository->findByIndentificationId($dto->identification_id);

        if (!$user || !$user->checkPassword($dto->password)) {
            throw new Exception("Invalid credentials", 401);
        }

        return $user;
    }
}