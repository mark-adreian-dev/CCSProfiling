<?php

namespace App\Application\UseCases\Authentication;

use App\Domain\Repositories\UserRepositoryInterface;
use Illuminate\Support\Facades\Auth;
use Exception;

class GetUserUseCase
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

        $user = $this->userRepository->findAuthenticatedUser();

        if (!$user) {
            throw new Exception("No records found", code: 404);
        }

        return $user;
    }
}