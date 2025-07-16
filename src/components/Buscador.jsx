import { Form, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const Buscador = ({ busqueda, setBusqueda }) => {
    return (
        <Form className="d-flex me-3 w-100 mb-3">
            <InputGroup>
                <InputGroup.Text style={{ backgroundColor: 'white', borderRight: 'none' }}>
                    <FaSearch />
                </InputGroup.Text>
                <Form.Control
                    type="search"
                    placeholder="Buscar productos..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    style={{
                        outline: 'none',
                        boxShadow: 'none',
                        borderColor: '#ced4da', // para que mantenga el borde normal
                    }}
                />
            </InputGroup>
        </Form>
    );
};

export default Buscador;