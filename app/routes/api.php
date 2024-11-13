<?php
    use Illuminate\Http\Request;  use Illuminate\Support\Facades\Route;  use App\Http\Controllers\AuthController;  use App\Http\Controllers\SurveyController;
    use App\Http\Controllers\DashboardController;



    Route::middleware("auth:sanctum")->group(function() { 
        Route::get("/loggedUser", [AuthController::class, "loggedUser"]);  //Logged user.
        Route::post("/logout", [AuthController::class, "logout"]);  //Logout.

        Route::get("/survey", [SurveyController::class, "index"]);  //Show all surveys.
        Route::get("/survey/{surveyWithThisId}", [SurveyController::class, "show"]);  //Show one survey.
        Route::post("/survey", [SurveyController::class, "store"]);  //Create survey.
        Route::put("/survey/{surveyWithThisId}", [SurveyController::class, "update"]);  //Update survey.
        Route::delete("/survey/{surveyWithThisId}", [SurveyController::class, "destroy"]);  //Delete survey.

        Route::get("/dashboard", [DashboardController::class, "index"]);
    });


    Route::post("/signup", [AuthController::class, "signup"]);  //Register.
    Route::post("/login", [AuthController::class, "login"]);  //Login.


    Route::get("/survey/get-by-slug/{surveyWithThisSlug:slug}", [SurveyController::class, "getBySlug"]);
    Route::post("/survey/{surveyWithThisId}/answer", [SurveyController::class, "storeAnswer"]);
?>