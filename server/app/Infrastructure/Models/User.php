<?php

namespace App\Infrastructure\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, SoftDeletes;

    protected $fillable = [
        'email',
        'password',
        'role',
        'department_id',
        'name_prefix',
        'first_name',
        'middle_name',
        'last_name',
        'name_suffix',
        'date_of_birth',
        'gender',
        'contact_number',
        'address',
        'profile_picture',
    ];

    protected $hidden = [
        'password',
    ];

    protected $casts = [
        'date_of_birth' => 'date',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function studentProfile()
    {
        return $this->hasOne(StudentProfile::class);
    }

    public function facultyProfile()
    {
        return $this->hasOne(FacultyProfile::class);
    }
}