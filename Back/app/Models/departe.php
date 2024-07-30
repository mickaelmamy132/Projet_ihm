<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class departe extends Model
{
    use HasFactory; 
    protected $table = 'departe';

    protected $primaryKey = 'id';

    public $timestamps = false;

    protected $fillable = ['nom_departement', 'salaire'];

}
