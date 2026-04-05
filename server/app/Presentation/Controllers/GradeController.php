<?php

namespace App\Presentation\Controllers;


use App\Application\UseCases\Grade\GetCurriculumService;
use App\Application\UseCases\Grade\GetGradesByUserIdService;
use App\Presentation\Controllers\Controller;
use App\Presentation\Resources\FailedResource;
use App\Presentation\Resources\SuccessResource;
use Exception;

class GradeController extends Controller
{
    public function getGrades(int $id, GetGradesByUserIdService $service)
    {
        try {
            $grades = $service->execute($id);



            return new SuccessResource([
                'data' => $grades,
                'status' => 200,
                'message' => 'Grades fetched successfully'
            ]);

        } catch (Exception $e) {
            return new FailedResource([
                'status' => $e->getCode() ?: 400,
                'message' => $e->getMessage()
            ])->response()->setStatusCode($e->getCode() ?: 400);
        }
    }

    public function getCurriculum(GetCurriculumService $service)
    {
        try {
            $data = $service->execute();

            return new SuccessResource([
                "status" => 200,
                "message" => "Curriculum fetched successfully",
                "data" => $data
            ]);

        } catch (Exception $e) {
            return new FailedResource([
                "status" => $e->getCode() ?: 400,
                "message" => $e->getMessage(),
            ])->response()->setStatusCode($e->getCode() ?: 400);
        }
    }
}