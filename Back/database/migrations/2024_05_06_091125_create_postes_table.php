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
        Schema::create('poste', function (Blueprint $table) {
            $table->id();
            $table->string('nom_poste');
            $table->timestamps();
        });
        // Insérer les valeurs par défaut
        DB::table('poste')->insert([
            ['nom_poste' => 'Gestionnaire RH'],
            ['nom_poste' => 'Responsable des Ressources Humaines (RRH)'],
            ['nom_poste' => 'Recruteur'],
            ['nom_poste' => 'Gestionnaire de la Formation et du Développement'],
            ['nom_poste' => 'Assistant RH'],
            ['nom_poste' => 'Analyste en Ressources Humaines'],
            ['nom_poste' => 'Directeur des Ressources Humaines (DRH)'],
            ['nom_poste' => 'Analyste financier en gestion des investissements'],
            ['nom_poste' => 'Analyste financier en planification financière'],
            ['nom_poste' => 'Analyste financier en modélisation financière'],
            ['nom_poste' => 'Analyste financier en gestion de portefeuille'],
            ['nom_poste' => 'Responsable marketing'],
            ['nom_poste' => 'Chef de produit'],
            ['nom_poste' => 'Chargé de communication'],
            ['nom_poste' => 'Analyste marketing'],
            ['nom_poste' => 'Spécialiste en marketing digital'],
            ['nom_poste' => 'Responsable des ventes'],
            ['nom_poste' => 'Directeur des ventes'],
            ['nom_poste' => 'Représentant commercial'],
            ['nom_poste' => 'Responsable grands comptes'],
            ['nom_poste' => 'Agent de vente en ligne'],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('poste');
    }
};
