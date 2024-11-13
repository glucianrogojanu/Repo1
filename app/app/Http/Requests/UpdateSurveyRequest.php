<?php
    namespace App\Http\Requests;
    use Illuminate\Foundation\Http\FormRequest;


    class UpdateSurveyRequest extends FormRequest {
        public function authorize(): bool {
            $survey = $this->route("surveyWithThisId");
            if ($this->user()->id === $survey->user_id) return true;
            return false;
        }
        public function rules(): array {
            return [
                "user_id" => "exists:users,id",
                
                "image" => "nullable",
                "title" => "required",
                "status" => "required",
                "description" => "nullable",
                "expire_date" => "nullable|after:today",
                
                "questions" => "nullable|array"
            ];
        }
    }
?>