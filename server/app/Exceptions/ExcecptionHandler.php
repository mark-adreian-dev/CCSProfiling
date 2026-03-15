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

    public function validationError(array $errors)
    {
        return (new FailedResource([
            'status' => 422,
            'message' => 'Validation Failed',
            'errors' => $errors, // Pass the detailed errors here
        ]))->response()->setStatusCode(422);
    }

    public function unauthenticatedError()
    {
        return (new FailedResource([
            'status' => 401,
            'message' => 'Unauthorized',
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