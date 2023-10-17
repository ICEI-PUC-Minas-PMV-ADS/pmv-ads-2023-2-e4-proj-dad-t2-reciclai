import { BASE_URL } from './Urls.js';
import axios from "axios"

export const insertUsuarios = async () => {
    try{
      return await axios.post(`${BASE_URL}/usuarios`).then( 
        response => {
          return response.data;
        },
        error =>{
          console.log(error);
          return  null;
        }
      );
    }catch(error){
      console.log(error);
      return null;
    }
  }

 