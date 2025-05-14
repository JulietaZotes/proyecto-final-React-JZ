import Navegacion from "./Navegacion";
import Footer from "./Footer";

function Layout({ children }) {
  const layoutStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  };

  const contentStyle = {
    flex: 1,
  };

  return (
    <div style={layoutStyle}>
      <Navegacion />
      <div style={contentStyle}>
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
