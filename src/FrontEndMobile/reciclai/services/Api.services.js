import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const API = axios.create();

API.interceptors.request.use(async(config)=> {

    try {
        
    const token =  AsyncStorage.getItem('jwtToken');

    if (token){
        config.headers.Authorization =`Bearer ${token}` ;
    }
    return config;

    } catch (err) {
        console.log(err);
    }

})

export default API;