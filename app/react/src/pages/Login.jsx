import {Link} from "react-router-dom";  import {LockClosedIcon} from "@heroicons/react/20/solid";  import {useState, useContext} from "react";
//
import {StateContext} from "../providers/ContextProvider.jsx";  import {axios1} from "../../axios.js";



export default function Login() {
    let {setUser, setToken} = useContext(StateContext);
    let [email, setEmail] = useState("");  
    let [password, setPassword] = useState("");  
    let [errors, setErrors] = useState({__html: ""});
    let onSubmit = function(e) {
        e.preventDefault();
        setErrors({__html: ""});
        let fullfied = function(response) { setUser(response.data.user);  setToken(response.data.token); };
        let rejected = function(error) {  //error.response.data.errors = {email: [eroare1, eroare2, ...], name: [eroare1, eroare2, ...], password: [eroare1, eroare2, ...]}
            let formatedErrors = [];
            if (error.data) {
                setErrors({__html: error.data.errors});
            } else {
                for (let property in error.response.data.errors) { 
                    if (error.response.data.errors[property].length == 1) { formatedErrors.push(error.response.data.errors[property][0]); }
                    else { error.response.data.errors[property].forEach(function(elem) { formatedErrors.push(elem); }); }
                }
                setErrors({__html: formatedErrors.join("<br>")});
            }
        };
        axios1.post("/login", {email, password}).then(fullfied).catch(rejected);
    };
    return (<>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
        <p className="mt-2 text-center text-sm text-gray-600">Or <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">sign up for free</Link></p>
        {errors.__html && <div className="bg-red-500 rounded py-2 px-3 text-white" dangerouslySetInnerHTML={errors}></div>}
        <form onSubmit={onSubmit} className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
                {/* Email */}
                <div>
                    <input onChange={function(e) { setEmail(e.target.value); }} value={email} type="email" name="email" placeholder="email" autoComplete="email" className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                </div>
                {/* Password */}
                <div>
                    <input onChange={function(e) { setPassword(e.target.value); }} value={password} type="password" name="password" placeholder="password" autoComplete="current-password" className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                </div>
            </div>
            <div>
                <button className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3"><LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true"/></span>
                    Sign in
                </button>
            </div>
        </form>
    </>);
}