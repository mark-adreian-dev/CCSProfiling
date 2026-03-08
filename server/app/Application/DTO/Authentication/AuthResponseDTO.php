<?php

namespace App\Application\DTO\Authentication;

use App\Domain\Entities\UserEntity;

class AuthResponseDTO
{

    public static function responseData(UserEntity $user)
    {
        $response = new \stdClass();

        $response->id = $user->id;
        $response->role = $user->role;
        $response->name_prefix = $user->name_prefix;
        $response->first_name = $user->first_name;
        $response->middle_name = $user->middle_name;
        $response->last_name = $user->last_name;
        $response->name_suffix = $user->name_suffix;

        return $response;
    }
}