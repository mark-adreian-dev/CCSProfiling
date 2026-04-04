<?php

namespace App\Presentation\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserValidation extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            // User Table Validation
            'email' => ['required', 'email', 'max:100', 'unique:users,email'],

            // Name Fields
            'name_prefix' => ['nullable', 'string', 'max:10'],
            'first_name' => ['required', 'string', 'max:50'],
            'middle_name' => ['nullable', 'string', 'max:50'],
            'last_name' => ['required', 'string', 'max:50'],
            'name_suffix' => ['nullable', 'string', 'max:10'],

            // Personal Info
            'date_of_birth' => ['required', 'date'],
            'sex' => ['required', 'in:Male,Female'],
            'contact_number' => ['nullable', 'string', 'max:20'],
            'address' => ['nullable', 'string', 'max:255'],
            'profile_picture' => [
                'nullable',
                'image',             // Ensures the file is an image (jpg, png, bmp, gif, svg, or webp)
                'mimes:jpeg,png,jpg', // Explicitly restrict to these extensions
                'max:5120',          // Limit size to 5MB (5120 kilobytes)
            ],

            // Student Profile Specific Validation
            'program_id' => [
                'required_if:role,student',
                'exists:programs,id'
            ],
            'academic_year' => [
                'required_if:role,student',
                'in:1,2,3,4,5'
            ],
            'academic_status' => [
                'required_if:role,student',
                'in:Regular,Irregular'
            ],

            // Faculty Profile Specific Validation
            'expertise' => [
                'nullable',
                'string',
                'max:255'
            ],
        ];
    }
}