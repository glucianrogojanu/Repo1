import {Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/react';  
import {Bars3Icon, XMarkIcon, UserIcon} from '@heroicons/react/24/outline';  import {useContext, useEffect} from 'react';  import {Outlet, NavLink, Navigate} from 'react-router-dom';
//
import {StateContext} from "../../providers/ContextProvider.jsx";  import {axios1} from "../../../axios.js";  import Message from "../../components/Message.jsx";



let navigation = [{name: "Dashboard", to: "/"}, {name: "Surveys", to: "/surveys"}]
let classNames = function(...classes) {  return classes.filter(Boolean).join(" ");  }

export default function UserLayout() {
    let {user, token, setUser, setToken} = useContext(StateContext);
    if (!token) return <Navigate to="/login" />;

    useEffect(function() {  axios1.get("/loggedUser").then(function(response) {  setUser(response.data); });  }, []);
    
    let logout = function(e) { e.preventDefault();  axios1.post("/logout").then(function() { setUser({});  setToken(null); }); };
    return (<>
        <div className="min-h-full">
            <Disclosure as="nav" className="bg-gray-800">
                {/* Bara de nav de sus */}
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Butoanele din stanga */}
                        <div className="flex items-center">
                            <div className="flex-shrink-0"><img src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500" className="h-8 w-8" alt="Your Company" /></div>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    {navigation.map(function(item) {
                                        return <NavLink key={item.name} to={item.to} className={function({isActive}) { return classNames(isActive ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"); }}>{item.name}</NavLink>;
                                    })}
                                </div>
                            </div>
                        </div>
                        {/* Imaginea din dreapta */}
                        <div className="hidden md:block">
                            <div className="ml-4 flex items-center md:ml-6">
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Open user menu</span>
                                            <UserIcon className='w-9 h-9 bg-black/25 p-2 rounded-full text-white' />
                                        </MenuButton>
                                    </div>
                                    <MenuItems transition className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                                        <MenuItem><a href="#" onClick={function(e) { logout(e); }} className="block px-4 py-2 text-sm text-gray-700">Sign out</a></MenuItem>
                                    </MenuItems>
                                </Menu>
                            </div>
                        </div>
                        <div className="-mr-2 flex md:hidden">
                            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <span className="absolute -inset-0.5" /><span className="sr-only">Open main menu</span>
                                <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" /><XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                            </DisclosureButton>
                        </div>
                    </div>
                </div>
                {/* Fereastra care se deschide in jos cand avem width mica(Ca de telefon) si apasam pe cele 3 linii in dreapta */}
                <DisclosurePanel className="md:hidden">
                    <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                        {navigation.map(function(item) {
                            return <NavLink key={item.name} to={item.to} className={function({isActive}) { return classNames(isActive ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white", "block px-3 py-2 rounded-md text-base font-medium"); }}>{item.name}</NavLink>;
                        })}
                    </div>
                    <div className="border-t border-gray-700 pb-3 pt-4">
                        <div className="flex items-center px-5">
                            <div className="flex-shrink-0"><UserIcon className='w-9 h-9 bg-black/25 p-2 rounded-full text-white' /></div>
                            <div className="ml-3">
                                <div className="text-base/5 font-medium text-white">{user.name}</div>
                                <div className="text-sm font-medium text-gray-400">{user.email}</div>
                            </div>
                        </div>
                        <div className="mt-3 space-y-1 px-2">
                            <DisclosureButton as="a" href="#" onClick={function(e) { logout(e); }} 
                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Sign out
                            </DisclosureButton>
                        </div>
                    </div>
                </DisclosurePanel>
            </Disclosure>
            <Outlet />
            <Message />
        </div>
    </>);
}