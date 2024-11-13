import {useContext, useEffect, useState} from "react";  import {PhotoIcon} from "@heroicons/react/24/outline";  import {useNavigate, useParams} from "react-router-dom";
import {v4 as uuidv4} from "uuid";
//
import PageComponent from "../components/PageComponent.jsx";  import TButton from "../components/TButton.jsx";  import {axios1} from "../../axios.js";
import Questions from "../components/Questions.jsx";  import {StateContext} from "../providers/ContextProvider.jsx";



export default function SurveysForm() {
    let navigate = useNavigate();
    let {showMessage} = useContext(StateContext);
    let [survey, setSurvey] = useState({image: null, title: "", status: false, description: "", expire_date: "",   questions: []});
    let [errors, setErrors] = useState([]);
    let [loading, setLoading] = useState(false);
    let {id} = useParams();

    if (id) useEffect(function() { setLoading(true);  axios1.get(`/survey/${id}`).then(function(response) { setSurvey(response.data.data);  setLoading(false); });  }, []);

    let addImage = function(e) {
        let poza = e.target.files[0];  // File {lastModified, lastModifiedDate, name, size, type, webkitRelativePath}
        let reader = new FileReader();
        reader.onload = function() {
            let oldSurvey = {...survey};      
            oldSurvey.image = reader.result;  //Un string cu locatia fotografiei ce este sub forma:  data:image/jpeg;base64,/....
            setSurvey(oldSurvey);
        };
        reader.readAsDataURL(poza);
    };

    let addOrEditSurvey = function(e) { 
        e.preventDefault();
        setErrors([]);
        let fullfied = function(response) { 
            navigate("/surveys");
            showMessage(id ? "The survey was updated" : "The survey was created");
        };
        let rejected = function(error) {
            let formatedErrors = [];
            for (let property in error.response.data.errors) { error.response.data.errors[property].forEach(function(err) { formatedErrors.push(err); });  }
            setErrors(formatedErrors);
        };
        let data = {title: survey.title, status: survey.status, description: survey.description, expire_date: survey.expire_date, questions: survey.questions};
        if (survey.image) { if (survey.image[0] !== "h") data.image = survey.image; }
        if (!id) axios1.post("/survey", data).then(fullfied).catch(rejected);
        if (id) axios1.put(`/survey/${id}`, data).then(fullfied).catch(rejected);
    };

    let addQuestion = function(indexToAdd) {
        let oldSurvey = {...survey};
        let questionToAdd = {id: uuidv4(), question: "Intrebare", type: "text", description: "", data: {}};
        if (!indexToAdd) oldSurvey.questions.push(questionToAdd);
        if (indexToAdd) oldSurvey.questions.splice(indexToAdd, 0, questionToAdd);
        setSurvey(oldSurvey);
    };
    let updateQuestion = function(questionToUpdate) {
        let oldSurvey = {...survey};
        let indexToUpdate = oldSurvey.questions.findIndex(function(elem) { return elem.id === questionToUpdate.id; });
        oldSurvey.questions[indexToUpdate] = questionToUpdate;
        setSurvey(oldSurvey);
    };
    let deleteQuestion = function(idQuestionToDelete) {
        let oldSurvey = {...survey};
        let indexToDelete = oldSurvey.questions.findIndex(function(elem) { return elem.id === idQuestionToDelete; });
        if (indexToDelete > -1) oldSurvey.questions.splice(indexToDelete, 1);
        setSurvey(oldSurvey);
    };

    if (loading) return <PageComponent><div>Loading...</div></PageComponent>;
    return (<>
        <PageComponent title={id ? `Update Survey: ${survey.title}` : "Create new Survey"}>
            <form onSubmit={addOrEditSurvey} action="#" method="POST">
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                    <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                        {(errors.length > 0) && <div className="bg-red-500 text-white py-3 px-3">{errors.map(function(err, i) { return <div key={`err${i}`}>{err}</div>; })}</div>}
                        {/* Image */}
                        <div>
                            <div className="mt-1 flex items-center">
                                {survey.image && <img src={survey.image} className="w-32 h-32 object-cover"/>}
                                {!survey.image && (<span className="flex justify-center  items-center text-gray-400 h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                                                        <PhotoIcon className="w-8 h-8" />
                                                    </span>)}
                                <button type="button" className="relative ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                    <input onChange={addImage} type="file" className="absolute left-0 top-0 right-0 bottom-0 opacity-0" />Change
                                </button>
                            </div>
                        </div>
                        {/* Title */}
                        <div className="col-span-6 sm:col-span-3">
                            <input onChange={function(e) { let oldSurvey = {...survey};  oldSurvey.title = e.target.value;  setSurvey(oldSurvey); }} value={survey.title} 
                            type="text" name="title" placeholder="Survey Title" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>
                        {/* Description */}
                        <div className="col-span-6 sm:col-span-3">
                            <textarea onChange={function(e) { let oldSurvey = {...survey};  oldSurvey.description = e.target.value;  setSurvey(oldSurvey); }} value={survey.description || ""}
                            name="description" placeholder="Describe your survey" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
                        </div>
                        {/* Expire date */}
                        <div className="col-span-6 sm:col-span-3">
                            <input onChange={function(e) { let oldSurvey = {...survey};  oldSurvey.expire_date = e.target.value;  setSurvey(oldSurvey); }} value={survey.expire_date || ""}
                            type="date" name="expire_date"  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>
                            {/* Status */}
                        <div className="flex items-start">
                            <div className="flex h-5 items-center">
                                <input onChange={function(e) { let oldSurvey = {...survey};  oldSurvey.status = e.target.checked;  setSurvey(oldSurvey); }} checked={survey.status}
                                type="checkbox" name="status"  id="status" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="comments" className="font-medium text-gray-700">Active</label>
                                <p className="text-gray-500">Whether to make survey publicly available</p>
                            </div>
                        </div><br /><br />
                        <Questions questions={survey.questions} addQuestion={addQuestion} updateQuestion={updateQuestion} deleteQuestion={deleteQuestion} />
                    </div>
                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6"><TButton>Save</TButton></div>
                </div>
            </form>
        </PageComponent>
    </>);
}