<?php

namespace App\Exceptions;
use App\Presentation\Resources\FailedResource;

class ExcecptionHandler
{
    public function invalidCredentials()
    {
        return (new FailedResource([
            'status' => 401,
            'message' => 'Invalid Credentials',
        ]))->response()->setStatusCode(401);
    } 
    public function unauthenticatedError()
    {
        return (new FailedResource([
            'status' => 401,
            'message' => 'Unauthorizedssssssssss',
        ]))->response()->setStatusCode(401);
    }

    public function csrfTokenMismatchError()
    {
        return (new FailedResource([
            'status' => 419,
            'message' => 'Invalid or missing CSRF token.'
        ]))->response()->setStatusCode(419);
    }
}