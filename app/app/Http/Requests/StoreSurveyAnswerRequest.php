<?php
    namespace App\Http\Requests;
    use Illuminate\Foundation\Http\FormRequest;


    class StoreSurveyAnswerRequest extends FormRequest {
        public function authorize(): bool {
            return true;
        }
        public function rules(): array {
            return ["answers" => "required|array"];
        }
    }
?>