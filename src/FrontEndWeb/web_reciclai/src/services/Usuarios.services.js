import API from './Api.services.js';
import { BASE_URL } from './Urls.js';

export const insertUsuarios = async (param) => {
    try{
      return await API.post(`${BASE_URL}/usuarios`, param).then( 
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

 