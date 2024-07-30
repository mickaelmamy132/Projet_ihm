<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payement extends Model
{
    use HasFactory;
    protected $table = 'payements';

    protected $fillable = [ 
        'amount',
        'payment_date',
        'employer_id',
        'salaire',
        'deduction',
    ];
    public $timestamps = false;
    
    public function employer()
    {
        return $this->belongsTo(Employer::class, 'employer_id', 'ID_employer');
    }
}
