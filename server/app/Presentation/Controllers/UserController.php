<?php

namespace App\Presentation\Controllers;

use App\Application\DTO\PaginationResponseDTO;
use App\Application\DTO\User\UserResponseDTO;
use App\Application\UseCases\User\GetAllFacultyProfileService;
use App\Application\UseCases\User\GetAllStudentProfileService;
use App\Domain\Entities\UserEntity;
use App\Domain\Enums\OrderEnum;
use App\Domain\Enums\UserSortBy;
use App\Presentation\Controllers\Controller;
use App\Presentation\Requests\PaginationValidation;
use App\Presentation\Resources\FailedResource;
use App\Presentation\Resources\SuccessResource;
use Exception;

class UserController extends Controller
{

    public function getAllStudents(PaginationValidation $request, GetAllStudentProfileService $getAllStudentProfile)
    {
        try {
            $page = $request->input('page', 1);
            $pageSize = $request->input('pageSize', 10);
            $search = $request->input('search');

            $sortBy = UserSortBy::tryFrom(
                $request->input('sortBy', 'created_at')
            ) ?? UserSortBy::CREATED_AT;

            $order = OrderEnum::tryFrom(
                $request->input('order', 'desc')
            ) ?? OrderEnum::DESC;

            $paginatedData = $getAllStudentProfile->execute(
                $search,
                $page,
                $pageSize,
                $sortBy,
                $order
            );

            $responseData = PaginationResponseDTO::responseData(
                $paginatedData,
                fn(UserEntity $user) => UserResponseDTO::responseData($user)
            );

            return new SuccessResource([
                "data" => $responseData,
                "status" => 200,
                "message" => "Student profiles fetched successfully"
            ]);


        } catch (Exception $e) {
            return new FailedResource([
                "status" => $e->getCode() ?: 400,
                "message" => $e->getMessage(),
            ])->response()->setStatusCode($e->getCode() ?: 400);
        }



    }

    public function getAllFaculties(PaginationValidation $request, GetAllFacultyProfileService $getAllFacultyProfile)
    {
        try {
            $page = $request->input('page', 1);
            $pageSize = $request->input('pageSize', 10);
            $search = $request->input('search');

            $sortBy = UserSortBy::tryFrom(
                $request->input('sortBy', 'created_at')
            ) ?? UserSortBy::CREATED_AT;

            $order = OrderEnum::tryFrom(
                $request->input('order', 'desc')
            ) ?? OrderEnum::DESC;

            $paginatedData = $getAllFacultyProfile->execute(
                $search,
                $page,
                $pageSize,
                $sortBy,
                $order
            );


            $responseData = PaginationResponseDTO::responseData(
                $paginatedData,
                fn(UserEntity $user) => UserResponseDTO::responseData($user)
            );

            return new SuccessResource([
                "data" => $responseData,
                "status" => 200,
                "message" => "Faculty profiles fetched successfully"
            ]);


        } catch (Exception $e) {
            return new FailedResource([
                "status" => $e->getCode() ?: 400,
                "message" => $e->getMessage(),
            ])->response()->setStatusCode($e->getCode() ?: 400);

        }


    }



}
