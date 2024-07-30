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
        Schema::create('type_deductions', function (Blueprint $table) {
            $table->id();
            $table->string('type', 255);
            $table->decimal('amount', 10, 2);
            $table->timestamps();
        });
        // Insérer les valeurs par défaut
        DB::table('type_deductions')->insert([
            ['type' => 'cotisations sociales', 'amount' => 12000],
            ['type' => 'assurance maladie', 'amount' => 10000],
            ['type' => 'Cotisation syndicale', 'amount' => 5000],
            ['type' => 'prêt sur salaire', 'amount' => 150000],
            ['type' => 'cotisation retraite', 'amount' => 25000],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('type_deductions');
    }
};

