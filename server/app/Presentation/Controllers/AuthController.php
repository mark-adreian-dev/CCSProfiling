<?php

namespace App\Presentation\Controllers;

use App\Http\Controllers\Controller;
use App\Application\UseCases\Authentication\AuthUser;
use App\Application\DTO\AuthDTO;
use App\Http\Requests\Presentation\Requests\AuthValidation;

class AuthController extends Controller
{
    public function login(AuthValidation $request, AuthUser $loginUser)
    {
        $dto = new AuthDTO(
            $request->email,
            $request->password
        );

        $user = $loginUser->execute($dto);

        return response()->json([
            'message' => 'Login successful',
            'user' => $user
        ]);
    }
}