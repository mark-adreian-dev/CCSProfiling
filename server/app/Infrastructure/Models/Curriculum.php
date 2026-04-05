<?php

namespace App\Infrastructure\Models;

use App\Infrastructure\Models\Subject;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Curriculum extends Model
{
    use HasFactory;

    protected $fillable = [
        'subject_id',
        'year_started',
        'year_ended'
    ];

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }
}