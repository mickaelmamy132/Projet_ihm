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
        Schema::create('deduction', function (Blueprint $table) {
            $table->bigIncrements('deduction_id');
            $table->integer('employe_id');
            $table->string('deduction_type', 255);
            $table->string('deduction_amount');
            $table->date('deduction_date');
            $table->text('deduction_description');
            $table->foreign('employe_id')->references('ID_employer')->on('employers')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('deduction');
    }
};
