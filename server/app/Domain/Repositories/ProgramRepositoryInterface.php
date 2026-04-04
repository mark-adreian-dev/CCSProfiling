<?php

namespace App\Domain\Repositories;

use Illuminate\Database\Eloquent\Builder;

interface ProgramRepositoryInterface
{
    public function findAllPrograms(): Builder;
}