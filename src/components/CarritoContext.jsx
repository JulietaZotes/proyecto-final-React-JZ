import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);

    const agregarAlCarrito = (producto) => {
        setCarrito((prevCarrito) => {
            const productoExistente = prevCarrito.find(item => item.id === producto.id);
            if (productoExistente) {
                return prevCarrito.map(item =>
                    item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
                );
            }
            return [...prevCarrito, { ...producto, cantidad: 1 }]
        })
        toast.success(`${producto.title} agregado al carrito`)
    }

    const eliminarDelCarrito = (id) => {
        setCarrito((prevCarrito => prevCarrito.filter(item => item.id !== id)))
        toast.success("Producto eliminado del carrito")
    };

    const vaciarCarrito = () => {
        setCarrito([]);
    };

    return (
        <CarritoContext.Provider
        value={{
            carrito,
            setCarrito,
            agregarAlCarrito,
            eliminarDelCarrito,
            vaciarCarrito
        }}
        >
            {children}
        </CarritoContext.Provider>
    );
};