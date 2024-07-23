import { useContext, createContext, useState, useEffect, useCallback } from "react";
import {
  createCategoriasRequest,
  deleteCategoriasRequest,
  getIdCategoriasRequest,
  getCategoriasRequest,
  updateCategoriasRequest,
} from "../Api/categorias";

const CategoriasContext = createContext();

export const useCategorias = () => {
  const context = useContext(CategoriasContext);
  if (!context) {
    throw new Error("El useCategorias está fuera del contexto");
  }
  return context;
};

export const CategoriasProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaIndividual, setCategoriaIndividual] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getCategorias = async () => {
    try {
      setLoading(true);
      const { data } = await getCategoriasRequest();
      setCategorias(data || []); // Si data es null o undefined, se establece un array vacío
    } catch (error) {
      console.error("Error en getCategorias:", error);
      setError(error.response ? error.response.data.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCategorias();
  }, []);

  const getIdCategorias = async (id) => {
    try {
      const { data } = await getIdCategoriasRequest(id);
      setCategoriaIndividual(data);
    } catch (error) {
      console.error("Error en getIdCategorias:", error);
      setError(error.response ? error.response.data.message : "Error desconocido");
    }
  };

  const createCategorias = async (dataCategoria) => {
    try {
      const { data } = await createCategoriasRequest(dataCategoria);
      setCategorias((prevCategorias) => [...prevCategorias, data]);
    } catch (error) {
      console.error("Error en createCategorias:", error);
      setError(error.response ? error.response.data.message : "Error desconocido");
    }
  };

  const updateCategorias = async (id, data) => {
    try {
      const { data: updatedData } = await updateCategoriasRequest(id, data);
      setCategorias((prevCategorias) =>
        prevCategorias.map((cat) => (cat.idcategoria === id ? updatedData : cat))
      );
    } catch (error) {
      console.error("Error en updateCategorias:", error);
      setError(error.response ? error.response.data.message : "Error desconocido");
    }
  };

  const deleteCategoria = async (id) => {
    try {
      const { data } = await deleteCategoriasRequest(id);  // La respuesta se ignora porque no se necesita el `data`
      if (!data) {
        setLoading(false);  // Aunque aquí no necesitamos manejar `data`, es una buena práctica actualizar el estado `loading` si ocurre algún problema.
      }
      // Actualiza el estado eliminando la categoría con el ID especificado
      setCategorias((prevCategorias) => prevCategorias.filter((cat) => cat.idcategoria !== id));
    } catch (error) {
      console.error("Error en deleteCategoria:", error);  // Mejora en el log
      setError(error.response ? error.response.data.error : "Error desconocido");  // Manejo de errores
    }
  };
  
  

  return (
    <CategoriasContext.Provider
      value={{
        categorias,
        categoriaIndividual,
        error,
        loading,
        getCategorias,
        getIdCategorias,
        createCategorias,
        updateCategorias,
        deleteCategoria,
      }}
    >
      {children}
    </CategoriasContext.Provider>
  );
};
