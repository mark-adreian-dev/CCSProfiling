<?php

use App\Exceptions\ExcecptionHandler;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Session\TokenMismatchException;
use App\Presentation\Resources\FailedResource;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->statefulApi();

        $middleware->validateCsrfTokens(except: [
            'api/v1/auth/*'
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->render(function (AuthenticationException $e) {
            return new ExcecptionHandler()->unauthenticatedError();
        });

        $exceptions->render(function (TokenMismatchException $e) {
            return new ExcecptionHandler()->csrfTokenMismatchError();
        });
    })->create();
