<?php

namespace App\Domain\Enums;

enum OrderEnum: string
{
    case ASC = 'asc';
    case DESC = 'desc';
}