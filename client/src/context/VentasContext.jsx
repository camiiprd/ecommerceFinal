import { useContext, createContext, useEffect, useState } from "react";
import {
  createVentasRequest,
  getVentasRequest,
  deleteVentasRequest,
  getIdDetalleVentasRequest,
  updateEstadoVentasRequest,
  getIdVentasRequest,
} from "../Api/ventas";
import { getFormaDePagosRequest } from "../Api/formaDePago";


const VentasContext = createContext();

export const useVentas = () => {
  const context = useContext(VentasContext);
  if (!context) {
    throw error("el useVentas esta fuera del contexto");
  }
  return context;
};

export const VentasProvider = ({ children }) => {
  const [ventas, setVentas] = useState([]);
  const [ventasIndividual, setVentasIndividual] = useState([]);
  const [formaDePago, setFormaDePago] = useState([]);
  const [detalleVentas, setDetalleVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getVentas = async () => {
    try {
      const { data } = await getVentasRequest();
      if (!data) {
        setLoading(false);
      }
      setVentas(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const getIdVentas = async (id)=>{
    try {
         const { data } = await getIdVentasRequest(id);
         if(!data){
          setVentasIndividual(null)
          setLoading(false)
         }
         setVentasIndividual(data)
         setLoading(false)
    } catch (error) {
      console.log(error);
      setError(error)
      console.log("Error en getIdVentas")
    }
  }

  const getIdDetalleVentas = async (id) => {
    try {
      const { data } = await getIdDetalleVentasRequest(id);
      if (!data) {
        setLoading(false);
      }
      setDetalleVentas(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  const getFormaDePago = async () => {
    try {
      const { data } = await getFormaDePagosRequest();
      if (!data) {
        setLoading(false);
      }

      setFormaDePago(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const createVentas = async (dataVenta) => {
    try {
      const { data } = await createVentasRequest(dataVenta);
      if (!data) {
        setLoading(false);
        setStateVentas(false)
      }
      setVentas((preVentas) => [...preVentas, data]);
      setLoading(null);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const updateEstadoVentas = async (id, dataVentas) => {
    try {
      const { data } = await updateEstadoVentasRequest(id, dataVentas);
      if (!data) {
        setLoading(false);
        setStateVentas(false);
      }
      let newData = ventas.map((el) => (el.idventas === id ? {...el, ...dataVentas} : el));
      setVentas(newData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const deleteVentas = async (id) => {
    try {
      const { data } = await deleteVentasRequest(id);
      if (!data) {
        setLoading(false);
      }
      let newDate = ventas.filter((el) => el.idventas !== id);
      setVentas(newDate);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };
  

  return (
    <VentasContext.Provider
      value={{
        ventas,
        formaDePago,
        detalleVentas,
        ventasIndividual,
        loading,
        error,
        createVentas,
        getVentas,
        getIdDetalleVentas,
        deleteVentas,
        updateEstadoVentas,
        getIdVentas,

        getFormaDePago,
      }}
    >
      {children}
    </VentasContext.Provider>
  );
};
