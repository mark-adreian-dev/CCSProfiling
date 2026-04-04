<?php

namespace App\Presentation\Controllers;


use App\Application\UseCases\Affiliation\GetAllAffiliationsService;
use App\Application\UseCases\Affiliation\GetAffiliationService;
use App\Application\UseCases\Affiliation\StoreAffiliationService;
use App\Application\UseCases\Affiliation\UpdateAffiliationService;
use App\Application\UseCases\Affiliation\DeleteAffiliationService;

use App\Domain\Entities\AffiliationEntity;
use App\Presentation\Controllers\Controller;
use App\Presentation\Requests\StoreAffiliationValidation;
use App\Presentation\Requests\UpdateAffiliationValidation;
use App\Presentation\Resources\FailedResource;
use App\Presentation\Resources\SuccessResource;
use App\Application\DTO\Affiliation\AffiliationResponseDTO;
use Exception;

class AffiliationController extends Controller
{
    // GET /affiliations
    public function getAllAffiliations(
        GetAllAffiliationsService $service
    ) {
        try {

            $data = $service->execute()->get();
            return new SuccessResource([
                "data" => $data,
                "status" => 200,
                "message" => "Affiliations fetched successfully"
            ]);
        } catch (Exception $e) {
            return new FailedResource([
                "status" => $e->getCode() ?: 400,
                "message" => $e->getMessage(),
            ])->response()->setStatusCode($e->getCode() ?: 400);
        }
    }

    // GET /affiliations/{id}
    public function getAffiliationById(int $id, GetAffiliationService $service)
    {
        try {
            $affiliation = $service->execute($id);

            if (!$affiliation) {
                return new FailedResource([
                    "status" => 404,
                    "message" => "Affiliation not found",
                ])->response()->setStatusCode(404);
            }

            return new SuccessResource([
                "data" => AffiliationResponseDTO::responseData($affiliation),
                "status" => 200,
                "message" => "Affiliation fetched successfully"
            ]);
        } catch (Exception $e) {
            return new FailedResource([
                "status" => $e->getCode() ?: 400,
                "message" => $e->getMessage(),
            ])->response()->setStatusCode($e->getCode() ?: 400);
        }
    }

    // POST /affiliations
    public function createAffiliation(StoreAffiliationValidation $request, StoreAffiliationService $service)
    {
        try {
            $affiliation = $service->execute(
                new AffiliationEntity(...$request->validated())
            );

            return new SuccessResource([
                "data" => AffiliationResponseDTO::responseData($affiliation),
                "status" => 201,
                "message" => "Affiliation created successfully"
            ])->response()->setStatusCode(201);
        } catch (Exception $e) {
            return new FailedResource([
                "status" => $e->getCode() ?: 400,
                "message" => $e->getMessage(),
            ])->response()->setStatusCode($e->getCode() ?: 400);
        }
    }

    // PUT /affiliations/{id}
    public function updateAffiliation(int $id, UpdateAffiliationValidation $request, UpdateAffiliationService $service)
    {
        try {
            $affiliation = $service->execute(
                $id,
                new AffiliationEntity(...$request->validated())
            );

            return new SuccessResource([
                "data" => AffiliationResponseDTO::responseData($affiliation),
                "status" => 200,
                "message" => "Affiliation updated successfully"
            ]);
        } catch (Exception $e) {
            return new FailedResource([
                "status" => $e->getCode() ?: 400,
                "message" => $e->getMessage(),
            ])->response()->setStatusCode($e->getCode() ?: 400);
        }
    }

    // DELETE /affiliations/{id}
    public function deleteAffiliation(int $id, DeleteAffiliationService $service)
    {
        try {
            $service->execute($id);

            return new SuccessResource([
                "status" => 200,
                "message" => "Affiliation deleted successfully"
            ]);
        } catch (Exception $e) {
            return new FailedResource([
                "status" => $e->getCode() ?: 400,
                "message" => $e->getMessage(),
            ])->response()->setStatusCode($e->getCode() ?: 400);
        }
    }
}