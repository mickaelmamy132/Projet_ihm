<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class poste extends Model
{
    use HasFactory;
    protected $table = 'poste';

    protected $primaryKey = 'id';

    public $timestamps = false;

    protected $fillable = ['nom_poste'];

}
 