import Navegacion from "./Navegacion";
import Footer from "./Footer";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useContext } from "react";
import { CarritoContext } from "./CarritoContext";
import Carrito from "./Carrito";

function Layout({ children, mostrarCarrito, toggleCarrito }) {
  const { carrito } = useContext(CarritoContext); 
  const layoutStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  };

  const contentStyle = {
    flex: 1,
  };

  return (
    <div style={layoutStyle}>
      <Navegacion carrito={carrito} toggleCarrito={toggleCarrito} />
      <div style={contentStyle}>{children}</div>
      <Footer />

      <Offcanvas show={mostrarCarrito} onHide={toggleCarrito} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Carrito</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Carrito/>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default Layout;
