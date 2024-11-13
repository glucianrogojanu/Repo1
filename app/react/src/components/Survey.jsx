import {PencilIcon, TrashIcon, LinkIcon} from "@heroicons/react/24/outline";  import {useContext} from "react";
//
import TButton from "./TButton.jsx";  import {StateContext} from "../providers/ContextProvider.jsx";



export default function Survey({survey, deleteSurvey}) {
    let {user} = useContext(StateContext);
    return (<>
        <div className="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[470px]">
            <img src={survey.image || "http://localhost:8000/images/noimage.png"} alt={survey.title} className="w-full h-48 object-cover" />
            <h4 className="mt-4 text-lg font-bold">{survey.title}</h4>
            <div dangerouslySetInnerHTML={{ __html: survey.description }} className="overflow-hidden flex-1"></div>
            <div className="flex justify-between items-center mt-3">
                {user.id === survey.user_id ? 
                    <>
                        <TButton to={`/surveys/${survey.id}`}><PencilIcon className="w-5 h-5 mr-2" />Edit</TButton>
                        <div className="flex items-center"><TButton onClick={function() { deleteSurvey(survey.id); }} circle link color="red"><TrashIcon className="w-5 h-5" /></TButton></div>
                    </>
                    :
                    <TButton color="green" to={`/survey/public/${survey.slug}`}><LinkIcon className="h-4 w-4 mr-2" />Make a review</TButton>
                }
            </div>
        </div>
    </>);
}