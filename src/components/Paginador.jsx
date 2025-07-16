import { Button } from "react-bootstrap";

const Paginador = ({ totalPaginas, paginaActual, cambiarPagina }) => {
    const irAPagina = (numeroPagina) => {
        if (numeroPagina >= 1 && numeroPagina <= totalPaginas) {
            cambiarPagina(numeroPagina);
        }
    };

    return (
        <div className="d-flex justify-content-center mt-4 flex-wrap">
            <Button
                variant="light"
                className="mx-1 mb-1"
                disabled={paginaActual === 1}
                onClick={() => irAPagina(paginaActual - 1)}
            >
                ← Anterior
            </Button>

            {Array.from({ length: totalPaginas }, (_, indice) => (
                <Button
                    key={indice + 1}
                    variant={paginaActual === indice + 1 ? 'dark' : 'outline-dark'}
                    className="mx-1 mb-2"
                    onClick={() => irAPagina(indice + 1)}
                >
                    {indice + 1}
                </Button>
            ))}

            <Button
                variant="light"
                className="mx-1 mb-1"
                disabled={paginaActual === totalPaginas}
                onClick={() => irAPagina(paginaActual + 1)}
            >
                Siguiente →
            </Button>

        </div>
    )
}

export default Paginador;