<?php

namespace App\Presentation\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddUserInterestValidation extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Set to true or implement your auth logic
    }

    public function rules(): array
    {
        return [
            'interest_id' => 'required|integer|exists:interests,id',
        ];
    }
}