<?php

namespace App\Presentation\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserValidation extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $facultyId = $this->route('id');

        return [
            // User Table Validation
            'email' => [
                'sometimes',
                'required',
                'email',
                'max:100',
                Rule::unique('users', 'email')->ignore($facultyId)
            ],

            // Name Fields - Use 'sometimes' so you can update just one part of the name
            'name_prefix' => ['sometimes', 'nullable', 'string', 'max:10'],
            'first_name' => ['sometimes', 'required', 'string', 'max:50'],
            'middle_name' => ['sometimes', 'nullable', 'string', 'max:50'],
            'last_name' => ['sometimes', 'required', 'string', 'max:50'],
            'name_suffix' => ['sometimes', 'nullable', 'string', 'max:10'],

            // Personal Info
            'date_of_birth' => ['sometimes', 'required', 'date'],
            'sex' => ['sometimes', 'required', 'in:Male,Female'],
            'contact_number' => ['sometimes', 'nullable', 'string', 'max:20'],
            'address' => ['sometimes', 'nullable', 'string', 'max:255'],

            /**
             * Profile Picture
             * REMOVE 'file' if you are sending Base64 strings via JSON.
             * Keep it as 'nullable' or 'string'.
             */
            'profile_picture' => [
                'sometimes',
                'nullable',
                Rule::when(
                    request()->hasFile('profile_picture'),
                    ['file', 'image', 'mimes:jpg,jpeg,png', 'max:2048'],
                    ['string']
                ),
            ],

            // Faculty Profile Specific Validation
            'expertise' => [
                'sometimes',
                'required',
                'string',
                'max:255'
            ],

            // Student Profile Specific Validation
            'program_id' => [
                'sometimes',
                'nullable',
                'integer',
                'exists:programs,id'
            ],
            'academic_year' => [
                'sometimes',
                'nullable',
                'integer',
                'in:1,2,3,4,5'
            ],
            'academic_status' => [
                'sometimes',
                'nullable',
                'string',
                'in:Regular,Irregular'
            ],
        ];
    }
}