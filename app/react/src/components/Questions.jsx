import {PlusIcon} from "@heroicons/react/24/outline"; 
//
import Question from "./Question.jsx";



export default function Questions({questions, addQuestion, updateQuestion, deleteQuestion}) {
    return (<>
        <div className="flex justify-between">
            <h3 className="text-2xl font-bold">Questions</h3>
            <button onClick={function() { addQuestion(); }} type="button" className="flex items-center text-sm py-1 px-4 rounded-sm text-white bg-gray-600 hover:bg-gray-700">
                <PlusIcon className="w-4 mr-2"/>Add question
            </button>
        </div>
        {questions.length ? 
            questions.map(function(question, index) {
                return <Question key={question.id} question={question} index={index} addQuestion={addQuestion} updateQuestion={updateQuestion} deleteQuestion={deleteQuestion} />
            }) :
            <div className="text-gray-400 text-center py-4">You don't have any questions created</div>
        }
    </>);
}