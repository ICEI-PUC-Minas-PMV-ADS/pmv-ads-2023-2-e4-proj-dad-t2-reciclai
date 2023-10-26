import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './styles/Header.module.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useUser } from "../contexts/UserContext";


const Header = () => {
  const { signed } = useUser();

  return (

    <Navbar expand="lg" className={styles.navbar}>
      <Container>
        <Navbar.Brand as={Link} to={"/"} className={styles.link}>Reciclaí</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
        {signed ?
          <Nav className="me-auto">
           <Nav.Link as={Link} to={"/aposlogin"} className={styles.link}>Home</Nav.Link>
            <Nav.Link as={Link} to={"/sobre"} className={styles.link}>Sobre</Nav.Link>
            <Nav.Link as={Link} to={"/perfil"} className={styles.link}><AccountCircleIcon /></Nav.Link>
            </Nav>:
            <Nav className="me-auto">
            <Nav.Link as={Link} to={"/"} className={styles.link}>Home</Nav.Link>
          <Nav.Link as={Link} to={"/cadastro"} className={styles.link}>Cadastre-se</Nav.Link>
          <Nav.Link as={Link} to={"/sobre"} className={styles.link}>Sobre</Nav.Link>
          <Nav.Link as={Link} to={"/perfil"} className={styles.link}>Perfil Usuário</Nav.Link>
          <Nav.Link as={Link} to={"/login"} className={styles.link}><LoginIcon/></Nav.Link>
          </Nav>
        }          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;