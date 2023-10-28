import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Container, Stack } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { getUsuario } from '../services/Usuarios.services.js';
import { useUser } from '../contexts/UserContext.js'


const PerfilUsuario = () => {
  const {userId} = useUser();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [endereco, setEndereco] = useState('');
  const [perfil, setPerfil] = useState();
  const [tipoLixo, setTipoLixo] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsuario()
  }, [])


  async function fetchUsuario() {
    //const id = 1; //ter que passar usuarioId apos login, para testes usar usuarioId hardcoded (criar usuario)
    const res = await getUsuario(userId) 
    console.log(res)
    setNome(res.nome);
    setEmail(res.email);
    setSenha(res.senha);
    setEndereco(res.endereco);
    setPerfil(res.perfil);
    setTipoLixo(res.tipoLixo);

  };

  return (
    <React.Fragment>
      <Container>
        <Card body outline color="success" className="mx-auto my-5" style={{ width: '50rem' }}>
          <Card.Body>
            <Card.Title>{nome}</Card.Title>
            <Card.Text>
              Email: {email}
            </Card.Text>
            <Card.Text>
              Endereço: {endereco}
            </Card.Text>
            <Card.Text>
              Perfil: {perfil}
            </Card.Text>
            <Card.Text>
              Tipo de Lixo: {tipoLixo}
            </Card.Text>
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <Button variant="primary">Editar</Button>
            <Button variant="outline-danger">Excluir</Button>
            </Stack>
          </Card.Body>
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default PerfilUsuario;