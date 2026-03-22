<?php

namespace App\Presentation\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FailedResource extends JsonResource
{

    public function toArray(Request $request): array
    {
        return [
            "status" => $this['status'],
            "message" => $this['message'],
            'errors' => $this->when(isset($this->resource['errors']), $this->resource['errors']),
        ];
    }
}
