<?php

namespace App\Application\DTO;

use Illuminate\Pagination\LengthAwarePaginator;

class PaginationResponseDTO
{
    public static function responseData(LengthAwarePaginator $paginated, callable $mapCallback): array
    {
        return [
            'status'=> 200,
            'message' => "Student profile fetched sucessfully",
            'data' => [
                'content' => $paginated->getCollection()->map($mapCallback)->toArray(),
                'pagination' => [
                    'total' => $paginated->total(),
                    'items_count' => $paginated->count(),
                    'per_page' => $paginated->perPage(),
                    'current_page' => $paginated->currentPage(),
                    'total_pages' => $paginated->lastPage(),
                ],
                'navigation' => [
                    'has_more_pages' => $paginated->hasMorePages(),
                    'has_prev_page' => !$paginated->onFirstPage(),
                    'next_page_num' => $paginated->hasMorePages() ? $paginated->currentPage() + 1 : null,
                    'prev_page_num' => $paginated->onFirstPage() ? null : $paginated->currentPage() - 1,
                ]
            ]
        ];
    }
}