<?php

namespace App\Domain\Enums;

enum RoleEnum: string
{
    case STUDENT = 'student';
    case FACULTY = 'faculty';
    case CHAIR = 'chair';
    case DEAN = 'dean';
    case ADMIN = 'admin';
}