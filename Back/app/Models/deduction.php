<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class deduction extends Model
{
    use HasFactory; 
    protected $table = 'deduction';
    protected $primaryKey = 'deduction_id';
    protected $fillable = [ 
        'employe_id',
        'deduction_type',
        'deduction_amount',
        'deduction_date',
        'deduction_description',
    ];

    public $timestamps = false;

    public function employer()
    {
        return $this->belongsTo(Employer::class, 'employe_id', 'ID_employer');
    } 
}
