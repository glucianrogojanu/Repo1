import {createContext, useState} from "react";



export let StateContext = createContext();

export default function ContextProvider({children}) {
    let [user, setUser] = useState({});
    let [token, setTokenn] = useState(localStorage.getItem("TOKEN") || null);
    let [questionTypes, setQuestionTypes] = useState(["text", "select", "radio", "checkbox", "textarea"]);
    let [message, setMessage] = useState({show: false, message: null});
    let setToken = function(token) {
        token ? localStorage.setItem("TOKEN", token) : localStorage.removeItem("TOKEN");
        setTokenn(token);
    };
    let showMessage = function(message) {
        setMessage({show: true, message});
        setTimeout(function() { setMessage({show: false, message: null}) }, 5000);
    };
    return (<>
        <StateContext.Provider value={{user, token, message, questionTypes, setUser, setToken, showMessage}}>{children}</StateContext.Provider>
    </>);
}