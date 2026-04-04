<?php

namespace App\Presentation\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreInterestValidation extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // You can implement permission checks here
        return true;
    }

    /**
     * Validation rules for creating a new Interest
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:100', 'unique:interests,name'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Interest name is required.',
            'name.unique' => 'This interest already exists.',
            'name.max' => 'Interest name must not exceed 100 characters.',
        ];
    }
}