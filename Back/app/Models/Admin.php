<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Authenticatable as AuthenticableTrait;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;

class Admin extends Model implements AuthenticatableContract
{
    use AuthenticableTrait;

    protected $table = 'admins';

    protected $fillable = [
        'nom',
        'mot_de_passe',
    ];

    public $timestamps = false;
    public function setPasswordAttribute($value)
    {
        $this->attributes['mot_de_passe'] = $value;
    }
}