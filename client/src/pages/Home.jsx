import React, { useEffect, useState } from "react";
import "./style.css";
import { CardProductos } from "./components";
import { Carousel } from "./components";
import { Footer } from "./components";
import { Spiner } from "../components";
import { UseProductos } from "../context/ProductosContext";
import { limitarTexto } from "../helpers/limitarTexto";
import { useCategorias } from "../context/CategoriasContext";
import { useVentas } from "../context/VentasContext";

export const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0); //Manejar el anterior y el siguente en el carrousel
  const [categoriasFilter, setCategoriasFilter] = useState("");
  const { productos, loading, getProductos } = UseProductos();
  const { categorias } = useCategorias();


  useEffect(()=>{
    getProductos()
 },[])

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? productos.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === productos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const filterProductos = (datos = [], idcategoria) => {
    if (!datos) return;
    const categoriaFiltrada = datos.filter(
      (el) => el.idcategoria === Number(idcategoria)
    );
    console.log(categoriaFiltrada);
    return categoriaFiltrada;
  };

  return (
    <>
      {loading ? (
        <div
          className="d-flex justify-content-center"
          style={{ marginTop: "250px" }}
        >
          <Spiner />{" "}
        </div>
      ) : (
        <main className="container-fluid mt-5" style={{ width: "100%" }}>
          <div className="row">
            <Carousel
              data={productos}
              activeIndex={activeIndex}
              limitarTexto={limitarTexto}
              handlePrev={handlePrev}
              handleNext={handleNext}
            />
          </div>
          <div className="container">
            <div className="row mt-5">
              <div className="col-sm-12">
                <div hidden={loading ? true : false}>
                  <label htmlFor="category" className="me-2">
                    Categoria
                  </label>
                  <select
                    id="category"
                    value={categoriasFilter}
                    onChange={(e) => setCategoriasFilter(e.target.value)}
                  >
                    <option value="">Todas</option>
                    {categorias.map((el) => (
                      <option value={el.idcategoria} key={el.idcategoria}>
                        {" "}
                        {el.nombreCat}{" "}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <CardProductos
                data={
                  categoriasFilter.length === 0
                    ? productos
                    : filterProductos(productos, categoriasFilter)
                }
                limitarTexto={limitarTexto}
              />
            </div>
          </div>
        </main>
      )}
      <Footer loading={loading} />
    </>
  );
};
