import axios from "axios";



export let axios1 = axios.create({baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`});
axios1.interceptors.request.use(function(config) { config.headers.Authorization = `Bearer ${localStorage.getItem("TOKEN")}`;  return config; });
axios1.interceptors.response.use(
    function(response) { 
        //console.log(response);
        if (response.data.errors) throw response;  //Pt. login cand datele sunt gresite.
        return response; 
    }, function(error) { 
        //console.log(error);
        if (error.response && (error.response.status === 401)) {
            localStorage.removeItem("TOKEN");
            window.location.reload();
        }
        throw error; 
    });