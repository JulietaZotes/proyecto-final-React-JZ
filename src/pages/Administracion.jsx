import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import ProductsCrud from '../components/ProductsCrud';

function Administracion() {
    const [usuario, setUsuario] = useState("");

    useEffect(() => {
        document.title = "Administración | Beauty Store";
    }, []);

    useEffect(() => {
        const user = localStorage.getItem("usuario");
        if (user) setUsuario(user);
    }, []);

    return (
        <Container className="mt-4">
            <h2>Panel de Administración</h2>
            <h4>¡Hola, {usuario}!</h4>
            <ProductsCrud />
        </Container>
    );
}

export default Administracion;