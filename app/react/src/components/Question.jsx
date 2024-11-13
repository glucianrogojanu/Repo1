import {TrashIcon} from "@heroicons/react/24/outline";  import {useContext} from "react";  import {v4 as uuidv4} from "uuid";
//
import {StateContext} from "../providers/ContextProvider.jsx";



export default function Question({index, question, addQuestion, updateQuestion, deleteQuestion}) {
    let {questionTypes} = useContext(StateContext);  //["text", "select", "radio", "checkbox", "textarea"]
    
    function showOptions(inputType) { return ["select", "radio", "checkbox"].includes(inputType || question.type); }

    function changeQuestion(e, option) {
        if (e.target.name === "question")  question.question = e.target.value;
        if (e.target.name === "questionDescription") question.description = e.target.value;
        if (e.target.name === "questionType") {
            if (!showOptions(question.type) || showOptions(e.target.value) || !question.data.options) question.data.options = [{uuid: uuidv4(), text: ""}];
            question.type = e.target.value;
        }
        if (option) question.data.options.find(function(elem) { return elem.uuid === option.uuid; }).text = e.target.value;
        updateQuestion(question);
    }

    function addOption() {
        question.data.options.push({uuid: uuidv4(), text: ""});
        updateQuestion(question);
    }
    function deleteOption(uuid) {
        question.data.options.splice(question.data.options.findIndex(function(elem) { return elem.uuid === uuid; }), 1);
        updateQuestion(question);
    }
    return (<>
        <br /><div className="mt-10">
            <div className="flex justify-between mb-3">
                <h4 style={{fontSize: "16px", fontWeight: "bold"}}>Question {index + 1}: {question.question}</h4>
                <div className="flex items-center">
                    <button onClick={function() { deleteQuestion(question.id); }} type="button" className="bg-red-50 flex items-center text-xs py-1 px-2  rounded-sm border border-transparent text-red-500 hover:border-red-600 font-semibold"><TrashIcon className="w-5" />Delete question</button>
                </div>
            </div>
            <div className="flex gap-3 justify-between mb-3">
                {/* Question Text */}
                <div className="flex-1">
                    <label htmlFor="question" className="block text-sm font-medium text-gray-700">Question</label>
                    <input onChange={changeQuestion} value={question.question || ""} type="text" name="question" id="question" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                </div>
                {/* Question Type */}
                <div>
                    <label htmlFor="questionType" className="block text-sm font-medium text-gray-700 w-40">Question Type</label>
                    <select onChange={changeQuestion} value={question.type} name="questionType" id="questionType" className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                        {questionTypes.map(function(type) { return <option value={type} key={type}>{type[0].toUpperCase() + type.slice(1)}</option> })}
                    </select>
                </div>
            </div>
        {/*Description*/}
            <div className="mb-3">
                <label htmlFor="questionDescription" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea onChange={changeQuestion} value={question.description || ""} name="questionDescription" id="questionDescription" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
            </div>
            <div>
                {showOptions() && (
                    <div>
                        <h4 className="text-sm font-semibold mb-1 flex justify-between items-center">Add the available options for this question
                            <button onClick={addOption} type="button" className="flex items-center text-xs py-1 px-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700">Add option</button>
                        </h4>
                        <div>
                            {question.data.options.map(function(option, index) {
                                return (<div key={option.uuid} className="flex items-center mb-1">
                                            <span className="w-6 text-sm">{index + 1}.</span>
                                            <input onChange={function(e) { changeQuestion(e, option); }} value={option.text || ""} type="text"
                                            className="w-full rounded-sm py-1 px-2 text-xs border border-gray-300 focus:border-indigo-500" />
                                            <button onClick={function() { deleteOption(option.uuid); }} type="button"
                                            className="h-6 w-6 rounded-full flex items-center justify-center border border-transparent transition-colors hover:border-red-100">
                                                <TrashIcon className="w-3 h-3 text-red-500" />
                                            </button>
                                        </div>)
                                })}
                        </div>
                    </div>
                )}
            </div>
        </div>
        <br /><hr />
    </>);
}
