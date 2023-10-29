import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import styles from './styles/HomeAposLogin.module.css';
import { getTodosUsuarios } from '../services/Usuarios.services';
import {
  Table, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import { Form, Button, InputGroup, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const BuscaColetor = () => {
  const navigate = useNavigate();
  const { userId } = useUser();
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    async function fetchUsuarios() {
      const usuarios = await getTodosUsuarios();
      if (usuarios) {
        const colectores = usuarios.filter((usuario) => usuario.perfil === 1);
        setData(colectores);
      }
    }
    fetchUsuarios();
  }, [userId]);

  const handleSearch = () => {
    // Implement search functionality here
    // You can filter the data based on the searchInput and update the data state
  };

  const redirecionar = () => {
    navigate('/perfil');
  };

  return (
    <Container>
      <div>
        <h5 className={styles.titulo}>Busca de Coletores</h5>
        <div className={styles.box}>
          <Form inline>
            <Row>
              <Col xs="auto">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </Col>
              <Col xs="auto">
                <Button onClick={handleSearch}>Submit</Button>
              </Col>
            </Row>
          </Form>
          <TableContainer component={Paper} className={styles.table}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Id</TableCell>
                  <TableCell align="left">Nome</TableCell>
                  <TableCell align="left">Perfil</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((usuario) => (
                  <TableRow key={usuario.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="left">{usuario.id}</TableCell>
                    <TableCell align="left">{usuario.nome}</TableCell>
                    <TableCell align="left">{usuario.perfil}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </Container>
  );
};

export default BuscaColetor;
