<?php
    use Illuminate\Database\Migrations\Migration;  use Illuminate\Database\Schema\Blueprint;  use Illuminate\Support\Facades\Schema;


    return new class extends Migration {
        public function up(): void {
            Schema::create('survey_questions', function (Blueprint $table) {
                $table->id();
                //
                $table->unsignedBigInteger("survey_id");  $table->foreign("survey_id")->references("id")->on("surveys")->onDelete("cascade");
                $table->string("type");
                $table->string("question");
                $table->longText("description")->nullable();
                $table->longText("data")->nullable();
                //
                $table->timestamps();
            });
        }
        public function down(): void {
            Schema::dropIfExists('survey_questions');
        }
    };
?>