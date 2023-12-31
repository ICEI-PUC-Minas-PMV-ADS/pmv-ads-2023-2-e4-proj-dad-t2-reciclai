import React, { useState, useEffect } from 'react';
import { Container, Stack, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Link, useParams } from "react-router-dom";
import styles from './styles/CadastroUsuario.module.css';
import Input from '../components/Input.js';
import Botao from '../components/Button.js';
import { updateUsuarios, getUsuario } from '../services/Usuarios.services.js';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext.js';



const CadastroUsuario = () => {
  const parametros = useParams();
  const { userId } = useUser();
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [endereco, setEndereco] = useState('');
  const [estado, setEstado] = useState('');
  const [perfil, setPerfil] = useState();
  const [tipoLixo, setTipoLixo] = useState();



  useEffect(() => {
    async function fetchUser() {
      const user = await getUsuario(userId);
      setNome(user.nome);
      setEmail(user.email);
      setEndereco(user.endereco);
      setEstado(user.estado);
      setPerfil(user.perfil);
      setTipoLixo(user.tipoLixo);
    }
    fetchUser();
    }, []);

  const handleChangePerfil = (e) => {
    setPerfil(e.target.value);
  }
  const handleChangeTipoLixo = (e) => {
    setTipoLixo(e.target.value);
  }

  const handleChangeNome = (e) => {
    setNome(e.target.value);
}

const handleChangeEmail = (e) => {
  setEmail(e.target.value);
}

const handleChangeEndereco = (e) => {
  setEndereco(e.target.value);
}

const handleChangeEstado = (e) => {
  setEstado(e.target.value);
}

  async function handleSubmit(event) {
    event.preventDefault();
    if (parametros.id) {
      await updateUsuarios({
        "id": parametros.id,
        "nome": nome,
        "email": email,
        "senha": senha,
        "endereco": endereco,
        "estado": estado,
        "perfil": perfil,
        "tipoLixo": tipoLixo
      },
        navigate('/aposlogin'));
    }
  }



  return (
    <React.Fragment>
      <Container>
        <h2 className={styles.form}>Editar Cadastro</h2>

        <form onSubmit={(event) => handleSubmit(event)} action={<Link to="/" />}>

          <Input
            type="text"
            label="Nome: "
            onChange={handleChangeNome}
            value={nome}
            required
            sx={{ mb: 4 }}
          />
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <Input
              type="email"
              label="Email:"
              onChange={handleChangeEmail}
              value={email}
              required
            />
            <Input
              type="password"
              label="Senha"
              onChange={e => setSenha(e.target.value)}
              value={senha}
              required
              sx={{ mb: 4 }}
            />
          </Stack>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <Input
              type="text"
              label="Endereço:"
              onChange={handleChangeEndereco}
              value={endereco}
              required
              sx={{ mb: 4 }}
            />
            <FormControl variant="standard" sx={{ mb: 4 }} fullWidth>
              <InputLabel id="demo-simple-select-standard-label">Estado</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={estado}
                onChange={handleChangeEstado}
                label="Estado"
              >
                <MenuItem value="Acre">Acre</MenuItem>
                <MenuItem value="Alagoas">Alagoas</MenuItem>
                <MenuItem value="Amapá">Amapá</MenuItem>
                <MenuItem value="Amazonas">Amazonas</MenuItem>
                <MenuItem value="Bahia">Bahia</MenuItem>
                <MenuItem value="Ceará">Ceará</MenuItem>
                <MenuItem value="Distrito Federal">Distrito Federal</MenuItem>
                <MenuItem value="Espírito Santo">Espírito Santo</MenuItem>
                <MenuItem value="Goiás">Goiás</MenuItem>
                <MenuItem value="Maranhão">Maranhão</MenuItem>
                <MenuItem value="Mato Grosso">Mato Grosso</MenuItem>
                <MenuItem value="Mato Grosso do Sul">Mato Grosso do Sul</MenuItem>
                <MenuItem value="Minas Gerais">Minas Gerais</MenuItem>
                <MenuItem value="Pará">Pará</MenuItem>
                <MenuItem value="Paraíba">Paraíba</MenuItem>
                <MenuItem value="Paraná">Paraná</MenuItem>
                <MenuItem value="Pernambuco">Pernambuco</MenuItem>
                <MenuItem value="Piauí">Piauí</MenuItem>
                <MenuItem value="Rio de Janeiro">Rio de Janeiro</MenuItem>
                <MenuItem value="Rio Grande do Norte">Rio Grande do Norte</MenuItem>
                <MenuItem value="Rio Grande do Sul">Rio Grande do Sul</MenuItem>
                <MenuItem value="Rondônia">Rondônia</MenuItem>
                <MenuItem value="Roraima">Roraima</MenuItem>
                <MenuItem value="Santa Catarina">Santa Catarina</MenuItem>
                <MenuItem value="São Paulo">São Paulo</MenuItem>
                <MenuItem value="Sergipe">Sergipe</MenuItem>
                <MenuItem value="Tocantins">Tocantins</MenuItem>
              </Select>
            </FormControl>

          </Stack>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>

            <FormControl variant="standard" sx={{ mb: 4 }} fullWidth>
              <InputLabel id="demo-simple-select-standard-label">Perfil</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={perfil}
                onChange={handleChangePerfil}
                label="Perfil"
              >
                <MenuItem value={0}>Solicitante</MenuItem>
                <MenuItem value={1}>Coletor</MenuItem>
              </Select>
            </FormControl>




            <FormControl variant="standard" sx={{ mb: 4 }} fullWidth>
              <InputLabel id="demo-simple-select-standard-label">Tipo de Lixo</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={tipoLixo}
                onChange={handleChangeTipoLixo}
                label="Tipo de Lixo"
              >
                <MenuItem value={0}>Eletrodoméstico</MenuItem>
                <MenuItem value={1}>Eletroportáteis</MenuItem>
                <MenuItem value={2}>Monitores</MenuItem>
                <MenuItem value={3}>Iluminação</MenuItem>
                <MenuItem value={4}>Fios e Cabos</MenuItem>
                <MenuItem value={5}>Pilhas e baterias</MenuItem>
                <MenuItem value={6}>TI e telecomunicações</MenuItem>
                <MenuItem value={7}>Painéis Fotovoltaicos</MenuItem>
              </Select>
            </FormControl>


          </Stack>
          <Botao type="submit" className={styles.botao} >Editar</Botao>
        </form>
      </Container>
    </React.Fragment>
  );
};

export default CadastroUsuario;