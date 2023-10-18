import { BASE_URL } from './Urls.js';
import API from './Api.services.js';


export const insertUsuarios = async (params) => {
    try{
      return await API.post(`${BASE_URL}/usuarios`, params).then( 
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

 