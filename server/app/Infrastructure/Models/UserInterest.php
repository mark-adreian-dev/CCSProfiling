<?php

namespace App\Infrastructure\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserInterest extends Pivot
{
    use SoftDeletes;
    // Dates to cast as Carbon instances
    protected $dates = ['started_at', 'ended_at', 'created_at', 'updated_at', 'deleted_at'];

    // Mass assignable fields
    protected $fillable = [
        'user_id',
        'interest_id',
        'started_at',
        'ended_at',
    ];

    /**
     * Relationship to User
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relationship to Interest
     */
    public function interest(): BelongsTo
    {
        return $this->belongsTo(Interest::class);
    }
}