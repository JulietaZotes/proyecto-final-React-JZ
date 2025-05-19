import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

function Administracion() {
    const [usuario, setUsuario] = useState("");

    useEffect (() => {
        const user = localStorage.getItem("usuario");
        if (user) setUsuario(user);
    }, []);

    return (
        <Container className="mt-4">
            <h2>Panel de Administración</h2>
            <h4>¡Hola, {usuario}!</h4>
            <p>Acceso exclusivo para usuarios autenticados.</p>
        </Container>
    );
}

export default Administracion;