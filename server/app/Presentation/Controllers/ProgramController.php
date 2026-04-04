<?php

namespace App\Presentation\Controllers;

use App\Application\DTO\PaginationResponseDTO;
use App\Application\UseCases\Program\GetAllProgramService;
use App\Domain\Entities\ProgramEntity;
use App\Domain\Enums\OrderEnum;
use App\Domain\Enums\ProgramSortBy;
use App\Presentation\Controllers\Controller;
use App\Presentation\Requests\PaginationValidation;
use App\Presentation\Resources\FailedResource;
use App\Presentation\Resources\SuccessResource;
use Exception;
use App\Application\DTO\Program\ProgramResponseDTO;

class ProgramController extends Controller
{
    public function getAllPrograms(
        PaginationValidation $request,
        GetAllProgramService $service
    ) {
        try {
            $page = $request->input('page', 1);
            $pageSize = $request->input('pageSize', 10);
            $search = $request->input('search');

            $sortBy = ProgramSortBy::tryFrom(
                $request->input('sortBy', 'created_at')
            ) ?? ProgramSortBy::CREATED_AT;

            $order = OrderEnum::tryFrom(
                $request->input('order', 'desc')
            ) ?? OrderEnum::DESC;

            $paginatedData = $service->execute(
                $search,
                $page,
                $pageSize,
                $sortBy,
                $order
            );

            $responseData = PaginationResponseDTO::responseData(
                $paginatedData,
                fn(ProgramEntity $program) => ProgramResponseDTO::responseData($program)
            );

            return new SuccessResource([
                "data" => $responseData,
                "status" => 200,
                "message" => "Programs fetched successfully"
            ]);

        } catch (Exception $e) {
            return new FailedResource([
                "status" => $e->getCode() ?: 400,
                "message" => $e->getMessage(),
            ])->response()->setStatusCode($e->getCode() ?: 400);
        }
    }
}