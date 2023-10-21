import { useState, useEffect } from 'react';
import { Carousel, Container, Button, Form, Row, Col } from 'react-bootstrap';
import Natureza from "../img/Natureza.jpg";
import Eletronico from "../img/Eletronico.jpg";
import People from "../img/people.png";
import Depoimentos from '../components/Depoimentos'
import { insertOpiniaoUsuarios } from '../services/OpiniaoUsuario.services';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Home.module.css';


const Home = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    async function postUser() {
      await insertOpiniaoUsuarios().then(item => {
        if (item) {
          setNome(item.nome);
          setMensagem(item.mensagem);
        }
      })
    }
    postUser();
  }, []);


  async function handleSubmit(event) {
    event.preventDefault();
    await insertOpiniaoUsuarios({
      "nome": nome,
      "mensagem": mensagem,
    },
      navigate('/'));

  }
  return (
    <><><Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="d-block w-100 "
          src={Natureza}
          alt="Firt slide"
          width={300}
          height={500} />

        <Carousel.Caption
          className="d-block w-100 h-50"
        >
          <h5></h5>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={People}
          alt="Second slide"
          width={300}
          height={500} />

        <Carousel.Caption
          className="d-block" color="fff">
          <h5> </h5>
          <p> </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Eletronico}
          alt="Third slide"
          width={300}
          height={500} />

        <Carousel.Caption
          className="d-block w-100 h-50">
          <h5></h5>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
      <Depoimentos></Depoimentos>

    </><>
        <Container >
          <h8 className={styles.Home} mb-3 align-items-left >Deixe Seu Comentário</h8>
          <Form onSubmit={(event) => handleSubmit(event)} action={<Link to="/" />} >
            <Row className="mb-3 align-items-center"  >
               <Col sm={3} className="my-1">
              <Form.Group as={Col} onChange={e => setNome(e.target.value)}
                value={nome} id="nome" placeholder="Nome:">
                <Form.Control type="name" placeholder="Nome" />
              </Form.Group>
           </Col>
           <Col sm={6} className="my-1">
              <Form.Group as={Col} >
                <Form.Control onChange={e => setMensagem(e.target.value)}
                  value={mensagem} id="mensagem" placeholder="Comentário:" />
              </Form.Group>
              </Col>
            <Col sm={3} className="my-1">
            <Button type="submit">Enviar</Button>
            </Col>
            </Row>
          </Form>
        </Container>
      </></>
  );
}

export default Home;

