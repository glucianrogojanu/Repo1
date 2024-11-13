import {useContext} from "react";  import {Outlet, Navigate} from "react-router-dom";
//
import {StateContext} from "../../providers/ContextProvider.jsx";



export default function GuestLayout() {
    let {token} = useContext(StateContext);
    if (token) return <Navigate to="/" />;
    return (<>
        <div>
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div><img src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" className="mx-auto h-10 w-auto" alt="Your Company" /></div>
                    <Outlet />
                </div>
            </div>
        </div>
    </>);
}