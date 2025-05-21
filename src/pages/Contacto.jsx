import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";

function Contacto() {
    const [nombre, setNombre] = useState("");
    const [mensaje, setMensaje] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            title: `¡Gracias por contactarnos, ${nombre}!`,
            text: `Uno de nuestros asesores te responderá lo antes posible :)`,
            icon: "success",
            confirmButtonText: "Aceptar"
        });
        setNombre("");
        setMensaje("")
    };

    return (
        <Container className="mt-5" style={{ maxWidth: 400 }}>
            <h2 style={{ textAlign: "center" }}>¡Contáctanos!</h2>
            <Form className="mt-4" onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Mensaje</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Escribe tu consulta o mensaje aqui..."
                        value={mensaje}
                        onChange={(e) => setMensaje(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="dark" type="submit">Enviar</Button>
            </Form>
        </Container>
    )
}

export default Contacto;