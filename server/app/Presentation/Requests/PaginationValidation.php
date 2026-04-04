<?php

namespace App\Presentation\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class PaginationValidation extends FormRequest
{
    /**
     * The Enum class for sortBy validation.
     * Default to null, will be set dynamically in each controller if needed
     */
    protected ?string $sortByEnum = null;

    /**
     * Allow controllers to set the enum dynamically
     */
    public function setSortByEnum(string $enumClass): self
    {
        $this->sortByEnum = $enumClass;
        return $this;
    }

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'page' => ['integer', 'min:1'],
            'pageSize' => ['integer', 'min:1', 'max:100'],
            'search' => ['nullable', 'string', 'max:100'],
            'sortBy' => $this->sortByEnum ? ['nullable', new Enum($this->sortByEnum)] : ['nullable'],
            'order' => ['nullable', new Enum(\App\Domain\Enums\OrderEnum::class)],
        ];
    }
}