<?php
    namespace App\Http\Resources;
    use Illuminate\Http\Request;  use Illuminate\Http\Resources\Json\JsonResource;  use App\Http\Resources\SurveyResource;  use App\Http\Resources\UserResource;


    class SurveyAnswerResource extends JsonResource {
        public function toArray(Request $request): array {
            return [
                "id" => $this->id,
                "survey" => new SurveyResource($this->survey),
                "user" => new UserResource($this->survey->user),
                "end_date" => $this->end_date
            ];
        }
    }
?>