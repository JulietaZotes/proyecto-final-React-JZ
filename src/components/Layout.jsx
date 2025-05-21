import Navegacion from "./Navegacion";
import Footer from "./Footer";
import Offcanvas from "react-bootstrap/Offcanvas";

function Layout({ children, carrito, mostrarCarrito, toggleCarrito }) {
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
          {carrito.length === 0 ? (
    <p>No hay productos en el carrito.</p>
  ) : (
    carrito.map((item) => (
      <div key={item.id} style={{ display: "flex", marginBottom: "1rem", alignItems: "center" }}>
        <img 
          src={item.thumbnail} 
          alt={item.title}
          style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "8px", marginRight: "10px" }}
        />
        <div>
          <strong style={{ fontSize: "0.95rem" }}>{item.title}</strong>
          <p style={{ margin: 0 }}>Cantidad: {item.cantidad || 1}</p>
          <p style={{ margin: 0 }}>Precio: ${item.price}</p>
        </div>
      </div>
    ))
  )}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default Layout;
