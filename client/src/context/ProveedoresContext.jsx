import { createContext, useContext, useState } from "react";
import {
  getProveedoresRequest,
  createProveedoresRequest,
  updateProveedoresRequest,
  deleteProveedoresRequest,
} from "../Api/proveedores";

const ProveedoresContext = createContext();

export const useProveedores = () => {
  const context = useContext(ProveedoresContext);
  if (!context) {
    throw error("El useProveedores tiene que estar dentro del provider");
  }
  return context;
};

export const ProveedoresProvider = ({ children }) => {
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProveedores = async () => {
    try {
      const { data } = await getProveedoresRequest();
      if (!data) {
        setProveedores(null);
        setLoading(false);
      }
      setProveedores(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  const createProveedores = async (proveedorData) => {
    try {
      await createProveedoresRequest(proveedorData);
      getProveedores();
    } catch (error) {
      console.error("Error al crear proveedor:", error);
      setError(
        error.response ? error.response.data.error : "Error desconocido"
      );
    }
  };

  const updateProveedores = async (id, data) => {
    try {
      const { data: dataProveedores } = await updateProveedoresRequest(
        id,
        data
      );
      if (!dataProveedores) {
        setLoading(false);
      }
      let newData = proveedores.map((el) =>
        el.idproveedores === id ? data : el
      );
      setProveedores(newData);
      setLoading(false);
      getProveedores();
    } catch (error) {
      console.error("Error al actualizar proveedor:", error);
      setError(
        error.response ? error.response.data.error : "Error desconocido"
      );
    }
  };

  const deleteProveedores = async (idproveedor) => {
    try {
      const { data } = await deleteProveedoresRequest(idproveedor);
      if (!data) {
        setLoading(false);
      }
      let newData = proveedores.filter(
        (el) => el.idproveedores !== idproveedor
      );
      setProveedores(newData);
    } catch (error) {
      console.error("Error al eliminar proveedor:", error);
      setError(
        error.response ? error.response.data.error : "Error desconocido"
      );
    }
  };

  return (
    <ProveedoresContext.Provider
      value={{
        proveedores,
        loading,
        error,
        getProveedores,
        createProveedores,
        updateProveedores,
        deleteProveedores,
      }}
    >
      {children}
    </ProveedoresContext.Provider>
  );
};
