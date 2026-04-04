<?php
namespace App\Domain\Enums;

enum ProgramSortBy: string
{
    case CREATED_AT = 'created_at';
    case NAME = 'name';
    case CODE = 'code';
}