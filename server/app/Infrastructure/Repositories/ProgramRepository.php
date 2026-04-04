<?php

namespace App\Infrastructure\Repositories;

use App\Domain\Repositories\ProgramRepositoryInterface;
use App\Infrastructure\Models\Program;
use Illuminate\Database\Eloquent\Builder;

class ProgramRepository implements ProgramRepositoryInterface
{
    public function findAllPrograms(): Builder
    {
        return Program::query()
            ->with('department');
    }
}