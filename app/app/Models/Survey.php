<?php
    namespace App\Models;
    use Illuminate\Database\Eloquent\Model;  use Illuminate\Database\Eloquent\Factories\HasFactory;  use App\Models\SurveyQuestion;  use App\Models\SurveyAnswer;  use Spatie\Sluggable\HasSlug;
    use Spatie\Sluggable\SlugOptions;  use App\Models\User;


    class Survey extends Model {
        use HasFactory, HasSlug;
        
        protected $fillable = ["user_id", "image", "title", "status", "description", "expire_date", "created_at", "updated_at"];

        public function questions() { return $this->hasMany(SurveyQuestion::class, "survey_id", "id"); }
        public function answers() { return $this->hasMany(SurveyAnswer::class, "survey_id", "id"); }
        public function user() { return $this->belongsTo(User::class, "user_id", "id"); }

        public function getSlugOptions() : SlugOptions {
            return SlugOptions::create()->generateSlugsFrom("title")->saveSlugsTo("slug");
        }
    }
?>