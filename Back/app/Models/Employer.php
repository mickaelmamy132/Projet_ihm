<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employer extends Model
{
    use HasFactory;
    protected $table = 'employers';

    protected $primaryKey = 'ID_employer';

    public $timestamps = false;

    protected $fillable = ['Nom', 'Prenom', 'Adresse', 'Numéro', 'Email', 'Date_embauche', 'Departement', 'Poste', 'Salaire_base','image'];

}
