import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function PerfilUsuario() {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Perfil Usuario</Form.Label>
        <Form.Control type="email" placeholder="Nome Usuário" />
        <Form.Text className="text-muted">
         
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email </Form.Label>
        <Form.Control type="email" placeholder="Email Entrar" />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Senha</Form.Label>
        <Form.Control type="Senha" placeholder="Senha" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label />
      </Form.Group>
      <Button variant="primary" type="Atualizar">
        Atualizar
      </Button>
    </Form>
  );
}

export default PerfilUsuario;