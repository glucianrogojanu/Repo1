<?php
    namespace App\Http\Requests;
    use Illuminate\Foundation\Http\FormRequest;


    class StoreSurveyRequest extends FormRequest {
        public function authorize(): bool {
            return true;
        }
        public function prepareForValidation() {
            $this->merge(["user_id" => $this->user()->id]);
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