import { BASE_URL } from './Urls.js';
import API from './Api.services.js';

export async function getPedidos(id){
  try{

      const req = await API.get(`${BASE_URL}/pedidos/${1}`)
      return req.data

  }catch(error){
      console.error("Pedido não encontrado", error)

  }
}


export const insertPedidos = async (params) => {
  console.log(params);  
  try{
      return await API.post(`${BASE_URL}/pedidos`, params).then( 
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

  export const updatePedidos = async (param) => {
    try{
      return await API.put(`${BASE_URL}/pedidos/${param.id}`, param).then( 
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