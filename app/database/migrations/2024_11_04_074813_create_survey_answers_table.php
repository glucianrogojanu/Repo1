<?php
    use Illuminate\Database\Migrations\Migration;  use Illuminate\Database\Schema\Blueprint;  use Illuminate\Support\Facades\Schema;


    return new class extends Migration {
        public function up(): void {
            Schema::create('survey_answers', function (Blueprint $table) {
                $table->id();
                //
                $table->unsignedBigInteger("survey_id");  $table->foreign("survey_id")->references("id")->on("surveys")->onDelete("cascade");
                $table->timestamp("start_date")->nullable();
                $table->timestamp("end_date")->nullable();
                //
                $table->timestamps();
            });
        }
        public function down(): void {
            Schema::dropIfExists('survey_answers');
        }
    };
?>