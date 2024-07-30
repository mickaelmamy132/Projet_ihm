<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('employers', function (Blueprint $table) {
            $table->integer('ID_employer')->autoIncrement();
            $table->string('Nom');
            $table->string('Prenom');
            $table->string('Adresse');
            $table->string('Tel');
            $table->string('Email');
            $table->date('Date_embauche');
            $table->string('Departement');
            $table->string('Poste');
            $table->Float('Salaire_base');
            $table->binary('image');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employers');
    }
};
