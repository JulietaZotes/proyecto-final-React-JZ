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
import { CarritoProvider } from './components/CarritoContext';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';

function App() {
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  const toggleCarrito = () => setMostrarCarrito(!mostrarCarrito);

  return (
    <BrowserRouter>
      <CarritoProvider>
        <Layout mostrarCarrito={mostrarCarrito} toggleCarrito={toggleCarrito}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/productos/:categoria' element={<Productos />} />
            <Route path='/nosotros' element={<Nosotros />} />
            <Route path='/contacto' element={<Contacto />} />
            <Route path='/login' element={<Login />} />
            <Route path='/administracion' element={
              <RutaProtegida>
                <Administracion />
              </RutaProtegida>
            } />
          </Routes>
        </Layout>
      <ToastContainer position="top-right" autoClose={3000} />
      </CarritoProvider>
    </BrowserRouter>
  );
}

export default App
