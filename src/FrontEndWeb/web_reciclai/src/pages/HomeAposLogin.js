import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import styles from './styles/HomeAposLogin.module.css';
import { getTodosPedidos } from '../services/Pedidos.services';
import { Table, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Stack } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';



const HomeAposLogin = () => {
  const navigate = useNavigate();
  const { userId } = useUser();
  const [data, setData] = useState([]);
  
  useEffect(() => {
    async function fetchPedidos() {
      const data = await getTodosPedidos();
      if (data) {
        let PedidosUsuario = [];
        PedidosUsuario = data.filter((pedido)=> pedido.idSolicitante === userId);
        setData(PedidosUsuario);
        console.log(data);
      }
    }
    fetchPedidos();
  }, []);

  async function redirecionar (){
    navigate('/perfil')
  }

 

  return (
    <Container>

    <div>
        <h5 className={styles.titulo}>Histórico de pedidos:</h5>
        <TableContainer component={Paper} className={styles.table}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Id</TableCell>
                <TableCell align="left">Nome</TableCell>
                <TableCell align="left">Data Coleta</TableCell>
                <TableCell align="left">Tipo de Lixo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((pedido) => (
                <TableRow
                  key={pedido.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left">{pedido.id}</TableCell>
                  <TableCell align="left">{pedido.nomeSolicitante}</TableCell>
                  <TableCell align="left">{pedido.dataColeta}</TableCell>
                  <TableCell align="left">{pedido.tipoLixo}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Container>
  );
}

export default HomeAposLogin;