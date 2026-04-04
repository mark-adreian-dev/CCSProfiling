<?php

namespace App\Domain\Enums;

enum InterestSortBy: string
{
    case CREATED_AT = 'created_at';
    case UPDATED_AT = 'updated_at';
    case NAME = 'name';
}