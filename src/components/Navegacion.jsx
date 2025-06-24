import { Navbar, Nav, NavDropdown, Container, Button, Badge } from "react-bootstrap";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import logo from '../assets/beauty-store-logo.png'
import { CarritoContext } from "./CarritoContext";

function Navegacion({ toggleCarrito }) {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("auth") === "true";
  const { carrito } = useContext(CarritoContext);

  const cantidadTotalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  const cerrarSesion = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };


  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            alt="Logo"
            height={50}
            style={{ objectFit: 'contain', display: 'block' }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <NavDropdown title="Productos" id="productos-dropdown">
              <NavDropdown.Item as={Link} to="/productos/beauty">Beauty</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/productos/skin-care">Skin care</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/productos/fragrances">Fragancias</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/nosotros">Nosotros</Nav.Link>
            <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
            {isAuth && (
              <>
                <Nav.Link as={Link} to="/administracion">Administracion</Nav.Link>
              </>
            )}
          </Nav>

          <Nav>
            {!isAuth ? (
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            ) : (
              <Button variant="outline-danger" onClick={cerrarSesion}>Cerrar sesión</Button>
            )}
          </Nav>
          </Navbar.Collapse>

          <Nav>

            <Nav.Link onClick={toggleCarrito} style={{ cursor: "pointer", position: "relative" }}>
              <FaShoppingCart />
              {cantidadTotalItems > 0 && (
                <Badge
                  pill
                  bg="danger"
                  style={{
                    position: "absolute",
                    top: "5px",
                    right: "-5px",
                    fontSize: "0.6rem"
                  }}
                >
                  {cantidadTotalItems}
                </Badge>
              )}
            </Nav.Link>
          </Nav>

      </Container>
    </Navbar>
  );
}

export default Navegacion;
