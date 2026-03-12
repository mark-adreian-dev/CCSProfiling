<?php

use App\Presentation\Controllers\AuthController;
use App\Presentation\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('api/v1')->group(function () {
    Route::post('login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->prefix('auth')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/user', [AuthController::class, 'me']);
    });

    Route::middleware('auth:sanctum')->prefix('user')->group(function () {
        Route::get('students', [UserController::class, 'getAllStudents']);
        Route::get('faculties', [UserController::class, 'getAllFaculties']);
    });
});