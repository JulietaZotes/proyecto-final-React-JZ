import { Container } from "react-bootstrap";
import nosotrosImg from "../assets/nosotros.jpg"; // Reemplazá con tu imagen

function Nosotros() {
  return (
    <Container fluid className="p-0" style={{ minHeight: '100vh', paddingTop: '56px' }}>
      <div style={{ height: "70vh", overflow: 'hidden' }}>
        <img
          src={nosotrosImg}
          alt="Nosotros"
          style={{
            width: "100%",
            height: "90vh",
            objectFit: "cover",
            display: "block"
          }}
        />
      </div>

      <div style={{ padding: '2rem', textAlign: "center" }}>
        <h2>Sobre Nosotros</h2>
        <h6>
          En <strong>Beauty Store</strong>, creemos que la belleza comienza con el cuidado. Por eso,
          seleccionamos cuidadosamente productos de alta calidad que no solo realzan tu aspecto,
          sino que también cuidan tu piel, tu cuerpo y tu bienestar.
        </h6>
        <h6>
          Nuestro equipo está formado por apasionados de la cosmética, el skincare y la innovación en belleza.
          Buscamos constantemente las últimas tendencias y marcas reconocidas a nivel mundial para ofrecerte
          una experiencia única, segura y confiable.
        </h6>
        <h5><strong>Tu belleza es única. ¡Realzala con nosotros!</strong></h5>
      </div>
    </Container>
  );
}

export default Nosotros;
