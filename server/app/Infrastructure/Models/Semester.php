<?php

namespace App\Infrastructure\Models;

use Illuminate\Database\Eloquent\Model;

class Semester extends Model
{

    protected $fillable = ['academic_year_id', 'name', 'start_date', 'end_date'];

    public function subjects()
    {
        return $this->hasMany(Subject::class);
    }

    public function grades()
    {
        return $this->hasMany(Grade::class);
    }
}