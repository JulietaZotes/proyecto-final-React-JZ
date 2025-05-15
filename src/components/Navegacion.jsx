import { Navbar, Nav, NavDropdown, Container, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

function Navegacion({ carrito, toggleCarrito }) {
  const cantidadTotal = carrito.reduce((acc, item) => acc + (item.cantidad || 1), 0);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Mi eCommerce</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <NavDropdown title="Productos" id="productos-dropdown">
              <NavDropdown.Item as={Link} to="/productos/beauty">Beauty</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/productos/skin-care">Skin care</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/productos/fragrances">Fragancias</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/nosotros">Nosotros</Nav.Link>
            <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={toggleCarrito} style={{ cursor: "pointer" }}>
              <FaShoppingCart />
              {cantidadTotal > 0 && (
                <Badge pill bg="danger" className="ms-1">
                  {cantidadTotal}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navegacion;
