import { BASE_URL } from './Urls.js';
import API from './Api.services.js';

export async function getPedidos(id){
  try{

      const req = await API.get(`${BASE_URL}/pedidos/${id}`)
      return req.data

  }catch(error){
      console.error("Pedido não encontrado", error)

  }
}

export const getTodosPedidos = async () => {
    try {
      return await API.get(`${BASE_URL}/pedidos`).then(
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
