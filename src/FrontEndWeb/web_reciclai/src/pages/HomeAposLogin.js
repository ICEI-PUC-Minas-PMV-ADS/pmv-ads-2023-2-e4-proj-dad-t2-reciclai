import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import styles from './styles/HomeAposLogin.module.css';
import Table from 'react-bootstrap/Table';
import { BASE_URL } from '../services/Urls';
import API from '../services/Api.services';



const HomeAposLogin = () => {

  const [data, setData] = useState([]);

  async function getPedidos(){
    try{
  
        const req = await API.get(`${BASE_URL}/pedidos`)
        return req.data
  
    }catch(error){
        console.error("Pedido não encontrado", error)
  
    }
  }

  async function fetchPedido() {
    try {
      const res = await getPedidos();
      setData(res.data);
  
    } catch (error) {
      console.error('Erro ao buscar informações do pedido:', error);
    }
  }

  useEffect(() => {
    fetchPedido();
  })

  return (
    <Container>
    
      <div>
        <h5 className={styles.titulo}>Histórico de pedidos:</h5>
        <Table striped="columns" className={styles.table}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome do Solicitante</th>
              <th>Data da Coleta</th>
              <th>Tipo de Lixo</th>
              <th>Quantidade de Lixo</th>
            </tr>
          </thead>
          <tbody>
            {data.map(pedido => (
              <tr key={pedido.id}>
                <td>{pedido.id}</td>
                <td>{pedido.nomeSolicitante}</td>
                <td>{pedido.dataColeta}</td>
                <td>{pedido.tipoLixo}</td>
                <td>{pedido.qtdeLixo}</td>
              </tr>
            ))}
          </tbody>
        </Table>

      </div>
    </Container>
  );
}

export default HomeAposLogin;