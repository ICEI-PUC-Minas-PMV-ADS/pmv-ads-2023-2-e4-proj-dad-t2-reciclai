import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import styles from './styles/HomeAposLogin.module.css';
import Table from 'react-bootstrap/Table';
import { BASE_URL } from '../services/Urls';
import API from '../services/Api.services';



const HomeAposLogin = () => {

  const [data, setData] = useState([]);


   const getPedidos = async () => {
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



  useEffect(() => {
    async function fetchPedidos() {
      const data = await getPedidos();
      if (data) {
        setData(data);
      }
    }
    fetchPedidos();
  }, [data]);


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
            {data.map((pedidos) => (
              <tr key={pedidos.id}>
                <td>{pedidos.id}</td>
                <td>{pedidos.nomeSolicitante}</td>
                <td>{pedidos.dataColeta}</td>
                <td>{pedidos.tipoLixo}</td>
                <td>{pedidos.qtdeLixo}</td>
              </tr>
            ))}
          </tbody>
        </Table>

      </div>
    </Container>
  );
}

export default HomeAposLogin;