<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class ListItem
 * @package App
 */
class ListItem extends Model
{
     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'data', 'status', 'user_id'
    ];

    /**
     * Defines a relationship between list items and the user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user() {
        return $this->belongsTo(User::class);
    }
}
