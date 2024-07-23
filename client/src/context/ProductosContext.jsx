import { useContext, createContext, useState, useEffect } from "react";
import {
  createProductosRequest,
  deleteProductosRequest,
  getIdProductosRequest,
  getProductosRequest,
  updateProductosRequest,
} from "../Api/productos";

const ProductosContext = createContext();

export const UseProductos = () => {
  const context = useContext(ProductosContext);
  if (!context) {
    throw new Error("El UseProductos esta fuera del contexto");
  }
  return context;
};

export const ProductoProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [productoIndividual, setProductoIndividual] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  const getProductos = async () => {
    try {
      setLoading(true);
      const { data, } = await getProductosRequest();
      if (!data) {
        setProductos(null);
        setLoading(false);
      }
      setProductos(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      console.log("Error en getProductos");
    }
  };

 


  const getIdProductos = async (id) => {
    try {
      const { data } = await getIdProductosRequest(id);
      if (!data) {
        setProductoIndividual(null);
        setLoading(false);
      } else {
        setProductoIndividual(data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data);
      console.log("Error en getProductos");
    }
  };

  const createProductos = async (dataProducto) => {
    try {
      const { data } = await createProductosRequest(dataProducto);
      if (!data) {
        setProductos(null);
        setLoading(false);
      }
      setProductos((prevProductos)=>[...prevProductos, data]);
      setLoading(false);
      getProductos();
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const updateProductos = async (id,data)=>{
    try {
       const { data: dataUser } = await updateProductosRequest(id,data)
       console.log(dataUser)
       if(!dataUser){
         setLoading(false)
         setProductos(null)
       }
       let newData = productos.map(el=> el.idproductos === id ? data : el);
       setProductos(newData)
       setLoading(false)
       
      
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  }

  const deleteProductos = async (id) => {
    try {
      const { data } = await deleteProductosRequest(id);
      if(!data){
        setLoading(false)
      }
      let newData = productos.filter(el=> el.idproductos !== id);
      setProductos(newData);
    } catch (error) {
      console.log(error);
      console.log("Errir en deleteProductos-ProductoContext");
    }
  };





  return (
    <ProductosContext.Provider
      value={{
        productos,
        error,
        loading,
        productoIndividual,
        getProductos,
        getIdProductos,
        createProductos,
        updateProductos,
        deleteProductos,
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
};
