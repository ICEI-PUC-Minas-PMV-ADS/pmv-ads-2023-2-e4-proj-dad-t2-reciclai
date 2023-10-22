import { useState, useEffect } from 'react';
import { Carousel, Container, Button, Form, Row, Col } from 'react-bootstrap';
import Natureza from "../img/Natureza.jpg";
import Eletronico from "../img/Eletronico.jpg";
import People from "../img/people.png";
import Depoimentos from '../components/Depoimentos';
import { insertOpiniaoUsuarios } from '../services/OpiniaoUsuario.services';
import { useNavigate, Link } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    async function postUser() {
      const item = await insertOpiniaoUsuarios();
      if (item) {
        setNome(item.nome);
        setMensagem(item.mensagem);
      }
    }
    postUser();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    await insertOpiniaoUsuarios({
      "nome": nome,
      "mensagem": mensagem,
    },
    navigate('/sobre'));
  }

  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Natureza}
            alt="Firt slide"
            width={300}
            height={500}
          />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={People}
            alt="Second slide"
            width={300}
            height={500}
          />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Eletronico}
            alt="Third slide"
            width={300}
            height={500}
          />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <Depoimentos />

      <Container>
        <Form onSubmit={(event) => handleSubmit(event)} action={<Link to="/sobre" />}>
          <Row className="mb-3 align-items-center">
            <Col sm={3} className="my-1">
              <Form.Group as={Col}>
                <Form.Control
                  type="text"
                  placeholder="Nome"
                  onChange={(e) => setNome(e.target.value)}
                  value={nome}
                />
              </Form.Group>
            </Col>
            <Col sm={8} className="my-1">
              <Form.Group as={Col}>
                <Form.Control
                  placeholder="Deixe Seu Comentário Sobre o Reciclaí"
                  onChange={(e) => setMensagem(e.target.value)}
                  value={mensagem}
                />
              </Form.Group>
            </Col>
            <Col sm={1} className="my-1">
              <Button type="submit">Enviar</Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default Home;
