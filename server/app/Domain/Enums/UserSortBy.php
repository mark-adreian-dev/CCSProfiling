<?php

namespace App\Domain\Enums;

enum UserSortBy: string
{
    case ID = 'id';
    case EMAIL = 'email';
    case ROLE = 'role';
    case DEPARTMENT_ID = 'department_id';

    case FIRST_NAME = 'first_name';
    case LAST_NAME = 'last_name';
    case MIDDLE_NAME = 'middle_name';

    case DATE_OF_BIRTH = 'date_of_birth';
    case SEX = 'sex';

    case CREATED_AT = 'created_at';
}