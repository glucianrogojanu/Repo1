import {useEffect, useState} from "react";  import {useNavigate, useParams} from "react-router-dom";
//
import {axios1} from "../../axios.js";  import Answer from "../components/Answer.jsx";



export default function Answers() {
    let navigate = useNavigate();
    let {slug} = useParams();
    let [survey, setSurvey] = useState({});
    let [error, setError] = useState(false);  let [surveyFinished, setSurveyFinished] = useState(false);

    useEffect(function() {  axios1.get(`/survey/get-by-slug/${slug}`).then(function(response) { setSurvey(response.data.data); });  }, []);

    let ourAnswers = {};
    let answerChanged = function(questionId, value) { ourAnswers[questionId] = value; }

    let onSubmit = function(e) {
        e.preventDefault();
        setError(false);
        let fullfied = function() { setSurveyFinished(true);  navigate("/dashboard"); };
        let rejected = function(error) { setError(error.response.data.message); }
        axios1.post(`/survey/${survey.id}/answer`, {answers: ourAnswers}).then(fullfied).catch(rejected);
    };
    return (<>
        <div>
            {!survey.id && <div className="flex justify-center">Loading..</div>}
            {survey.id && <>
                <form onSubmit={onSubmit} className="container mx-auto p-4">
                    <div className="grid grid-cols-6">
                        <div className="mr-4"><img src={survey.image} /></div>
                        <div className="col-span-5">
                            <h1 className="text-3xl mb-3">{survey.title}</h1>
                            {survey.expire_date && <p className="text-gray-500 text-sm mb-3">Expire Date: {survey.expire_date}</p>}
                            <p className="text-gray-500 text-sm mb-3">{survey.description}</p>
                        </div>
                    </div>
                    {!survey.questions.length ? 
                        <div className="py-5 px-5 bg-red-300 text-white w-[450px] mx-auto">This survey doesn't have any questions to make a review!</div>
                        :
                        <>
                        {!surveyFinished && 
                            <>
                                {error && <div className="py-8 px-6 bg-red-500 text-white w-[600px] mx-auto">You have to answer at least one question</div>}
                                <div>{survey.questions.map(function(question, index) { return <Answer key={question.id} question={question} index={index} answerChanged={answerChanged} /> })}</div>
                                <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Submit</button>
                            </>
                        }
                        {surveyFinished && <div className="py-8 px-6 bg-emerald-500 text-white w-[600px] mx-auto">Thank you for participating in the survey</div>}
                        </> 
                    }
                </form>
            </>}
        </div>
    </>);
}