import { useState, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function Login() {
    useEffect(() => {
        document.title = "Login | Beauty Store";
    }, []);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        if (email === "admin@prueba.com" && password === "1234") {
            const nombreUsuario = email.split("@")[0];
            localStorage.setItem("auth", "true");
            localStorage.setItem("usuario", nombreUsuario);
            navigate("/administracion");
        } else {
            toast.error("Usuario o contraseña incorrectos", {
                position: "top-right",
                autoClose: 3000,
            });
        }
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
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="dark" onClick={handleLogin}>Ingresar</Button>
            </Form>
            <ToastContainer />
        </Container>
    );
}

export default Login;