<?php

namespace App\Application\UseCases\User;

use App\Domain\Repositories\UserRepositoryInterface;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UpdateStudentProfileService
{
    protected $repository;

    public function __construct(UserRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function execute(int $id, array $data)
    {
        // Handle Base64 Image Processing
        if (isset($data['profile_picture']) && str_starts_with($data['profile_picture'], 'data:image')) {
            $data['profile_picture'] = $this->storeBase64Image($data['profile_picture']);
        }

        return $this->repository->updateStudent($id, $data);
    }

    private function storeBase64Image($base64String)
    {
        // Extract the extension and the data
        $extension = explode('/', explode(':', substr($base64String, 0, strpos($base64String, ';')))[1])[1];
        $replace = substr($base64String, 0, strpos($base64String, ',') + 1);
        $image = str_replace($replace, '', $base64String);
        $image = str_replace(' ', '+', $image);

        $fileName = 'Student/' . Str::random(20) . '.' . $extension;

        Storage::disk('public')->put($fileName, base64_decode($image));

        return $fileName; // Store this path in the DB
    }
}