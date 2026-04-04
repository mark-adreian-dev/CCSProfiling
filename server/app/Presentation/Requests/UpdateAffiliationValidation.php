<?php

namespace App\Presentation\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAffiliationValidation extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'user_id' => 'sometimes|integer|exists:users,id',
            'role' => 'sometimes|string|max:255',
            'affiliation_name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'date_start' => 'sometimes|date',
            'date_end' => 'nullable|date|after_or_equal:date_start',
        ];
    }
}