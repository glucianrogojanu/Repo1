<?php
    namespace App\Models;
    use Illuminate\Database\Eloquent\Model;  use Illuminate\Database\Eloquent\Factories\HasFactory;  use App\Models\Survey;


    class SurveyAnswer extends Model  {
        use HasFactory;
        
        protected $fillable = ["survey_id", "start_date", "end_date"];

        public function survey() { return $this->belongsTo(Survey::class, "survey_id"); }
    }
?>