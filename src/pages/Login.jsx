import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    const handleLogin = () => {
        const nombreUsuario = email.split("@") [0];
        localStorage.setItem("auth", "true");
        localStorage.setItem("usuario", nombreUsuario);
        navigate("/administracion");
    };

    return (
        <Container className="mt-5" style={{ maxWidth: 400 }}>
            <h2>Iniciar sesión</h2>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" />
                </Form.Group>
                <Button variant="dark" onClick={handleLogin}>Ingresar</Button>
            </Form>
        </Container>
    );
}

export default Login;