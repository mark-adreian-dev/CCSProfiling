<?php

namespace App\Presentation\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SuccessResource extends JsonResource
{

    public function toArray(Request $request): array
    {
        return [
            "status" => $this['status'],
            "message" => $this['message'],
            "data"=> $this['data'] ?? []
        ];
    }
}
