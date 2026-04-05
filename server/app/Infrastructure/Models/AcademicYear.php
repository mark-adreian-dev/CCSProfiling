<?php

namespace App\Infrastructure\Models;

use Illuminate\Database\Eloquent\Model;

class AcademicYear extends Model
{

    protected $fillable = ['year_level'];

    public function subjects()
    {
        return $this->hasMany(Subject::class);
    }
}