<?php
    namespace App\Http\Resources;
    use Illuminate\Http\Request;  use Illuminate\Http\Resources\Json\JsonResource;  use Illuminate\Support\Facades\URL;


    class SurveyResourceDashboard extends JsonResource {
        public function toArray(Request $request): array {
            return [
                "id" => $this->id,
                "image" => $this->image ? URL::to($this->image) : null,
                "title" => $this->title,
                "slug" => $this->slug,
                "status" => !!$this->status,
                "expire_date" => $this->expire_date ? $this->expire_date : null,
                "created_at" => $this->created_at->format('Y-m-d H:i:s'),

                "numberOfQuestions" => $this->questions()->count(),
                "numberOfAnswers" => $this->answers()->count()
            ]; 
        }
    }
?>
