<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Presentation\Controllers\AuthController;

Route::prefix('v1')->group(function () {
    Route::post('auth', [AuthController::class, 'login']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    })->middleware('auth:sanctum');

});
