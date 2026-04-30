<?php

namespace App\Presentation\Controllers;

use App\Application\DTO\PaginationResponseDTO;
use App\Application\UseCases\Interest\GetAllInterestService;
use App\Application\UseCases\Interest\GetInterestService;
use App\Application\UseCases\Interest\InterestChartDataService;
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
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Http;


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

    public function getInterestChartData(InterestChartDataService $service)
    {
        try {
            $data = $service->execute();

            return new SuccessResource([
                "status" => 200,
                "message" => "Interest chart data retrieved successfully",
                "data" => $data
            ]);
        } catch (Exception $e) {

            $statusCode = (int) $e->getCode();

            // ensure valid HTTP status
            if ($statusCode < 100 || $statusCode > 599) {
                $statusCode = 400;
            }

            return (new FailedResource([
                "status" => $statusCode,
                "message" => $e->getMessage(),
            ]))->response()->setStatusCode($statusCode);
        }
    }

    public function downloadInterestReport(InterestChartDataService $service)
    {
        try {
            // 1. Full dataset (for TABLE)
            $allData = collect($service->execute())
                ->sortByDesc('total')
                ->values();

            // 2. CHART DATA (ONLY TOP 20)
            $chartData = $allData->take(20);

            // 3. Summary (based on ALL data)
            $totalStudent = $allData->sum('student');
            $totalFaculty = $allData->sum('faculty');

            $summary = [
                'totalStudent' => $totalStudent,
                'totalFaculty' => $totalFaculty,
                'topInterest' => $allData->first(),
            ];

            // 4. Chunk ONLY chart data
            $chunks = $chartData->chunk(20);

            // 5. GLOBAL CEILING (ONLY FROM CHART DATA)
            $yAxisMax = $chartData->max(function ($item) {
                return max($item['student'], $item['faculty']);
            });

            $yAxisMax = (int) ceil($yAxisMax);

            $chartImages = [];

            foreach ($chunks as $index => $chunk) {

                $chartConfig = [
                    "type" => "bar",
                    "data" => [
                        "labels" => $chunk->pluck('interest_name'),
                        "datasets" => [
                            [
                                "label" => "Student",
                                "backgroundColor" => "#EAC46A",
                                "data" => $chunk->pluck('student'),
                                "stack" => "stack1",
                            ],
                            [
                                "label" => "Faculty",
                                "backgroundColor" => "#F05A1A",
                                "data" => $chunk->pluck('faculty'),
                                "stack" => "stack1",
                            ],
                        ],
                    ],
                    "options" => [
                        "responsive" => true,

                        "plugins" => [
                            "legend" => [
                                "position" => "top",
                                "labels" => [
                                    "font" => ["size" => 10]
                                ]
                            ],
                            "title" => [
                                "display" => true,
                                "text" => "Top 20 Interests"
                            ],
                        ],

                        "scales" => [
                            "x" => [
                                "stacked" => true,
                                "ticks" => [
                                    "font" => ["size" => 8],
                                    "maxRotation" => 45,
                                    "minRotation" => 45
                                ]
                            ],
                            "y" => [
                                "stacked" => true,
                                "beginAtZero" => true,
                                "max" => $yAxisMax,
                                "ticks" => [
                                    "font" => ["size" => 8]
                                ]
                            ]
                        ]
                    ]
                ];

                $response = Http::post('https://quickchart.io/chart', [
                    'format' => 'png',
                    'width' => 1200,
                    'height' => 600,
                    'chart' => $chartConfig,
                ]);

                if (!$response->successful()) {
                    throw new Exception($response->body());
                }

                $chartImages[] = 'data:image/png;base64,' . base64_encode($response->body());
            }

            // 6. PDF (ALL DATA PASSED)
            $pdf = Pdf::loadView('reports.interest-report', [
                'data' => $allData,      // ✅ FULL TABLE
                'summary' => $summary,
                'chartImages' => $chartImages,
            ]);

            return $pdf->download('interest-report.pdf');

        } catch (Exception $e) {
            return response()->json([
                "status" => 400,
                "message" => $e->getMessage(),
            ], 400);
        }
    }
}
