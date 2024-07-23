import React, { useState, useEffect } from "react";
import { useProveedores } from "../../../context/ProveedoresContext";
import { ModalProveedores } from "../../components/Proveedores/ModalProveedores";
import { TableProveedoresSA } from "../../components/Proveedores/TableProveedoresSA";

export const ProveedoresPageSA = () => {
  const { proveedores, createProveedores, updateProveedores, deleteProveedores, getProveedores } = useProveedores();
  const [dataToEdit, setDataToEdit] = useState(null);
  const [filterProveedores, setFilterProveedores] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    getProveedores();
  }, []);



  const handleBuscarProveedorInput = (e) => {
    const searchValue = e.target.value.toLocaleLowerCase();
    setSearchInput(searchValue);
    if (searchValue === "") {
      setFilterProveedores(proveedores);
    } else {
      const filteredProveedores = proveedores.filter((prov) =>
        prov.razonSocial.toLocaleLowerCase().includes(searchValue)
      );
      setFilterProveedores(filteredProveedores);
    }
  };

  const data = searchInput ? filterProveedores : proveedores;

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
                  Proveedores
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-10">
                      <div className="form-group">
                        <label htmlFor="search_proveedor">Buscar proveedores</label>
                        <input
                          type="text"
                          id="search_proveedor"
                          className="form-control form-control-xl"
                          placeholder="Ingrese el nombre del proveedor"
                          onChange={handleBuscarProveedorInput}
                          value={searchInput}
                        />
                      </div>
                    </div>
                    <div className="col-sm-2 mt-4">
                      <div className="form-group">
                        <button
                          type="button"
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#modalProveedores"
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
              <TableProveedoresSA
                datos={data}
                setDataToEdit={setDataToEdit}
                deleteProveedores={deleteProveedores}
              />
            </div>
          </div>
        </div>
        <ModalProveedores
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
          createProveedores={createProveedores}
          updateProveedores={updateProveedores}
        />
      </div>
    </div>
  );
};
