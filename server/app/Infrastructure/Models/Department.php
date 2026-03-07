<?php

namespace App\Infrastructure\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Infrastructure\Models\Program;
use App\Infrastructure\Models\User;

class Department extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'chair_id',
        'contact_number',
        'email',
        'established_date'
    ];

    protected $casts = [
        'established_date' => 'date',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    public function programs()
    {
        return $this->hasMany(Program::class);
    }

    public function chair()
    {
        return $this->belongsTo(User::class, 'chair_id');
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
