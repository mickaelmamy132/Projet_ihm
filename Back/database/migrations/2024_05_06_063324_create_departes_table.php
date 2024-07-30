<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('departe', function (Blueprint $table) {
            $table->id();
            $table->string('nom_departement',100);
            $table->decimal('salaire', 10 ,2);
            $table->timestamps();
        });
        // Insérer les valeurs par défaut
        DB::table('departe')->insert([
            ['nom_departement' => 'Ressources Humaines', 'salaire' => 400000.00],
            ['nom_departement' => 'Finance', 'salaire' => 450000.00],
            ['nom_departement' => 'Marketing', 'salaire' => 420000.00],
            ['nom_departement' => 'Ventes', 'salaire' => 415000.00],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('departe');
    }
};

