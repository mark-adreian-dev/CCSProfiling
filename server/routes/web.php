<?php

use App\Presentation\Controllers\AuthController;
use App\Presentation\Controllers\StudentProfileController;
use Illuminate\Support\Facades\Route;

Route::prefix('api/v1')->group(function () {
    Route::post('login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->prefix('auth')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/user', [AuthController::class, 'me']);
    });

    Route::middleware('auth:sanctum')->prefix('students')->group(function () {
        Route::get('/', [StudentProfileController::class, 'getAllStudents']);
    });
});