<?php

use App\Presentation\Controllers\AffiliationController;
use App\Presentation\Controllers\AuthController;
use App\Presentation\Controllers\GradeController;
use App\Presentation\Controllers\InterestController;
use App\Presentation\Controllers\ProgramController;
use App\Presentation\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\File;

Route::get('/{any}', function () {
    return File::get(public_path('index.html'));
})->where('any', '^(?!api/v1|sanctum/csrf-cookie).*$');

Route::prefix('api/v1')->group(function () {
    Route::post('login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->prefix('auth')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/user', [AuthController::class, 'me']);
    });

    Route::middleware('auth:sanctum')->prefix('user')->group(function () {
        Route::get('faculties', [UserController::class, 'getAllFaculties']);
        Route::post('faculties', [UserController::class, 'createFacultyUser']);
        Route::get('faculties/{id}', [UserController::class, 'getFacultyByID']);
        Route::patch('faculties/{id}', [UserController::class, 'updateFacultyUser']);
        Route::get('students', [UserController::class, 'getAllStudents']);
        Route::post('students', [UserController::class, 'createStudentUser']);
        Route::patch('students/{id}', [UserController::class, 'updateStudentUser']);
        Route::get('students/{id}', [UserController::class, 'getStudentByID']);
    });

    Route::middleware('auth:sanctum')->prefix('program')->group(function () {
        Route::get('programs', [ProgramController::class, 'getAllPrograms']);
    });

    Route::middleware('auth:sanctum')->prefix('interest')->group(function () {
        Route::get('interests/chart', [InterestController::class, 'getInterestChartData']);
        Route::get('interests/reports', [InterestController::class, 'downloadInterestReport']);
        Route::get('interests', [InterestController::class, 'getAllInterests']);
        Route::post('interests', [InterestController::class, 'createInterest']);
        Route::get('interests/{id}', [InterestController::class, 'getInterestById']);
        Route::patch('interests/{id}', [InterestController::class, 'updateInterest']);
        Route::delete('interests/{id}', [InterestController::class, 'deleteInterest']);

        Route::post('user-interests/add', [InterestController::class, 'addUserInterest']);
        Route::post('user-interests/remove', [InterestController::class, 'removeUserInterest']);


    });

    Route::middleware('auth:sanctum')->prefix('affiliation')->group(function () {
        Route::get('affiliations', [AffiliationController::class, 'getAllAffiliations'])->name('affiliations.index');
        Route::get('affiliations/{id}', [AffiliationController::class, 'getAffiliationById'])->name('affiliations.show');
        Route::post('affiliations', [AffiliationController::class, 'createAffiliation'])->name('affiliations.store');
        Route::patch('affiliations/{id}', [AffiliationController::class, 'updateAffiliation'])->name('affiliations.update');
        Route::delete('affiliations/{id}', [AffiliationController::class, 'deleteAffiliation'])->name('affiliations.delete');
    });

    Route::middleware('auth:sanctum')->prefix('grade')->group(function () {
        Route::get('grades/{id}', [GradeController::class, 'getGrades']);
        Route::get('curriculum', [GradeController::class, 'getCurriculum']);
    });
});

Route::get('/php-check', function () {
    phpinfo();
});
