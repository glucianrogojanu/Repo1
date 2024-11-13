<?php
    namespace App\Http\Resources;
    use Illuminate\Http\Request;  use Illuminate\Http\Resources\Json\JsonResource;  use App\Http\Resources\SurveyQuestionResource;  use Illuminate\Support\Facades\URL;


    class SurveyResource extends JsonResource {
        public function toArray(Request $request): array {
            return [
                "id" => $this->id,
                "user_id" => $this->user_id,
                "image" => $this->image ? URL::to($this->image) : null,
                "title" => $this->title, 
                "slug" => $this->slug,
                "status" => !!$this->status,  //Conversie int->string
                "description" => $this->description,
                "expire_date" => $this->expire_date ? $this->expire_date : null,  //"http://localhost:8000/images/kLiM4a5eUGJi7iFZ.jpeg"
                "created_at" => $this->created_at->format("Y-m-d H:i:s"),
                "updated_at" => $this->updated_at->format("Y-m-d H:i:s"),

                "questions" => SurveyQuestionResource::collection($this->questions)
            ];
        }
    }
?>