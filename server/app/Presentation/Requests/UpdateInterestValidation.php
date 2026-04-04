<?php

namespace App\Presentation\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateInterestValidation extends FormRequest
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
     * Validation rules for updating an Interest
     */
    public function rules(): array
    {
        $interestId = $this->route('id'); // get ID from route

        return [
            'name' => [
                'required',
                'string',
                'max:100',
                Rule::unique('interests', 'name')->ignore($interestId),
            ],
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