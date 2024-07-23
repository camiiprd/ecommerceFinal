import { useContext, createContext, useState, useEffect } from "react";

const CarritosContext = createContext();

export const UseCarrito = ()=>{
    const context = useContext(CarritosContext);
    if(!context){
        throw new Error("El UseCarrito esta fuera del contexto")
    }
    return context;
}


export const CarritoProvider = ( { children } )=>{
     const [carritoCompras, setCarritoCompras] = useState([]);
     const [counter, setCounter] = useState({})
   
     useEffect(()=>{
        const initialCounter = carritoCompras.reduce((acc,item)=>{
         if(!(item.idproductos in acc)){
            acc[item.idproductos] = 1
         }
         return acc;
        },{...counter})
        setCounter(initialCounter)
     },[carritoCompras])

     const handleIncrement = (id) => {
         setCounter((prevCounter)=>({
           ...prevCounter,
           [id]: prevCounter[id] + 1
         }))
     };
   
     const handleDecrement = (id) => {
        setCounter((prevCounter)=>({
         ...prevCounter,
         [id]: prevCounter[id] > 1 ? prevCounter[id] - 1: 1
        }))
     };
     const addToCarrito = (producto)=>{
        if(!producto) return;
        setCarritoCompras([...carritoCompras,producto])
       
     }

     const deleteProducto = (id) => {
        const deleteProducto = carritoCompras.filter((el) => el.idproductos !== id);
        setCarritoCompras(deleteProducto);
        setCounter((prevCounter)=>{
            const {[id]:_, ...newCounter} = prevCounter;
            return newCounter;
        })
      };


      const chekingProductoCarrito = (producto) => {
        return carritoCompras.some((item) => item.idproductos === producto.idproductos);
      };


      const handleResetCarrito = ()=>{
        setCarritoCompras([])
        setCounter(1);
      }


    return (
        <CarritosContext.Provider value={{
            carritoCompras,
            counter,
            addToCarrito,
            deleteProducto,
            handleIncrement,
            handleDecrement,
            chekingProductoCarrito,
            handleResetCarrito
        }}>
            { children }
        </CarritosContext.Provider>
    )
}
