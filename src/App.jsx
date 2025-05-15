import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/home';
import Productos from './pages/Productos';
import Nosotros from './pages/Nosotros';
import Contacto from './pages/Contacto';

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
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App
