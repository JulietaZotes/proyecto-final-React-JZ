import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Productos from './pages/Productos';
import Nosotros from './pages/Nosotros';
import Contacto from './pages/Contacto';
import Login from './pages/Login';
import RutaProtegida from './components/RutaProtegida';
import Administracion from './pages/Administracion';
import Swal from 'sweetalert2';

function App() {
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  const agregarAlCarrito = (producto) => {
      Swal.fire({
                title: `${producto.title}`,
                text: `¡Ha sido agregado con éxito al carrito!`,
                icon: "success",
                confirmButtonText: "Aceptar"
            });
  }
  
  const toggleCarrito = () => setMostrarCarrito(!mostrarCarrito);

  return (
    <BrowserRouter>
      <Layout carrito={carrito} mostrarCarrito={mostrarCarrito} toggleCarrito={toggleCarrito}>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/productos/:categoria' element={<Productos agregarAlCarrito={agregarAlCarrito}/>}/>
          <Route path='/nosotros' element={<Nosotros/>}/>
          <Route path='/contacto' element={<Contacto/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/administracion' element={
            <RutaProtegida>
              <Administracion/>
            </RutaProtegida>
          }/>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App
