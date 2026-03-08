<?php

namespace App\Presentation\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AuthValidation extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules()
    {
        return [
            'identification_id' => ['required', 'digits:7'],
            'password' => 'required|min:1'
        ];
    }
}
