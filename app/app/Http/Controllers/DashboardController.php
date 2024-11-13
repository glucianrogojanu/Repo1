<?php
    namespace App\Http\Controllers;
    use Illuminate\Http\Request;  use App\Models\Survey;  use App\Models\SurveyAnswer;  use App\Http\Resources\SurveyAnswerResource;  use App\Http\Resources\SurveyResourceDashboard;

    
    class DashboardController extends Controller {
        public function index(Request $request) {
            $user = $request->user();

            $numberTotalSurveys = Survey::where("user_id", "=", $user->id)->count();
            $numberTotalAnswers = SurveyAnswer::join("surveys", "survey_answers.survey_id", "=", "surveys.id")->where("surveys.user_id", "=", $user->id)->count();
            $lastSurveyCreated = Survey::where("user_id", "=", $user->id)->latest("created_at")->first();
            $last5Answers = SurveyAnswer::join("surveys", "survey_answers.survey_id", "=", "surveys.id")->where("surveys.user_id", "=", $user->id)->orderBy('end_date', 'DESC')
            ->limit(5)->getModels('survey_answers.*');

            return [
                "numberTotalSurveys" => $numberTotalSurveys,
                "numberTotalAnswers" => $numberTotalAnswers,
                "lastSurveyCreated" => $lastSurveyCreated ? new SurveyResourceDashboard($lastSurveyCreated) : null,
                "last5Answers" => $last5Answers ? SurveyAnswerResource::collection($last5Answers) : null
            ];
        }
    }
?>