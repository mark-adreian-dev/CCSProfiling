<?php

namespace App\Presentation\Controllers;

use App\Application\DTO\PaginationResponseDTO;
use App\Application\DTO\User\UserResponseDTO;
use App\Application\UseCases\User\GetAllFacultyProfileService;
use App\Application\UseCases\User\GetAllStudentProfileService;
use App\Application\UseCases\User\GetStudentProfileService;
use App\Application\UseCases\User\StoreFacultyService;
use App\Application\UseCases\User\StoreStudentService;
use App\Application\UseCases\User\UpdateFacultyProfileService;
use App\Application\UseCases\User\UpdateStudentProfileService;
use App\Domain\Entities\UserEntity;
use App\Domain\Enums\OrderEnum;
use App\Domain\Enums\UserSortBy;
use App\Application\UseCases\User\GetFacultyProfileService;
use App\Infrastructure\Models\User;
use App\Presentation\Requests\StoreUserValidation;
use App\Presentation\Controllers\Controller;
use App\Presentation\Requests\PaginationValidation;
use App\Presentation\Requests\UpdateUserValidation;
use App\Presentation\Resources\FailedResource;
use App\Presentation\Resources\SuccessResource;
use Exception;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{

    public function getAllFaculties(PaginationValidation $request, GetAllFacultyProfileService $service)
    {
        try {
            // Dynamically set the sortBy enum for this request
            $request->merge([
                'sortByEnum' => UserSortBy::class
            ]);

            $page = $request->input('page', 1);
            $pageSize = $request->input('pageSize', 10);
            $search = $request->input('search');

            $sortBy = UserSortBy::tryFrom(
                $request->input('sortBy', 'created_at')
            ) ?? UserSortBy::CREATED_AT;

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

    public function getFacultyByID($id, GetFacultyProfileService $service)
    {
        try {
            $faculty = $service->execute($id);

            return new SuccessResource([
                "data" => UserResponseDTO::responseData($faculty),
                "status" => 200,
                "message" => "Faculty profile fetched successfully"
            ]);
        } catch (Exception $e) {
            $code = $e->getCode() ?: 400;
            return new FailedResource([
                "status" => $code,
                "message" => $e->getMessage(),
            ])->response()->setStatusCode($code);
        }
    }

    public function createFacultyUser(StoreUserValidation $request, StoreFacultyService $service)
    {
        try {

            $data = $request->validated();

            // 1. Handle the file upload correctly
            // IMPORTANT: Ensure frontend uses 'profile_picture' or 'profile_image' consistently
            if ($request->hasFile('profile_picture')) {
                $path = $request->file('profile_picture')->store('uploads/faculty', 'public');

                // OVERWRITE the existing key so the Service finds the string path
                // rather than the temporary UploadedFile object
                $data['profile_picture'] = env("APP_URL") . "/storage/" . $path;
            }

            // 2. Execute Use Case with the updated data array
            $userEntity = $service->execute($data);

            return new SuccessResource([
                "data" => UserResponseDTO::responseData($userEntity),
                "status" => 201,
                "message" => "User created successfully"
            ]);

        } catch (Exception $e) {
            // Log the actual error to storage/logs/laravel.log so you can see the stack trace
            \Log::error($e->getMessage());

            return new FailedResource([
                "status" => 500,
                "message" => $e->getMessage(),
            ])->response()->setStatusCode(500);
        }
    }

    public function updateFacultyUser($id, UpdateUserValidation $request, UpdateFacultyProfileService $service)
    {
        try {
            $data = $request->validated();

            $faculty = User::findOrFail($id);

            // Check if profile_picture is being updated
            if ($request->hasFile('profile_picture')) {
                // 1. Delete old image if exists
                if ($faculty->profile_picture) {
                    $relativePaths = explode('/storage/', $faculty->profile_picture);
                    $oldPath = end($relativePaths);

                    if (Storage::disk('public')->exists($oldPath)) {
                        Storage::disk('public')->delete($oldPath);
                    }
                }

                // 2. Store new image
                $path = $request->file('profile_picture')->store('uploads/faculty', 'public');
                $data['profile_picture'] = env("APP_URL") . "/storage/" . $path;

            } elseif ($request->input('profile_picture') === null || $request->input('profile_picture') === '') {
                // Handle frontend sending null/empty string/"null"
                if ($faculty->profile_picture) {
                    // Delete old image
                    $relativePaths = explode('/storage/', $faculty->profile_picture);
                    $oldPath = end($relativePaths);

                    if (Storage::disk('public')->exists($oldPath)) {
                        Storage::disk('public')->delete($oldPath);
                    }
                }

                // Set profile_picture to null
                $data['profile_picture'] = null;
            }

            $result = $service->execute($id, $data);

            return new SuccessResource([
                'status' => 200,
                'message' => 'Faculty updated successfully',
                'data' => UserResponseDTO::responseData($result)
            ]);

        } catch (Exception $e) {
            \Log::error("Update Error: " . $e->getMessage());
            return new FailedResource([
                "status" => 500,
                "message" => $e->getMessage(),
            ])->response()->setStatusCode(500);
        }
    }

    public function getAllStudents(PaginationValidation $request, GetAllStudentProfileService $service)
    {
        try {
            // Dynamically set the sortBy enum for this request
            $request->merge([
                'sortByEnum' => UserSortBy::class
            ]);

            $page = $request->input('page', 1);
            $pageSize = $request->input('pageSize', 10);
            $search = $request->input('search');

            $sortBy = UserSortBy::tryFrom(
                $request->input('sortBy', 'created_at')
            ) ?? UserSortBy::CREATED_AT;

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

    public function createStudentUser(StoreUserValidation $request, StoreStudentService $service)
    {
        try {

            $data = $request->validated();

            // 1. Handle the file upload correctly
            // IMPORTANT: Ensure frontend uses 'profile_picture' or 'profile_image' consistently
            if ($request->hasFile('profile_picture')) {
                $path = $request->file('profile_picture')->store('uploads/student', 'public');

                // OVERWRITE the existing key so the Service finds the string path
                // rather than the temporary UploadedFile object
                $data['profile_picture'] = env("APP_URL") . "/storage/" . $path;
            }

            // 2. Execute Use Case with the updated data array
            $userEntity = $service->execute($data);

            return new SuccessResource([
                "data" => UserResponseDTO::responseData($userEntity),
                "status" => 201,
                "message" => "User created successfully"
            ]);

        } catch (Exception $e) {
            // Log the actual error to storage/logs/laravel.log so you can see the stack trace
            \Log::error($e->getMessage());

            return new FailedResource([
                "status" => 500,
                "message" => $e->getMessage(),
            ])->response()->setStatusCode(500);
        }
    }

    public function updateStudentUser($id, UpdateUserValidation $request, UpdateStudentProfileService $service)
    {
        try {
            $data = $request->validated();

            $student = User::findOrFail($id);

            // 1. Handle profile_picture update
            if ($request->hasFile('profile_picture')) {
                // Delete old image if exists
                if ($student->profile_picture) {
                    $relativePaths = explode('/storage/', $student->profile_picture);
                    $oldPath = end($relativePaths);

                    if (Storage::disk('public')->exists($oldPath)) {
                        Storage::disk('public')->delete($oldPath);
                    }
                }

                // Store new image
                $path = $request->file('profile_picture')->store('uploads/student', 'public');
                $data['profile_picture'] = env("APP_URL") . "/storage/" . $path;

            } elseif ($request->input('profile_picture') === null || $request->input('profile_picture') === '' || $request->input('profile_picture') === 'null') {
                // Handle frontend sending null/empty string/"null"
                if ($student->profile_picture) {
                    // Delete old image
                    $relativePaths = explode('/storage/', $student->profile_picture);
                    $oldPath = end($relativePaths);

                    if (Storage::disk('public')->exists($oldPath)) {
                        Storage::disk('public')->delete($oldPath);
                    }
                }

                // Set profile_picture to null
                $data['profile_picture'] = null;
            }

            // 2. Execute service
            $result = $service->execute($id, $data);

            return new SuccessResource([
                'status' => 200,
                'message' => 'Student updated successfully',
                'data' => UserResponseDTO::responseData($result)
            ]);

        } catch (Exception $e) {
            \Log::error("Update Student Error: " . $e->getMessage());
            return new FailedResource([
                "status" => 500,
                "message" => $e->getMessage(),
            ])->response()->setStatusCode(500);
        }
    }

    public function getStudentByID($id, GetStudentProfileService $service)
    {
        try {
            $student = $service->execute($id);

            return new SuccessResource([
                "data" => UserResponseDTO::responseData($student),
                "status" => 200,
                "message" => "Student profile fetched successfully"
            ]);
        } catch (Exception $e) {
            $code = $e->getCode() ?: 400;
            return new FailedResource([
                "status" => $code,
                "message" => $e->getMessage(),
            ])->response()->setStatusCode($code);
        }
    }
}
