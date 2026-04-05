<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

    public function up(): void
    {
        Schema::create('curricula', function (Blueprint $table) {
            $table->id();

            // Reference to subject
            $table->foreignId('subject_id')
                ->constrained('subjects')
                ->cascadeOnDelete();


            $table->date('year_started');
            $table->date('year_ended');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('curricula');
    }
};
