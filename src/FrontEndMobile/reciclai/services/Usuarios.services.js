import { BASE_URL } from './Urls.js';
import API from './Api.services.js';

export async function getUsuario(id){
  try{

      const req = await API.get(`${BASE_URL}/usuarios/${id}`)
      return req.data

  }catch(error){
      console.error("Usuário não encontrado", error)

  }
}


export const insertUsuarios = async (params) => {
  console.log(params);  
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

  export const updateUsuarios = async (param) => {
    try{
      return await API.put(`${BASE_URL}/usuarios/${param.id}`, param).then( 
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

  
  export const getTodosUsuarios = async () => {
    try {
      return await API.get(`${BASE_URL}/usuarios`).then(
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

  export async function deleteUsuario(id) {
    try {
      const req = await API.delete(`${BASE_URL}/usuarios/${id}`);
      return req.data;
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      throw error;
    }
  }

  export const enviarEmail = async (param) => {
    console.log(param);  
    console.log(param.email);  
    try{
        return await API.post(`${BASE_URL}/usuarios/${param.email}/EnviarEmail`).then( 
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