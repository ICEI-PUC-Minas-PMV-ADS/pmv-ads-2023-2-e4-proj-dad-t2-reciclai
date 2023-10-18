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
       
        <Form.Control type="email" placeholder="Email" />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword"> 
           
        <Form.Control type="Endereço" placeholder="Endereço" />
        <Form.Label> </Form.Label>       
        <Form.Control type="Perfil" placeholder="Perfil" />
        <Form.Label> </Form.Label>       
        <Form.Control type="Tipo de lixo" placeholder="Tipo de lixo" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label />
      </Form.Group>
      <Button variant="primary" type="Editar">
        Editar        
      </Button>
      
    </Form>
  );
}

export default PerfilUsuario;