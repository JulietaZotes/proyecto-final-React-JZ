import { useContext } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { CarritoContext } from './CarritoContext'; // Ajustá el path si es necesario

function Carrito() {
  const { carrito, eliminarDelCarrito, vaciarCarrito } = useContext(CarritoContext);

  const total = carrito.reduce((acc, item) => acc + Number(item.price) * item.cantidad, 0);

  if (carrito.length === 0) {
    return (
      <Container className="mt-4">
        <p>Tu carrito está vacío</p>
      </Container>
    );
  }

  return (
    <Container>
      {carrito.map((item) => (
        <Row key={item.id} className="my-3 align-items-center border-bottom pb-3">
          <Col xs={4} md={2}>
            <img
              src={item.thumbnail}
              alt={item.title}
              style={{ width: '100%', borderRadius: '8px', objectFit: 'cover' }}
            />
          </Col>
          <Col xs={8} md={7}>
            <strong>{item.title}</strong>
            <p className="mb-1">Cantidad: {item.cantidad}</p>
            <p className="mb-0">Total: ${item.price * item.cantidad}</p>
          </Col>
          <Col xs={12} md={3} className="mt-2 mt-md-0 text-md-end">
            <Button
              variant="danger"
              size="sm"
              onClick={() => eliminarDelCarrito(item.id)}
            >
              Eliminar
            </Button>
          </Col>
        </Row>
      ))}
      <div className="d-flex justify-content-between align-items-center mt-3">
  <Button variant="outline-danger" onClick={vaciarCarrito}>Vaciar carrito</Button>
  <h5>Total a pagar: ${total.toFixed(2)}</h5>
</div>
    </Container>
  );
}

export default Carrito;
