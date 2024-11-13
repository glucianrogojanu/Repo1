import {useContext, useEffect, useState} from "react";  import {PlusCircleIcon} from "@heroicons/react/24/outline";
//
import PageComponent from "../components/PageComponent.jsx";  import Survey from "../components/Survey.jsx";  import TButton from "../components/TButton.jsx";  import {axios1} from "../../axios.js";  import Pagination from "../components/Pagination.jsx";  import {StateContext} from "../providers/ContextProvider.jsx";


export default function Surveys() {
    let {showMessage} = useContext(StateContext);
    let [loading, setLoading] = useState(false);
    let [surveys, setSurveys] = useState([]);
    let [meta, setMeta] = useState({});

    useEffect(function() { showSurveys("/survey"); }, []);

    let deleteSurvey = function(id) { 
        if (window.confirm("Are you sure you want to delete this survey?")) {
            axios1.delete(`/survey/${id}`);
            showMessage("The survey was deleted");
            showSurveys("/survey");
        }
    };

    let showSurveys = function(url) {
        if (!url) return;
        setLoading(true);
        axios1.get(url).then(function(response) {
            setSurveys(response.data.data);
            setMeta(response.data.meta);
            setLoading(false);
        });
    };
    return (<>
        <PageComponent title="Surveys" buttons={<TButton color="green" to="/surveys/create"><PlusCircleIcon className="h-6 w-6 mr-2" />Create new</TButton>}>
            {loading && <div className="text-center text-lg">Loading...</div>}
            {!loading && 
                <div>
                    {surveys.length === 0 && <div className="py-8 text-center text-gray-700">You don't have surveys created</div>}
                    {surveys.length > 0 && <>
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                            {surveys.map(function(survey) { return <Survey key={survey.id} survey={survey} deleteSurvey={deleteSurvey} />; })}
                        </div>
                        <Pagination meta={meta} showSurveys={showSurveys}  />
                    </>}
                </div>
            }
        </PageComponent>
    </>);
}