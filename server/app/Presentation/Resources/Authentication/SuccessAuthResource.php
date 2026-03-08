<?php

namespace App\Presentation\Resources\Authentication;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SuccessAuthResource extends JsonResource
{

    public function toArray(Request $request): array
    {
        return [
            "status" => $this['status'],
            "message" => $this['message'],
            "data"=> $this['user']
        ];
    }
}
