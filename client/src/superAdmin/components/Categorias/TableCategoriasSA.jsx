import React from "react";
import { useCategorias } from "../../../context/CategoriasContext";
import { Spiner } from "../../../components";

export const TableCategoriasSA = ({ datos = [], setDataToEdit, deleteCategoria }) => {
  const { loading } = useCategorias();

  return (
    <>
      {loading ? (
        <div className="container d-flex justify-content-center mt-5">
          <Spiner />
        </div>
      ) : (
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-body">
                <table className="table">
                  <thead>
                    <tr className="text-center">
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Subcategoría</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datos.map((el, index) => (
                      <tr key={index} className="text-center">
                        <td>{el.idcategoria}</td>
                        <td>{el.nombreCat}</td>
                        <td>{el.subCat || "-"}</td>
                        <td className="d-flex justify-content-center gap-2">
                          <button
                            className="btn btn-warning"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModalCategorias"
                            onClick={() => setDataToEdit(el)}
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => deleteCategoria(el.idcategoria)}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
