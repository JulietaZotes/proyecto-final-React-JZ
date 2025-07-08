import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { CarritoContext } from "../components/CarritoContext";


function Productos() {
    const { agregarAlCarrito } = useContext(CarritoContext);
    const { categoria } = useParams();
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            .catch(err => {
                setError(err.message);
                toast.error("No se pudieron cargar los productos");
                console.error("Error al cargar los productos de la API", err);
            })
            .finally(() => setLoading(false));
    }, [categoria]);

    return (
        <>
            {loading ? (
                <div
                    style={{
                        minHeight: "100vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Spinner animation="border" />
                </div>
            ) : productos.length > 0 ? (
                <Container className="mt-4">
                    <h2 className="mb-4 text-capitalize text-center">{categoria}</h2>
                    <Row>
                        {productos.map(producto => (
                            <Col key={producto.id} sm={6} md={4} lg={3} className="mb-4">
                                <Card>
                                    <Card.Img variant="top" src={producto.thumbnail} />
                                    <Card.Body>
                                        <Card.Title style={{
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis"
                                        }}>
                                            {producto.title}
                                        </Card.Title>
                                        <Card.Text>${producto.price}</Card.Text>
                                        <Button className="w-100" variant="dark" onClick={() => agregarAlCarrito(producto)}
                                        >Agregar al carrito</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            ) : null}
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    )
}

export default Productos;