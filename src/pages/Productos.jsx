import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Card, Button, Spinner, Alert } from "react-bootstrap";
import { CarritoContext } from "../components/CarritoContext";
import Buscador from "../components/Buscador";
import { toast } from 'react-toastify';


function Productos() {
  const { agregarAlCarrito } = useContext(CarritoContext);
  const { categoria } = useParams();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    document.title = `${categoria} | Beauty Store`;
  }, [categoria]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`https://dummyjson.com/products/category/${categoria}`)
      .then(res => res.json())
      .then(data => {
        if (!data.products || data.products.length === 0) {
          throw new Error("La categoría no existe o no contiene productos.");
        }
        setProductos(data.products);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [categoria]);

  const productosFiltrados = productos.filter(p =>
    p.title.toLowerCase().includes(busqueda.toLowerCase())
  );

  useEffect(() => {
    if (error) {
      toast.error("Error al cargar los productos. Intente nuevamente");
    }
  }, [error]);

  return (
    <Container className="mt-4">
      <Buscador busqueda={busqueda} setBusqueda={setBusqueda} />

      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
          <Spinner animation="border" />
        </div>

      ) : (
        <Row>
          {productosFiltrados.length === 0 ? (
            <p>No se encontraron productos.</p>
          ) : (
            productosFiltrados.map(producto => (
              <Col key={producto.id} md={4} className="mb-4">
                <Card>
                  <Card.Img variant="top" src={producto.thumbnail} style={{ height: "200px", objectFit: "contain" }} />
                  <Card.Body>
                    <Card.Title style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis"
                    }}
                    >{producto.title}
                    </Card.Title>
                    <Card.Text>${producto.price}</Card.Text>
                    <Button className="w-100" variant="dark" onClick={() => agregarAlCarrito(producto)}>
                      Agregar al carrito
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      )}
    </Container>
  );
}

export default Productos;