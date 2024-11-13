<?php
    namespace App\Http\Controllers;
    use Illuminate\Http\Request;  use App\Http\Requests\LoginRequest;  use App\Http\Requests\SignupRequest;  use App\Models\User;  use Illuminate\Support\Facades\Auth;
    use App\Http\Resources\UserResource;


    class AuthController extends Controller {
        public function signup(SignupRequest $request) {  //Register.
            $fields = $request->validated();
            $fields["password"] = bcrypt($fields["password"]);
            $user = User::create($fields);
            $token = $user->createToken("main");
            return response(["user" => $user, "token" => $token->plainTextToken]);
        }
        public function login(LoginRequest $request) {  //Login.
            $fields = $request->validated();
            $remember = $fields["remember"] ?? false;  //Daca exista $fields["remember"], ia valoarea lui; Altfel ia false.
            unset($fields["remember"]);  //Ne sterge perechea "remember" => "valoare" din array-ul "fields".
            if (!Auth::attempt($fields, $remember)) return response(["errors" => "The provided credentials are not correct"]);
            $user = Auth::user();
            $token = $user->createToken("main");
            return response(["user" => $user, "token" => $token->plainTextToken]);
        }
        public function logout() {  //Logout.
            $user = Auth::user();
            $user->currentAccessToken()->delete();
            return response(["succes" => true]);
        }

        public function loggedUser(Request $request) {  //Logged user.
            return $request->user();
        }
    }
?>