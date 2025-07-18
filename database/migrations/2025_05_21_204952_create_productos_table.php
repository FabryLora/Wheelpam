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
        Schema::create('productos', function (Blueprint $table) {
            $table->id();
            $table->string('order')->default("zzz");
            $table->foreignId('sub_categoria_id')->constrained('sub_categorias')->cascadeOnDelete();
            $table->string('description')->nullable();
            $table->string('temperatura')->nullable();
            $table->string('confort')->nullable();
            $table->string('desgaste')->nullable();
            $table->string('barra_uno')->default('Resistencia a la temperatura');
            $table->string('barra_dos')->default('Resistencia al desgaste');
            $table->string('barra_tres')->default('Confort durante la marcha');
            $table->string('name');
            $table->longText('recomendaciones')->nullable();
            $table->string('archivo')->nullable();
            $table->boolean('featured')->default(false);
            $table->foreignId('medida_id')->nullable()->constrained('medidas')->nullOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('productos');
    }
};
