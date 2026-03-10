<?php

namespace App\Application\UseCases\Authentication;

use App\Domain\Repositories\UserRepositoryInterface;
use Illuminate\Support\Facades\Auth;
use Exception;

class LogoutUserUseCase
{
    public function __construct(
        protected UserRepositoryInterface $userRepository
    ) {
    }

    public function execute()
    {
        if (!Auth::check()) {
            throw new Exception("Unauthorized", 401);
        }

        $this->userRepository->unAuthenticateUser();
    }
}