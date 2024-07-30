<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payements', function (Blueprint $table) {
            $table->id();
            $table->decimal('amount', 10, 2);
            $table->date('payment_date');
            $table->integer('employer_id');
            $table->string('deduction', 255);
            $table->decimal('salaire',  10, 2);
            $table->foreign('employer_id')->references('ID_employer')->on('employers');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payements');
    }
};
