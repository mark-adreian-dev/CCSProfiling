<?php

namespace App\Presentation\Controllers;

use App\Application\DTO\PaginationResponseDTO;
use App\Application\UseCases\Interest\GetAllInterestService;
use App\Application\UseCases\Interest\GetInterestService;
use App\Application\UseCases\Interest\StoreInterestService;
use App\Application\UseCases\Interest\UpdateInterestService;
use App\Application\UseCases\Interest\DeleteInterestService;
use App\Application\UseCases\Interest\AddUserInterestService;
use App\Application\UseCases\Interest\DeleteUserInterestService;
use App\Domain\Entities\InterestEntity;
use App\Domain\Enums\OrderEnum;
use App\Domain\Enums\InterestSortBy;
use App\Presentation\Controllers\Controller;
use App\Presentation\Requests\AddUserInterestValidation;
use App\Presentation\Requests\PaginationValidation;
use App\Presentation\Requests\RemoveUserInterestValidation;
use App\Presentation\Requests\StoreInterestValidation;
use App\Presentation\Requests\UpdateInterestValidation;
use App\Presentation\Resources\FailedResource;
use App\Presentation\Resources\SuccessResource;
use App\Application\DTO\Interest\InterestResponseDTO;
use Exception;

class InterestController extends Controller
{
    // GET /interests
    public function getAllInterests(
        PaginationValidation $request,
        GetAllInterestService $service
    ) {
        try {
            // 1. Fetch pagination & search params
            $page = $request->input('page', 1);
            $pageSize = $request->input('pageSize', 10);
            $search = $request->input('search');

            // 2. Sort column
            $sortBy = InterestSortBy::tryFrom(
                $request->input('sortBy', 'created_at')
            ) ?? InterestSortBy::CREATED_AT;

            // 3. Sort order
            $order = OrderEnum::tryFrom(
                $request->input('order', 'desc')
            ) ?? OrderEnum::DESC;

            // 4. Fetch paginated interests
            $paginatedData = $service->execute(
                search: $search,
                page: $page,
                pageSize: $pageSize,
                sortBy: $sortBy,
                order: $order
            );

            // 5. Transform to response DTO
            $responseData = PaginationResponseDTO::responseData(
                $paginatedData,
                fn(InterestEntity $interest) => InterestResponseDTO::responseData($interest)
            );

            return new SuccessResource([
                "data" => $responseData,
                "status" => 200,
                "message" => "Interests fetched successfully"
            ]);
        } catch (Exception $e) {
            return new FailedResource([
                "status" => $e->getCode() ?: 400,
                "message" => $e->getMessage(),
            ])->response()->setStatusCode($e->getCode() ?: 400);
        }
    }

    // GET /interests/{id}
    public function getInterestById(int $id, GetInterestService $service)
    {
        try {
            $interest = $service->execute($id); // returns InterestEntity or null

            if (!$interest) {
                return new FailedResource([
                    "status" => 404,
                    "message" => "Interest not found",
                ])->response()->setStatusCode(404);
            }

            return new SuccessResource([
                "data" => InterestResponseDTO::responseData($interest),
                "status" => 200,
                "message" => "Interest fetched successfully"
            ]);

        } catch (Exception $e) {
            return new FailedResource([
                "status" => $e->getCode() ?: 400,
                "message" => $e->getMessage(),
            ])->response()->setStatusCode($e->getCode() ?: 400);
        }
    }

    // POST /interests
    public function createInterest(StoreInterestValidation $request, StoreInterestService $service)
    {
        try {
            $interest = $service->execute($request->validated());

            return new SuccessResource([
                "data" => InterestResponseDTO::responseData($interest),
                "status" => 201,
                "message" => "Interest created successfully"
            ])->response()->setStatusCode(201);
        } catch (Exception $e) {
            return new FailedResource([
                "status" => $e->getCode() ?: 400,
                "message" => $e->getMessage(),
            ])->response()->setStatusCode($e->getCode() ?: 400);
        }
    }

    // PUT /interests/{id}
    public function updateInterest(int $id, UpdateInterestValidation $request, UpdateInterestService $service)
    {
        try {
            $interest = $service->execute($id, $request->validated());

            return new SuccessResource([
                "data" => InterestResponseDTO::responseData($interest),
                "status" => 200,
                "message" => "Interest updated successfully"
            ]);
        } catch (Exception $e) {
            return new FailedResource([
                "status" => $e->getCode() ?: 400,
                "message" => $e->getMessage(),
            ])->response()->setStatusCode($e->getCode() ?: 400);
        }
    }

    // DELETE /interests/{id}
    public function deleteInterest(int $id, DeleteInterestService $service)
    {
        try {
            $service->execute($id);

            return new SuccessResource([
                "status" => 200,
                "message" => "Interest deleted successfully"
            ]);
        } catch (Exception $e) {
            return new FailedResource([
                "status" => $e->getCode() ?: 400,
                "message" => $e->getMessage(),
            ])->response()->setStatusCode($e->getCode() ?: 400);
        }
    }

    public function addUserInterest(AddUserInterestValidation $request, AddUserInterestService $service)
    {
        $data = $request->validated();

        try {
            $service->execute($data['interest_id']);

            return new SuccessResource([
                "status" => 200,
                "message" => "Interest added to user successfully",
            ]);
        } catch (Exception $e) {
            return new FailedResource([
                "status" => $e->getCode() ?: 400,
                "message" => $e->getMessage(),
            ])->response()->setStatusCode($e->getCode() ?: 400);
        }
    }

    public function removeUserInterest(RemoveUserInterestValidation $request, DeleteUserInterestService $service)
    {
        $data = $request->validated();

        try {
            $service->execute($data['interest_id']);

            return new SuccessResource([
                "status" => 200,
                "message" => "Interest removed from user successfully",
            ]);
        } catch (Exception $e) {
            return new FailedResource([
                "status" => $e->getCode() ?: 400,
                "message" => $e->getMessage(),
            ])->response()->setStatusCode($e->getCode() ?: 400);
        }
    }
}
