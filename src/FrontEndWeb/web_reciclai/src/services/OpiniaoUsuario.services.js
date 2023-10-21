import { BASE_URL } from './Urls.js';
import API from './Api.services.js';


export const getOpiniaoUsuarios = async () => {
  try {
    return await API.get(`${BASE_URL}/OpiniaoUsuarios`).then(
      response => {
        return response.data;
      },
      error => {
        console.log(error);
        return null;
      }
    );
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const insertOpiniaoUsuarios  = async (params) => {
  console.log(params);  
  try{
      return await API.post(`${BASE_URL}/OpiniaoUsuarios`, params).then( 
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

  export const updateOpiniaoUsuarios  = async (param) => {
    try{
      return await API.put(`${BASE_URL}/OpiniaoUsuarios/${param.id}`, param).then( 
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

  export const deleteOpiniaoUsuarios = async (id) => {
    try {
      return await API.delete(`${BASE_URL}/OpiniaoUsuarios/${id}`).then(
        response => {
          return response.data;
        },
        error => {
          console.log(error);
          return null;
        }
      );
    } catch (error) {
      console.log(error);
      return null;
    }
  }
