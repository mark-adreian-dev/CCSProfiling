<?php

namespace App\Application\UseCases\Authentication;

use App\Application\DTO\Authentication\AuthRequestDTO;;
use App\Domain\Repositories\UserRepositoryInterface;
use Illuminate\Support\Facades\Auth;
use Exception;

class AuthUseCase
{
    public function __construct(
        protected UserRepositoryInterface $userRepository
    ) {
    }

    public function execute(AuthRequestDTO $dto)
    {
        // Get the user entity
        $user = $this->userRepository->findByIndentificationId($dto->identification_id);

        if (!$user || !$user->checkPassword($dto->password)) {
            throw new Exception("Invalid credentials", 401);
        }

        // Login using Laravel session (cookie-based)
        Auth::loginUsingId($user->id);

        // Regenerate session after login
        request()->session()->regenerate();

        return $user;
    }

}