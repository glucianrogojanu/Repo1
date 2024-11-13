<?php
    use Illuminate\Database\Migrations\Migration;  use Illuminate\Database\Schema\Blueprint;  use Illuminate\Support\Facades\Schema;


    return new class extends Migration {
        public function up(): void {
            Schema::create('surveys', function (Blueprint $table) {
                $table->id();
                //
                $table->foreignId("user_id")->constrained()->onDelete("cascade");
                $table->string("image")->nullable();
                $table->string("title");
                $table->string("slug");
                $table->tinyInteger("status");
                $table->text("description")->nullable();
                $table->date("expire_date")->nullable();
                //
                $table->timestamps();
            });
        }
        public function down(): void {
            Schema::dropIfExists('surveys');
        }
    };
?>