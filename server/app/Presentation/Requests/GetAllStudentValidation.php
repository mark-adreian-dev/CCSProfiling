<?php

namespace App\Presentation\Requests;

use App\Domain\Enums\OrderEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;
use App\Domain\Enums\UserSortBy;

class GetAllStudentValidation extends FormRequest
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

    public function rules(): array
    {
        return [
            'page' => ['integer', 'min:1'],
            'pageSize' => ['integer', 'min:1', 'max:100'],
            'search' => ['nullable', 'string', 'max:100'],
            'sortBy' => ['nullable', new Enum(UserSortBy::class)],
            'order' => ['nullable', new Enum(OrderEnum::class)],
        ];
    }
}