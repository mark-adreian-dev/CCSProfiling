<?php

namespace App\Presentation\Controllers;

use App\Application\DTO\User\UserResponseDTO;
use App\Application\UseCases\Authentication\LogoutUserUseCase;
use App\Presentation\Controllers\Controller;
use App\Application\UseCases\Authentication\AuthUserUseCase;
use App\Application\UseCases\Authentication\GetUserUseCase;
use App\Application\DTO\Authentication\AuthRequestDTO;
use App\Application\DTO\Authentication\AuthResponseDTO;
use App\Presentation\Requests\AuthValidation;
use App\Presentation\Resources\FailedResource;
use App\Presentation\Resources\SuccessResource;
use Exception;

class AuthController extends Controller
{
    public function login(AuthValidation $request, AuthUserUseCase $loginUser)
    {
        try {
            $dto = new AuthRequestDTO(
                $request->identification_id,
                $request->password
            );

            $user = $loginUser->execute($dto);
            $responseData = AuthResponseDTO::responseData($user);

            return new SuccessResource([
                "user" => $responseData,
                "status" => 200,
                "message" => "Login successfully, Welcome back {$responseData->first_name}"
            ]);

        } catch (Exception $e) {
            return new FailedResource([
                "status" => $e->getCode() ?: 400,
                "message" => $e->getMessage(),
            ])->response()->setStatusCode($e->getCode() ?: 400);
        }
    }

    public function me(GetUserUseCase $getUser) {
        try {
            $user = $getUser->execute();
            return UserResponseDTO::responseData($user);

        } catch (Exception $e) {
            return new FailedResource([
                "status" => $e->getCode() ?: 400,
                "message" => $e->getMessage(),
            ])->response()->setStatusCode($e->getCode() ?: 400);
        }
    }

    public function logout(LogoutUserUseCase $logoutUser) {
        try {
            $logoutUser->execute();

            return new SuccessResource([
                'status' => 200,
                'message' => "Logged out successfully"
            ]);
        } catch (Exception $e) {
            return new FailedResource([
                "status" => $e->getCode() ?: 400,
                "message" => $e->getMessage(),
            ])->response()->setStatusCode($e->getCode() ?: 400);
        }
    }
}
