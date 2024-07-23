import React, { useState, useEffect } from "react";
import { useCategorias } from "../../context/CategoriasContext";
import { ModalCategorias } from "../components/Categorias/ModalCategorias";
import { TableCategoriasSA } from "../components/Categorias/TableCategoriasSA.jsx";

export const CategoriasPageSA = () => {
  const { categorias, createCategorias, updateCategorias, deleteCategoria, loading, getCategorias, error } = useCategorias();
  const [dataToEdit, setDataToEdit] = useState(null);
  const [filterCategorias, setFilterCategorias] = useState([]);

  useEffect(() => {
    getCategorias();
  }, []);

  useEffect(() => {
    setFilterCategorias(categorias);
  }, [categorias]);

  const handleBuscarCategoriaInput = (e) => {
    const searchInput = e.target.value.toLowerCase();
    if (searchInput === "") {
      setFilterCategorias(categorias);
    } else {
      const filterCategoriaResultado = categorias.filter((datos) => {
        return datos.nombreCat.toLowerCase().includes(searchInput);
      });
      setFilterCategorias(filterCategoriaResultado);
    }
  };

  const data = filterCategorias.length > 0 ? filterCategorias : categorias;

  return (
    <div className="container mt-3">
      <div className="row mt-5">
        <div className="col-sm-12">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header" style={{ backgroundColor: "#0d6efd", color: "white" }}>
                  Categorías
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-10">
                      <div className="form-group">
                        <label htmlFor="buscar_categoria">Buscar categorías</label>
                        <input
                          id="buscar_categoria"
                          type="text"
                          className="form-control form-control-xl"
                          placeholder="Ingrese el nombre de una categoría"
                          onChange={handleBuscarCategoriaInput}
                        />
                      </div>
                    </div>
                    <div className="col-sm-2 mt-4">
                      <div className="form-group">
                        <button
                          type="button"
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModalCategorias"
                          onClick={() => setDataToEdit(null)}
                        >
                          <i className="fas-solid fa fa-plus"></i> Agregar
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row">
            <div className="col-sm-12">
              <TableCategoriasSA
                datos={data}
                setDataToEdit={setDataToEdit}
                deleteCategoria={deleteCategoria}
              />
            </div>
          </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalCategorias
        dataToEdit={dataToEdit}
        setDataToEdit={setDataToEdit}
        createCategorias={createCategorias}
        updateCategorias={updateCategorias}
      />
    </div>
  );
};
