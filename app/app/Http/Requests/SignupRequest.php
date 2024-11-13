<?php
    namespace App\Http\Requests;
    use Illuminate\Foundation\Http\FormRequest;  use Illuminate\Validation\Rule;  use Illuminate\Validation\Rules\Password;


    class SignupRequest extends FormRequest {
        public function authorize(): bool {
            return true;
        }
        public function rules(): array {
            return [
                "name" => "required", 
                "email" => "required|unique:users",
                "password" => ["required", "confirmed", Password::min(8)->mixedCase()->numbers()->symbols()]
            ];
        }
    }
?>
