<?php

namespace App\Presentation\Controllers;

use App\Application\DTO\PaginationResponseDTO;
use App\Application\DTO\User\UserResponseDTO;
use App\Application\UseCases\StudentProfile\GetAllStudentProfileUseCase;
use App\Domain\Entities\UserEntity;
use App\Domain\Enums\OrderEnum;
use App\Domain\Enums\UserSortBy;
use App\Presentation\Controllers\Controller;
use App\Presentation\Requests\GetAllStudentValidation;

class StudentProfileController extends Controller
{
    
    public function getAllStudents(GetAllStudentValidation $request, GetAllStudentProfileUseCase $getAllStudentProfile) {
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

        return PaginationResponseDTO::responseData(
            $paginatedData,
            fn(UserEntity $user) => UserResponseDTO::responseData($user)
        );
    }
    

    
}
