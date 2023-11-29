import React, { useState, useEffect } from 'react';
import { Container, Modal, Button } from 'react-bootstrap';
import styles from './styles/HomeAposLogin.module.css';
import { getTodosPedidos, updatePedidos } from '../services/Pedidos.services';
import { getUsuario, enviarEmail } from '../services/Usuarios.services';
import { Table, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Radio, FormLabel } from '@mui/material';
import { Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';



const HomeAposLogin = () => {
  const navigate = useNavigate();
  const { userId, userPerfil } = useUser();
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [pedidoSelecionado, setPedidoSelecionado] = useState({
    id: null,
    nomeSolicitante: '',
    dataColeta: '',
    tipoLixo: null,
    qtdLixo: null,
    endereco: '',
    descricao: '',
    status: null
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const selecionarPedido = (pedido) => {
    setPedidoSelecionado(pedido)
    handleShow();
  }

  const Status =
    [
      'Processando',
      'Pedido Aceito',
      'Pedido Cancelado'
    ]

  const TipoLixo =
    [
      'Eletrodomestico',
      'Eletroportateis',
      'Monitores',
      'Iluminação',
      'Fios e cabos',
      'Pilhas e baterias',
      'TI e telecomunicações',
      'Painéis Fotovoltaicos'
    ];

  useEffect(() => {
    async function fetchPedidos() {
      const data = await getTodosPedidos();
      if (data) {

        // let PedidosUsuario = [];
        let PedidosUsuario = data.filter((pedido) => pedido.idSolicitante == userId || pedido.idColetor == userId);
        setData(PedidosUsuario);
        console.log(PedidosUsuario);
      }
    }
    async function editarPedido() {
      await updatePedidos(pedidoSelecionado.id).then(item => {
        if (item) {
          setPedidoSelecionado(item.pedidoSelecionado);
        }
      })
    }
    fetchPedidos();
    editarPedido();
  });


  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  async function postEmail(email) {
    await enviarEmail({
      "email": email,
      "perfil": 1
    });
  }

  async function handleAceitar(event) {
    event.preventDefault();
    if (pedidoSelecionado.id) {
      await updatePedidos({
        "id": pedidoSelecionado.id,
        "idSolicitante": pedidoSelecionado.idSolicitante,
        "idColetor": pedidoSelecionado.idColetor,
        "nomeSolicitante": pedidoSelecionado.nomeSolicitante,
        "dataColeta": pedidoSelecionado.dataColeta,
        "endereco": pedidoSelecionado.endereco,
        "lixoPerigoso": pedidoSelecionado.lixoPerigoso,
        "descricao": pedidoSelecionado.descricao,
        "tipoLixo": pedidoSelecionado.tipoLixo,
        "status": 1,
      });

      const idEmail = pedidoSelecionado.idSolicitante;
      const sendEmail = await getUsuario(idEmail);
      const emailSolicitante = sendEmail.email;

      postEmail(emailSolicitante);

      alert('O pedido foi aceito com sucesso!');
      navigate(0);
    }
  }

  async function handleCancelar(event) {
    event.preventDefault();
    if (pedidoSelecionado.id) {
      await updatePedidos({
        "id": pedidoSelecionado.id,
        "idSolicitante": pedidoSelecionado.idSolicitante,
        "idColetor": pedidoSelecionado.idColetor,
        "nomeSolicitante": pedidoSelecionado.nomeSolicitante,
        "dataColeta": pedidoSelecionado.dataColeta,
        "endereco": pedidoSelecionado.endereco,
        "lixoPerigoso": pedidoSelecionado.lixoPerigoso,
        "descricao": pedidoSelecionado.descricao,
        "tipoLixo": pedidoSelecionado.tipoLixo,
        "status": 2,
      });

      const idEmail = pedidoSelecionado.idSolicitante;
      const sendEmail = await getUsuario(idEmail);
      const emailSolicitante = sendEmail.email;

      postEmail(emailSolicitante);

      alert('O pedido foi cancelado com sucesso!');
      navigate(0);
    }
  }

  return (
    <Container>

      <div>
        {userPerfil === 0 ?
          <h5 className={styles.titulo}>Histórico de pedidos:</h5>
          :
          <h5 className={styles.titulo}>Histórico de coletas:</h5>
        }

        <Form inline>
          <Row className={styles.row} >
            <Col xs="auto">
              <Form.Control
                type="text"
                placeholder="Pesquisar pedido"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </Col>
            <Col xs="auto">
            <Radio
                checked={selectedValue === ''}
                onChange={handleChange}
                value=''
                name="radio-buttons"
                inputProps={{ 'aria-label': 'todos' }}
              />
              <FormLabel id="demo-controlled-radio-buttons-group">Todos</FormLabel>
              <Radio
                checked={selectedValue === '1'}
                onChange={handleChange}
                value='1'
                name="radio-buttons"
                inputProps={{ 'aria-label': 'aceito' }}
              />
              <FormLabel id="demo-controlled-radio-buttons-group">Aceitos</FormLabel>
              <Radio
                checked={selectedValue === '2'}
                onChange={handleChange}
                value='2'
                name="radio-buttons"
                inputProps={{ 'aria-label': 'cancelado' }}
              />
              <FormLabel id="demo-controlled-radio-buttons-group">Cancelados</FormLabel>
            </Col>
          </Row>
        </Form>
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
              {data
                .filter((pedido) =>
                 
                  pedido.id.toString().includes(searchInput.toLowerCase()) &&
                  pedido.status.toString().includes(selectedValue)
                )
                .map((pedido) => (
                  <TableRow
                    key={pedido.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="left">{pedido.id}</TableCell>
                    <TableCell align="left">{pedido.nomeSolicitante}</TableCell>
                    <TableCell align="left">{pedido.dataColeta}</TableCell>
                    <TableCell align="left">
                      <Button onClick={() => selecionarPedido(pedido)} className={styles.botao}>Visualizar</Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Modal show={show} onHide={handleClose} >
          <Modal.Header closeButton>
            <Modal.Title>Número do Pedido: {pedidoSelecionado.id} </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Nome: {pedidoSelecionado.nomeSolicitante}</p>
            <p>Data da Coleta: {pedidoSelecionado.dataColeta}</p>
            <p>Tipo de Lixo: {TipoLixo[pedidoSelecionado.tipoLixo]}</p>
            <p>Quantidade de Lixo: {pedidoSelecionado.qtdLixo}</p>
            <p>Descrição: {pedidoSelecionado.descricao}</p>
            <p>Endereço: {pedidoSelecionado.endereco} </p>
            <p>Status: {Status[pedidoSelecionado.status]}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Fechar
            </Button>
            {userPerfil === 1 ?
              <Button className={styles.botao} onClick={handleAceitar}>
                Aceitar
              </Button>
              :
              <></>
            }


            <Button variant="outline-danger" onClick={handleCancelar}>
              Cancelar
            </Button>




          </Modal.Footer>
        </Modal>

      </div>
    </Container>
  );
}

export default HomeAposLogin;