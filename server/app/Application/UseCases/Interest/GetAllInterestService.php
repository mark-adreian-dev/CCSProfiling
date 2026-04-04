<?php

namespace App\Application\UseCases\Interest;

use App\Domain\Entities\InterestEntity;
use App\Domain\Enums\OrderEnum;
use App\Domain\Enums\InterestSortBy;
use App\Domain\Repositories\InterestRepositoryInterface;
use Illuminate\Support\Facades\Auth;
use Exception;
use Illuminate\Pagination\LengthAwarePaginator;

class GetAllInterestService
{
    public function __construct(
        protected InterestRepositoryInterface $interestRepository
    ) {
    }

    /**
     * Execute the use case.
     *
     * @param string|null $search
     * @param int $page
     * @param int $pageSize
     * @param InterestSortBy $sortBy Column to sort by
     * @param OrderEnum $order
     * @return LengthAwarePaginator<int, InterestEntity>
     * @throws Exception
     */
    public function execute(
        ?string $search,
        int $page,
        int $pageSize,
        InterestSortBy $sortBy,
        OrderEnum $order,
    ): LengthAwarePaginator {
        // 1. Ensure user is authorized
        if (!Auth::check()) {
            throw new Exception("Unauthorized", 401);
        }

        // 2. Get the Eloquent query builder from the repository
        $query = $this->interestRepository->findAllInterests(); // Must return Builder

        // 3. Apply search if provided
        if ($search) {
            $query->where('name', 'like', "%{$search}%");
        }

        // 4. Apply sorting
        $query->orderBy($sortBy->value, $order->value);

        // 5. Apply pagination
        $paginated = $query->paginate(
            perPage: $pageSize,
            page: $page
        );

        // 6. Transform paginated results into InterestEntity
        $paginated->getCollection()->transform(function ($interest) {
            return new InterestEntity(
                id: $interest->id,
                name: $interest->name,
                created_at: $interest->created_at?->toDateTimeString(),
                updated_at: $interest->updated_at?->toDateTimeString(),
                deleted_at: $interest->deleted_at?->toDateTimeString()
            );
        });

        return $paginated;
    }
}