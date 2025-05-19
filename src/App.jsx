import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/home';
import Productos from './pages/Productos';
import Nosotros from './pages/Nosotros';
import Contacto from './pages/Contacto';
import Login from './pages/Login';
import RutaProtegida from './components/RutaProtegida';
import Administracion from './pages/Administracion';

function App() {
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  const agregarAlCarrito = (producto) => {
    setCarrito(prev => [...prev, producto]);
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
