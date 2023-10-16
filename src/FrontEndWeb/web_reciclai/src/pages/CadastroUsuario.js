import React, {useState} from 'react';
import { TextField, Button, Container, Stack } from '@mui/material';
import { Link } from "react-router-dom";
import styles from './CadastroUsuario.module.css';
 
 

const CadastroUsuario = () => {



  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [endereco, setEndereco] = useState('');
  const [perfil, setPerfil] = useState('');
  const [tipoLixo, setTipoLixo] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    console.log(nome, email, senha, endereco) 
}

  return (
    <React.Fragment>
      <Container>
    <h2 className={styles.form}>Cadastro de Usuário</h2>
    <form onSubmit={handleSubmit} action={<Link to="/" />}>
        
            <TextField
                type="text"
                variant='standard'
                color='secondary'
                label="Nome:"
                onChange={e => setNome(e.target.value)}
                value={nome}
                fullWidth
                required
                sx={{mb: 4}}
            />
            <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
            <TextField
                type="email"
                variant='standard'
                color='secondary'
                label="Email:"
                onChange={e => setEmail(e.target.value)}
                value={email}
                fullWidth
                required
            />
             <TextField
            type="password"
            variant='standard'
            color='secondary'
            label="Senha"
            onChange={e => setSenha(e.target.value)}
            value={senha}
            required
            fullWidth
            sx={{mb: 4}}
        />
        </Stack>
             
          <TextField
            type="text"
            variant='standard'
            color='secondary'
            label="Endereço"
            onChange={e => setEndereco(e.target.value)}
            value={endereco}
            fullWidth
            required
            sx={{mb: 4}}
        />
    
        <Button variant="contained"  type="submit">Cadastrar</Button>
    </form>
    </Container>
</React.Fragment>
  );
};

export default CadastroUsuario;