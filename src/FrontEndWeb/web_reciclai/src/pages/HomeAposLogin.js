import React, { useState, useEffect } from 'react';
import { Container, Modal, Button } from 'react-bootstrap';
import styles from './styles/HomeAposLogin.module.css';
import { getTodosPedidos } from '../services/Pedidos.services';
import { Table, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';



const HomeAposLogin = () => {
  const navigate = useNavigate();
  const { userId } = useUser();
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    async function fetchPedidos() {
      const data = await getTodosPedidos();
      if (data) {
        let PedidosUsuario = [];
        PedidosUsuario = data.filter((pedido) => pedido.idSolicitante === userId);
        setData(PedidosUsuario);
        console.log(data);
      }
    }
    fetchPedidos();
  }, []);


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
                <TableCell align="left">Operação</TableCell>
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
                  <TableCell align="left">
                    <Button onClick={handleShow}>Visualizar</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Modal show={show} onHide={handleClose} >
          <Modal.Header closeButton>
            <Modal.Title>Pedido: </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Nome:</p>
            <p>Data da Coleta: </p>
            <p>Tipo de Lixo:</p>
            <p>Quantidade de Lixo:</p>
            <p>Descrição:</p>
            <p>Endereço: </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Fechar
            </Button>
            <Button variant="danger" onClick={handleClose}>
              Cancelar Pedido
            </Button>
          </Modal.Footer>
        </Modal>

      </div>
    </Container>
  );
}

export default HomeAposLogin;