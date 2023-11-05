import axios from "axios";

const API = axios.create();

/*API.interceptors.request.use(async(config)=> {

    try {
        
    const token =  localStorage.getItem('jwtToken');

    if (token){
        config.headers.Authorization =`Bearer ${token}` ;
    }
    return config;

    } catch (err) {
        console.log(err);
    }

})*/

export default API;