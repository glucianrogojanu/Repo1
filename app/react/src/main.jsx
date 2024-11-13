import {createRoot} from "react-dom/client";  import {createBrowserRouter, RouterProvider, Navigate} from "react-router-dom";
//
import "./index.css";  import UserLayout from "./pages/layouts/UserLayout.jsx";  import GuestLayout from "./pages/layouts/GuestLayout.jsx";  import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";  import Dashboard from "./pages/Dashboard.jsx";  import Surveys from "./pages/Surveys.jsx";
import ContextProvider from "./providers/ContextProvider.jsx";  import SurveysForm from "./pages/SurveysForm.jsx";  import Answers from "./pages/Answers.jsx";



export let router = createBrowserRouter([
    {path: "/", element: <UserLayout />, children: [  //For logged user(If we are not logged in, we are redirected.)
        {path: "/", element: <Dashboard />},  
        {path: "/dashboard", element: <Navigate to="/" />},  //Info about logged user: how many surveys created, answers received etc.
        {path: "/surveys", element: <Surveys />},  //Show all surveys created by all users: If you are the owner, you cand edit or delete it. If not, you can answer the questions about this survey.
        {path: "/surveys/create", element: <SurveysForm />},  //Create new survey.
        {path: "/surveys/:id", element: <SurveysForm />}  //Edit existing survey.
    ]},
    {path: "/", element: <GuestLayout />, children: [  //For guests(If we are logged in, we are redirected.)
        {path: "/login", element: <Login />},  //Login.
        {path: "/signup", element: <Signup />}  //Signup.
    ]},
    {path: "/survey/public/:slug", element: <Answers />},  //Answer the questions for a survey.
    {path: "*", element: <h1>Page not found!</h1>}
]);
createRoot(document.getElementById("index")).render(<ContextProvider><RouterProvider router={router}></RouterProvider></ContextProvider>);
