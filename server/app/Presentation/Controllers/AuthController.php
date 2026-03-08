<?php

namespace App\Presentation\Controllers;

use App\Presentation\Controllers\Controller;
use App\Application\UseCases\Authentication\AuthUserUseCase;
use App\Application\DTO\Authentication\AuthRequestDTO;
use App\Application\DTO\Authentication\AuthResponseDTO;
use App\Presentation\Requests\AuthValidation;
use App\Presentation\Resources\Authentication\SuccessAuthResource;

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

            return new SuccessAuthResource([
                "user" => $responseData,
                "status" => 200,
                "message" => "Login successfully, Welcome back {$responseData->first_name}"
            ]);

        } catch (\Exception $e) {
            return response()->json([
                "status" => $e->getCode() ?: 400,
                "message" => $e->getMessage(),
            ], $e->getCode() ?: 400);
        }
    }
}
