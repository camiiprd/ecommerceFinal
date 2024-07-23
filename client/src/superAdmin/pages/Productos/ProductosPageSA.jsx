import React, { useEffect, useState } from "react";
import { UseProductos } from "../../../context/ProductosContext.jsx";
import { ModalProductos } from "../../components/Productos/ModalProductos.jsx";
import { TableProductosSA } from "../../components/Productos/TableProductosSA.jsx";

export const ProductosPageSA = () => {
  const { productos, createProductos, updateProductos, deleteProductos, getProductos } = UseProductos();
  const [dataToEdit, setDataToEdit] = useState(null);
  const [filterProductos, setFilterProductos] = useState([]);

  useEffect(()=>{
    getProductos()
  },[])

  const handleBuscarProductoInput = (e) => {
    e.preventDefault();
    const searchInput = e.target.value.toLocaleLowerCase();
    if (searchInput === "") {
      setFilterProductos(productos);
    } else {
      const filterProductoResultado = productos.filter((datos) => {
        return datos.nombre.toLocaleLowerCase().includes(searchInput);
      });
      setFilterProductos(filterProductoResultado);
    }
  };

  const data = filterProductos.length > 0 ? filterProductos : productos;

  return (
    <div className="container mt-3">
      <div className="row mt-5">
        <div className="col-sm-12">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div
                  className="card-header"
                  style={{ backgroundColor: "#0d6efd", color: "white" }}
                >
                  Productos
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-10">
                      <div className="form-group">
                        <label form="nro_documento">Buscar productos</label>
                        <input
                          type="text"
                          className="form-control form-control-xl"
                          placeholder="Ingrese el nombre de un producto"
                          onChange={handleBuscarProductoInput}
                        />
                      </div>
                    </div>
                    <div className="col-sm-2 mt-4">
                      <div className="form-group">
                        <button
                          type="button"
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModalProductos"
                          onClick={() => setDataToEdit(null)}
                        >
                          <i className="fas-solid fa fa-plus "></i> Agregar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <TableProductosSA
                datos={data}
                setDataToEdit={setDataToEdit}
                deleteProductos={deleteProductos}
              />
            </div>
          </div>
        </div>
        <ModalProductos
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
          createProductos={createProductos}
          updateProductos={updateProductos}
        />
      </div>
    </div>
  );
};
