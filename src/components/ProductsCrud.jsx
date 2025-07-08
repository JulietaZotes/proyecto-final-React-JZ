import { useEffect, useState } from "react";
import { Table, Button, Form, Modal, Spinner, Alert } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const API_URL = "https://686c15ae14219674dcc7325b.mockapi.io/api/products";

const ProductsCrud = () => {
    const [products, setProducts] = useState([]);
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({
        title: "",
        category: "",
        price: 0,
        thumbnail: ""
    });
    const [editId, setEditId] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const categories = ["beauty", "skin-care", "fragrances"];

    const getProducts = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch(API_URL);
            if (!res.ok) {
                throw new Error("Error al obtener productos. Intente nuevamente");
            }
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            setError(err.message);
            toast.error("No se pudieron cargar los productos");
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setShow(false);
        setForm({ title: "", category: "", price: "", thumbnail: "" });
        setEditId(null);
    };

    const handleShow = (producto) => {
        setShow(true);
        if (producto) {
            setForm({
                ...producto,
                price: Number(producto.price)
            });
            setEditId(producto.id);
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Number(form.price) <= 0) {
            toast.error("El precio debe ser mayor a 0");
            return;
        }

        const productData = {
            ...form,
            price: Number(form.price),
        };

        const method = editId ? 'PUT' : 'POST';
        const url = editId ? `${API_URL}/${editId}` : API_URL;

        try {
            await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData)
            });

            toast.success(editId ? "Producto editado correctamente" : "Producto agregado correctamente");
            handleClose();
            getProducts();
        } catch (error) {
            toast.error("Error al guardar el producto");
        }
    };

    const confirmarEliminar = (producto) => {
        setProductToDelete(producto);
        setShowConfirm(true);
    };

    const eliminarProducto = async () => {
        if (!productToDelete) return;

        try {
            await fetch(`${API_URL}/${productToDelete.id}`, { method: 'DELETE' });
            toast.success("Producto eliminado correctamente");
            getProducts();
        } catch (error) {
            toast.error("Error al eliminar el producto");
        } finally {
            setShowConfirm(false);
            setProductToDelete(null);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="mb-0">CRUD de Productos</h2>
                <Button variant="outline-success" onClick={() => handleShow()}>Agregar Producto</Button>
            </div>

            {isLoading && (
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
            )}

            {error && (
                <Alert variant="danger">
                    {error}
                </Alert>
            )}

            {!isLoading && !error && (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Precio</th>
                            <th>Categoría</th>
                            <th>Imagen</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(prod => (
                            <tr key={prod.id}>
                                <td>{prod.title}</td>
                                <td>${Number(prod.price).toFixed(2)}</td>
                                <td>{prod.category}</td>
                                <td>
                                    {prod.thumbnail && prod.thumbnail.startsWith('http') ? (
                                        <img src={prod.thumbnail} alt={prod.title} width={30} />
                                    ) : (
                                        <span>Sin imagen</span>
                                    )}
                                </td>
                                <td>
                                    <Button size="sm" variant="outline-primary" onClick={() => handleShow(prod)}>Editar</Button>{' '}
                                    <Button size="sm" variant="outline-danger" onClick={() => confirmarEliminar(prod)}>Eliminar</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{editId ? 'Editar' : 'Agregar'} Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-2">
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                value={form.title}
                                onChange={e => setForm({ ...form, title: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control
                                type="number"
                                value={form.price}
                                onChange={e => setForm({ ...form, price: Number(e.target.value) })}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Imagen (URL)</Form.Label>
                            <Form.Control
                                value={form.thumbnail}
                                onChange={e => setForm({ ...form, thumbnail: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Categoría</Form.Label>
                            <Form.Select
                                value={form.category}
                                onChange={(e) =>
                                    setForm({ ...form, category: e.target.value })
                                }
                                required
                            >
                                <option value="">Selecciona una categoría</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Button type="submit" className="mt-2" variant="outline-success">Guardar</Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que deseas eliminar el producto <strong>{productToDelete?.title}</strong>?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirm(false)}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={eliminarProducto}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
}

export default ProductsCrud;
