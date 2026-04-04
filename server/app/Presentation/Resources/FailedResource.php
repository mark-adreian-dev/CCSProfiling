<?php

namespace App\Presentation\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FailedResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            "status" => $this->resource['status'] ?? 400,
            "message" => $this->resource['message'] ?? 'An error occurred',
            'errors' => $this->resource['errors'] ?? null,
        ];
    }
}