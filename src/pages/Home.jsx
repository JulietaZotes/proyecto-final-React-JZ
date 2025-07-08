import { Carousel } from "react-bootstrap";
import { useEffect } from "react";

function Home() {
    useEffect(() => {
        document.title = "Inicio | Beauty Store";
    }, []);

    const imagenStyle = {
        width: "100%",
        height: "90vh",
        objectFit: "cover",
        display: "block"
    };

    return (
        <Carousel>
            <Carousel.Item>
                <img
                    style={imagenStyle}
                    src="https://fotopiel.com/cdn/shop/articles/fotopiel-rutina-de-skincare-cuidado-facial.jpg?v=1681237955"
                    alt="skin-care"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    style={imagenStyle}
                    src="https://www.primor.eu/blog/wp-content/uploads/2023/09/PERF-OLOR-ROSA.jpg"
                    alt="fragancias"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    style={imagenStyle}
                    src="https://www.primor.eu/blog/wp-content/uploads/2024/04/PROD-SKINCARE-PRIMAV-1200x675.jpg"
                    alt="productos de skin-care"
                />
            </Carousel.Item>
        </Carousel>
    );
}

export default Home;
