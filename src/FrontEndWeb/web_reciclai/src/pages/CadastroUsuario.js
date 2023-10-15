import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useState } from "react";
import styles from './CadastroUsuario.module.css'


const CadastroUsuario = () => {



  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [endereco, setEndereco] = useState('');
  const [perfil, setPerfil] = useState('');
  const [tipoLixo, setTipoLixo] = useState('');


  return (
<Container>   
<div class="d-flex justify-content-center">
      <Col sm="6">
        <h2>Cadastro de Usuário</h2>
    <Form className={styles.form}>
    <Form.Group className="mb-3"  controlId="exampleForm.ControlInput1" >
    <div class="d-flex justify-content-start">
      <Form.Label className={styles.label}>Nome: </Form.Label>
      </div>
      <Form.Control 
      type="name" 
      placeholder="Digite seu nome" 
      value={nome}
      onChangeText={(text) => setNome(text)}
       />
    </Form.Group>
    <Form.Group className="mb-3"  controlId="exampleForm.ControlInput1">
    <div class="d-flex justify-content-start">
      <Form.Label className={styles.label}>Email: </Form.Label>
      </div>
      <Form.Control 
      type="email" 
      placeholder="name@example.com"
      value={email}
      onChangeText={(text) => setEmail(text)}
       />
    </Form.Group>
    <div class="d-flex justify-content-start">
    <Form.Label htmlFor="inputPassword5" className={styles.label}>Senha: </Form.Label>
    </div>
      <Form.Control
        type="password"
        id="inputPassword5"
        aria-describedby="passwordHelpBlock"
        value={senha}
        onChangeText={(text) => setSenha(text)}
      />
    <Form.Group controlId="exampleForm.ControlTextarea1">
    <div class="d-flex justify-content-start">
      <Form.Label className={styles.label}>Endereço: </Form.Label>
      </div>
      <Form.Control 
      as="textarea" 
      rows={3} 
      value={endereco}
      onChangeText={(text) => setEndereco(text)}
      />
    </Form.Group>
  </Form>
  <Form.Select aria-label="Default select example" className={styles.select}>
      <option>Perfil</option>
      <option value="0">Solicitante</option>
      <option value="1">Coletor</option>  
  </Form.Select>
    <Form.Select aria-label="Default select example" className={styles.select}>
      <option>Tipo de lixo</option>
      <option value="0">Eletrodoméstico</option>
      <option value="1">letroportáteis</option>
      <option value="2">Monitores</option>
      <option value="3">Iluminação</option>
      <option value="4">Fios e cabos</option>
      <option value="5">Pilhas e baterias</option>
      <option value="6">TI e telecomunicações</option>
      <option value="7">Painéis fotovoltaicos</option>
    </Form.Select>
    <div class="justify-content-center">
    <Row>
      <Col sm="4">
    <Button 
    variant="secondary" 
    className={styles.button}
    onPress={console.log('salvar')}>Cadastrar</Button>
    </Col>
    <Col sm="4">
    <Button 
    variant="secondary" 
    className={styles.button}
    onPress={console.log('voltar')}>Voltar</Button>
    </Col>
    </Row>
    </div>
    </Col>
    </div>
    </Container>
  );
};

export default CadastroUsuario;