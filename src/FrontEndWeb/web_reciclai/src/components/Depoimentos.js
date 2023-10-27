import React, { useState, useEffect } from 'react';
import { Container, Card, Col, Row } from 'react-bootstrap';
import { getOpiniaoUsuarios } from '../services/OpiniaoUsuario.services';

function Depoimentos() {
  const [depoimentos, setDepoimentos] = useState([]);

  useEffect(() => {
    async function fetchDepoimentos() {
      const data = await getOpiniaoUsuarios();
      if (data) {
        setDepoimentos(data);
      }
    }
    fetchDepoimentos();
  }, []);

  const limitarCaracteres = (texto, limite) => {
    if (texto.length <= limite) {
      return texto;
    } else {
      return texto.slice(0, limite) + '...'; 
    }
  };
  
  return (
    <Container>
      <Container className="containerHome">
      <h6 >Depoimentos:</h6>
      </Container>
      <Row xs={1} md={3} className="g-3">
        {depoimentos.map((depoimento, idx) => (
          <Col key={idx}>
            <Card body outline color="success" className="mx-auto my-5">
              <Card.Body style={{ height: '150px' }}>
                <Card.Title>{depoimento.nome}</Card.Title>
                <Card.Text style={{ whiteSpace: 'pre-line' }}>
                  {limitarCaracteres(depoimento.mensagem, 150)}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Depoimentos;