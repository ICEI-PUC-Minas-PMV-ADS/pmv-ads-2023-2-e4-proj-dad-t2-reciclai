import { useState, useEffect } from 'react';
import {Carousel, Stack, Container,Button,Form} from 'react-bootstrap';
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

    </><Form>
        <Container>
          <fieldset>
            <h5 className={styles.Home}>Deixe Seu Comentário</h5>
            <form onSubmit={(event) => handleSubmit(event)} action={<Link to="/" />}>

            </form>
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="TextInput"></Form.Label>
              <Form.Control id="nome" placeholder="Nome:" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="TextInput"></Form.Label>
              <Form.Control id="mensagem" placeholder="Comentário:" />
            </Form.Group>
          <Form.Group className="mb-3">
          </Form.Group>
          </Stack>
          <Button type="submit">Enviar</Button>
        </fieldset>
      </Container>
    </Form ></>
  );
}

export default Home;

