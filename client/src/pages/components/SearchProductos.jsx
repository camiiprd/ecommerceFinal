import React, { useEffect, useState } from "react";
import { UseProductos } from "../../context/ProductosContext";
import { useSearchParams } from "react-router-dom";
import { CardProductos } from "./CardProductos";
import { limitarTexto } from "../../helpers/limitarTexto";

export const SearchProductos = () => {
  const { productos } = UseProductos();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [productosFilter, setProductosFilter] = useState([]);

  useEffect(() => {
    if (query) {
      const filtro = productos.filter((datos) =>
        datos.nombre.toLowerCase().includes(query.toLowerCase())
      );
      setProductosFilter(filtro);
    }
  }, [query, productos]);

  return (
    <div className="container mt-5">
      <h2>Resultado de busqueda para "{query}"</h2>
      <div className="row">
        {productosFilter.length > 0 ? (
          <CardProductos data={productosFilter} limitarTexto={limitarTexto} />
        ) : (
          <p>No se encontraron productos.</p>
        )}
      </div>
    </div>
  );
};
