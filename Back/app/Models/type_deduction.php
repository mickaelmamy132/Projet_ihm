<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class type_deduction extends Model
{
    use HasFactory;
    protected $table = 'type_deductions';

    protected $fillable = [ 
        'type',
        'amount',
    ];
    public $timestamps = false;
    

}
