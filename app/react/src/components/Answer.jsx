

export default function Answer({question, index, answerChanged}) {
    let answers = [];
    let answersCheckbox = function(e, option) {
        if (e.target.checked) { answers.push(option.text); 
        } else { answers.splice(answers.findIndex(function(elem) { return elem = option.text }), 1); }
        answerChanged(question.id, answers);
    };
    return (<>
        <fieldset className="mt-6 mb-6">
            <div>
                <legend className="text-base font-medium text-gray-900">{index + 1}. {question.question}</legend>
                <p className="text-gray-500 text-sm">{question.description}</p>
            </div>
            <div className="mt-3">
                {question.type === "select" && 
                    <><div> 
                        <select onChange={function(e) { answerChanged(question.id, e.target.value); }} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            <option value="">Please Select</option>
                            {question.data.options.map(function(option) { return <option key={option.uuid} value={option.text}>{option.text}</option>; })}
                        </select>
                    </div></>
                }
                {question.type === "radio" && 
                    <><div>
                        {question.data.options.map(function(option) {
                            return (<div key={option.uuid} className="flex items-center">
                                        <input type="radio" id={option.uuid} name="radio" value={option.text} onChange={function(e) { answerChanged(question.id, e.target.value); }} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                                        <label htmlFor={option.uuid} className="ml-3 block text-sm font-medium text-gray-700">{option.text}</label>
                                    </div>);
                        })}
                    </div></>}
                {question.type === "checkbox" && 
                    <><div>
                        {question.data.options.map(function(option) {
                            return (<div key={option.uuid} className="flex items-center">
                                        <input type="checkbox" id={option.uuid} onChange={function(e) { answersCheckbox(e, option); }} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"/>
                                        <label htmlFor={option.uuid} className="ml-3 block text-sm font-medium text-gray-700">{option.text}</label>
                                    </div>);
                        })}
                    </div></>
                }
                {question.type === "text" && 
                    <><div>
                        <input type="text" onChange={function(e) { answerChanged(question.id, e.target.value); }} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div></>
                }
                {question.type === "textarea" && 
                    <><div>
                        <textarea onChange={function(e) { answerChanged(question.id, e.target.value); }} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"></textarea>
                    </div></>
                }
            </div>
        </fieldset>
        <hr className="mb-4" />
    </>);
}