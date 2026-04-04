<?php

namespace App\Application\UseCases\Program;

use App\Domain\Entities\ProgramEntity;
use App\Domain\Enums\OrderEnum;
use App\Domain\Enums\ProgramSortBy;
use App\Domain\Repositories\ProgramRepositoryInterface;
use App\Infrastructure\Models\Program;
use Illuminate\Support\Facades\Auth;
use Exception;

class GetAllProgramService
{
    public function __construct(
        protected ProgramRepositoryInterface $programRepository
    ) {
    }

    public function execute(
        ?string $search,
        int $page,
        int $pageSize,
        ProgramSortBy $sortBy,
        OrderEnum $order,
    ) {
        if (!Auth::check()) {
            throw new Exception("Unauthorized", 401);
        }

        // 1. Get Builder from Repository
        $query = $this->programRepository->findAllPrograms();

        // 2. Apply Search
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('code', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhereHas('department', function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%");
                    });
            });
        }

        // 3. Sorting
        $query->orderBy($sortBy->value, $order->value);

        // 4. Pagination
        $paginated = $query->paginate(
            perPage: $pageSize,
            page: $page
        );

        // 5. Transform to Entity (same as your student pattern)
        return $paginated->through(function (Program $program) {
            return new ProgramEntity(
                id: $program->id,
                name: $program->name,
                code: $program->code,
                department_id: $program->department_id,
                description: $program->description,
                created_at: $program->created_at,

                // Optional relation
                department: $program->department
            );
        });
    }
}