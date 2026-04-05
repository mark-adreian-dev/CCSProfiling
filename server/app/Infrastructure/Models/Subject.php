<?php

namespace App\Infrastructure\Models;


use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    protected $fillable = ['academic_year_id', 'semester_id', 'course_code', 'name', 'units'];

    public function semester()
    {
        return $this->belongsTo(Semester::class);
    }

    public function grades()
    {
        return $this->hasMany(Grade::class);
    }

    public function curricula()
    {
        return $this->hasMany(Curriculum::class);
    }

    public function academicYear()
    {
        return $this->belongsTo(AcademicYear::class);
    }
}