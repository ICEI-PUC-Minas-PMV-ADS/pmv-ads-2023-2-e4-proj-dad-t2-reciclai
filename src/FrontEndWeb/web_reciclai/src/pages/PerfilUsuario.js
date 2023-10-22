import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Container, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getUsuario } from '../services/Usuarios.services.js';

const PerfilUsuario = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [endereco, setEndereco] = useState('');
  const [perfil, setPerfil] = useState('');
  const [tipoLixo, setTipoLixo] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsuario();
  }, []);

  async function fetchUsuario() {
    try {
      const res = await getUsuario();
      setNome(res.nome);
      setEmail(res.email);
      setEndereco(res.endereco);
      setPerfil(res.perfil);
      setTipoLixo(res.tipoLixo);
    } catch (error) {
      console.error('Erro ao buscar informações do usuário:', error);
    }
  }

  const handleEditar = () => {
    navigate('/cadastro');
  };

  const handleExcluir = () => {
  };

  return (
    <Container>
      <Card body outline color="success" className="mx-auto my-5" style={{ width: '50rem' }}>
        <Card.Body>
          <Card.Title>Perfil do Usuário</Card.Title>
          <Card.Text>Nome: {nome}</Card.Text>
          <Card.Text>Email: {email}</Card.Text>
          <Card.Text>Endereço: {endereco}</Card.Text>
          <Card.Text>Perfil: {perfil}</Card.Text>
          <Card.Text>Tipo de Lixo: {tipoLixo}</Card.Text>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <Button variant="primary" onClick={handleEditar}>
              Editar
            </Button>
            <Button variant="outline-danger" onClick={handleExcluir}>
              Excluir
            </Button>
          </Stack>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PerfilUsuario;