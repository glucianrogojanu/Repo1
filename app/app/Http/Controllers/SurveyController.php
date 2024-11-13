<?php
    namespace App\Http\Controllers;
    use Illuminate\Support\Facades\File;  use Illuminate\Support\Str;  use Illuminate\Validation\Rules\Enum;  use Illuminate\Support\Facades\Validator;  use Illuminate\Support\Arr;
    use DateTime;
    //
    use App\Models\Survey;  use App\Http\Requests\StoreSurveyRequest;  use App\Http\Requests\UpdateSurveyRequest;  use Illuminate\Http\Request;  use App\Http\Resources\SurveyResource;
    use App\Models\SurveyQuestion;  use App\Enums\QuestionTypeEnum;  use App\Http\Requests\StoreSurveyAnswerRequest;  use App\Models\SurveyAnswer;  use App\Models\SurveyQuestionAnswer;



    class SurveyController extends Controller {
        public function index(Request $request) {  //Show all surveys.
            return SurveyResource::collection(Survey::orderBy("created_at", "asc")->paginate(2));
        }
        public function show(Request $request, Survey $surveyWithThisId) {  //Show one survey.
            $user = $request->user();
            if ($user->id !== $surveyWithThisId->user_id) return abort(403, "Unauthorized action");
            return new SurveyResource($surveyWithThisId);
        }
        public function getBySlug(Survey $surveyWithThisSlug) {
            return new SurveyResource($surveyWithThisSlug);
        }
        

        public function store(StoreSurveyRequest $request) {  //Create survey.
            $fields = $request->validated();
            if (isset($fields["image"])) $fields["image"] = $this->saveImage($fields["image"]);  //Ne creeaza adresa fotografiei sub forma:  "images/LITEREsiCIFRErandom.jpg"
            $survey = Survey::create($fields);
            if (count($fields["questions"]) > 0) {
                foreach ($fields["questions"] as $question) {
                    $question["survey_id"] = $survey->id;
                    $this->createQuestion($question);
                }
            }
            return new SurveyResource($survey);  //[id, name, slug]
        }
        public function update(UpdateSurveyRequest $request, Survey $surveyWithThisId) {  //Edit survey.
            $fields = $request->validated();
            if (isset($fields["image"])) {
                if ($surveyWithThisId->image) File::delete(public_path($surveyWithThisId->image));  //Stergem vechea fotografie.
                $fields["image"] = $this->saveImage($fields["image"]);  //Ne creeaza adresa fotografiei sub forma:  "images/LITEREsiCIFRErandom.jpg"
            }
            $surveyWithThisId->update($fields);

            $existingIds = $surveyWithThisId->questions()->pluck("id")->toArray();  //Id-urile intrebarilor existente.
            $newIds = Arr::pluck($fields["questions"], "id");  //Id-urile noilor intrebari.
            $toDelete = array_diff($existingIds, $newIds);  //Intrebarile cu aceste id-uri se sterg.
            $toAdd = array_diff($newIds, $existingIds);  //Intrebarile cu aceste id-uri se adauga.

            SurveyQuestion::destroy($toDelete);  //Stergem aceste intrebari.
            foreach ($fields["questions"] as $question) {  //Adaugam aceste intrebari.
                if (in_array($question["id"], $toAdd)) {
                    $question["survey_id"] = $surveyWithThisId->id;
                    $this->createQuestion($question);
                }
            }
            
            $questionMap = collect($fields["questions"])->keyBy("id");  //Modificam intrebarile existente.
            foreach ($surveyWithThisId->questions as $question) {
                if (isset($questionMap[$question->id])) $this->updateQuestion($question, $questionMap[$question->id]);
            }

            return new SurveyResource($surveyWithThisId);
        }
        public function destroy(Request $request, Survey $surveyWithThisId) {  //Delete survey.
            $user = $request->user();
            if ($user->id !== $surveyWithThisId->user_id) return abort(403, "Unauthorized action");
            if ($surveyWithThisId->image) File::delete(public_path($surveyWithThisId->image));
            $surveyWithThisId->delete();
            return response("", 204);
        }
        public function storeAnswer(StoreSurveyAnswerRequest $request, Survey $surveyWithThisId) {
            $fields = $request->validated();
            $surveyAnswer = SurveyAnswer::create(["survey_id" => $surveyWithThisId->id, "start_date" => date("Y-m-d H:i:s"), 'end_date' => date("Y-m-d H:i:s")]);
            foreach ($fields["answers"] as $questionId => $answer) {
                $question = SurveyQuestion::where("id", "=", $questionId)->get();
                if (!$question) return response("Invalid question ID: ".$questionId."", 400);
                $fields1 = ["survey_question_id" => $questionId, "survey_answer_id" => $surveyAnswer->id, "answer" => is_array($answer) ? json_encode($answer) : $answer];
                $questionAnswer = SurveyQuestionAnswer::create($fields1);
            }
            return response("", 201);
        }


        private function createQuestion($question) {
            if (is_array($question["data"])) $question["data"] = json_encode($question["data"]); 
            $validator = Validator::make($question, [
                "survey_id" => "exists:surveys,id",
                "type" => ["required", new Enum(QuestionTypeEnum::class)],
                "question" => "required",
                "description" => "nullable",
                "data" => "present"
            ]);
            return SurveyQuestion::create($validator->validated());
        }
        private function updateQuestion(SurveyQuestion $question, $data) {
            if (is_array($data["data"]))  $data["data"] = json_encode($data["data"]);
            $validator = Validator::make($data, [
                "id" => "exists:survey_questions,id",
                "type" => ["required", new Enum(QuestionTypeEnum::class)],
                "question" => "required",
                "description" => "nullable",
                "data" => "present",
            ]);
            return $question->update($validator->validated());
        }
        private function saveImage($image) {
            if (preg_match('/^data:image\/(\w+);base64,/', $image, $type)) {  //Verifica daca $image este sub forma:   data:image/jpeg;base64,/....
                $image = substr($image, strpos($image, ',') + 1);  // Take out the base64 encoded text without mime type
                $type = strtolower($type[1]);  //Get file extension: jpg, png, gif
                if (!in_array($type, ["jpg", "jpeg", "gif", "png"])) { throw new \Exception("invalid image type"); }  // Check if file is an image
                $image = str_replace(" ", "+", $image);
                $image = base64_decode($image);
                if ($image === false) { throw new \Exception("base64_decode failed"); }
            } else { throw new \Exception("did not match data URI with image data"); }
            $dir = "images/";
            $file = Str::random() . "." . $type;
            $absolutePath = public_path($dir);
            $relativePath = $dir . $file;
            if (!File::exists($absolutePath)) File::makeDirectory($absolutePath, 0755, true);
            file_put_contents($relativePath, $image);
            return $relativePath;
        }
    }
?>