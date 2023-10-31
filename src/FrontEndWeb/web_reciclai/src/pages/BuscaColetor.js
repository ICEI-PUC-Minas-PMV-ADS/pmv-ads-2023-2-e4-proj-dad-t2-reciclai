import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import styles from './styles/HomeAposLogin.module.css';
import { getTodosUsuarios } from '../services/Usuarios.services';
import {
  Table,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import Buscastyles from './styles/Busca.module.css';
import { Link } from 'react-router-dom';

const BuscaColetor = () => {
  const navigate = useNavigate();
  const { userId } = useUser();
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    async function fetchUsuarios() {
      const usuarios = await getTodosUsuarios();
      if (usuarios) {
        const coletores = usuarios.filter((usuario) => usuario.perfil === 1);
        setData(coletores);
      }
    }
    fetchUsuarios();
  }, [userId]);

  const redirecionar = () => {
    navigate('/perfil');
  };

  const handleSubmit = (index) => {
    navigate(`/formulario`, {state:data[index]});
    console.log(data[index]);
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
                  className={Buscastyles.search}
                  type="text"
                  placeholder="Buscar coletores"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </Col>
            </Row>
          </Form>
          <TableContainer component={Paper} className={styles.table}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Id</TableCell>
                  <TableCell align="left">Nome</TableCell>
                  <TableCell align="left">E-mail</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  .filter((usuario) =>
                    usuario.nome.toLowerCase().includes(searchInput.toLowerCase())
                  )
                  .map((usuario, index) => (
                    <TableRow
                      key={usuario.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="left">{usuario.id}</TableCell>
                      <TableCell align="left">{usuario.nome}</TableCell>
                      <TableCell align="left">{usuario.email}</TableCell>
                      <TableCell align="left">
                        <Button onClick={() => handleSubmit(index)}>Selecionar Coletor</Button>
                      </TableCell>
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
