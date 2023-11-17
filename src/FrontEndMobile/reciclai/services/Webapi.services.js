import axios from "react-native-axios"
import AsyncStorage from '@react-native-async-storage/async-storage';

const API = axios.create();

API.interceptors.request.use(async(config)=> {
    try {
    const token = await AsyncStorage.getItem('@TOKEN_KEY');

    if (token){
        config.headers.Authorization =`Bearer ${token}` ;
    }
    return config;

    } catch (err) {
        console.log(err);
    }

})

export default API;
