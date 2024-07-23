import React, { useEffect, useState } from "react";
import { useCategorias } from "../../../context/CategoriasContext.jsx";

export const ModalCategorias = ({ dataToEdit, setDataToEdit, createCategorias, updateCategorias }) => {
  const [nombreCat, setNombreCat] = useState("");
  const [subCat, setSubCat] = useState("");
  const { getCategorias } = useCategorias();

  useEffect(() => {
    if (dataToEdit) {
      setNombreCat(dataToEdit.nombreCat);
      setSubCat(dataToEdit.subCat);
    }else{
      setNombreCat("")
      setSubCat("")
    }
  }, [dataToEdit]);

  const onResetForm = ()=>{
    setNombreCat("")
    setSubCat("")
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dataToEdit) {
      updateCategorias(dataToEdit.idcategoria, { nombreCat, subCat });
    } else {
      createCategorias({ nombreCat, subCat });
    }
    getCategorias();
    onResetForm()
    setDataToEdit(null);
  };

  return (
    <div
      className="modal fade"
      id="exampleModalCategorias"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog ">
        <div className="modal-content">
          <div
            className="modal-header"
            style={{ backgroundColor: "#4e73df", color: "white" }}
          >
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {dataToEdit ? "Editar Categoria" : "Agregar Producto"}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example3cg">
                 Nombre
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingrese un nombre de categoria"
                  value={nombreCat}
                  onChange={(e)=> setNombreCat(e.target.value)}                
                />
              </div>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example3cg">
                  Sub Categoria
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingrese subCategoria"
                  value={subCat}
                  onChange={(e)=> setSubCat(e.target.value)}
                />
              </div>

  
              <div className="modal-footer">
                  <button
                    type="submit"
                    className={
                      dataToEdit ? "btn btn-warning" : "btn btn-success"
                    }
                    data-bs-dismiss="modal"
                  >
                    {dataToEdit ? (
                      <span>
                        {" "}
                        <i className="fa-regular fa-pen-to-square"></i>{" "}
                        Confirmar
                      </span>
                    ) : (
                      <span>
                        {" "}
                        <i className="fa-solid fa-plus"></i> Crear
                      </span>
                    )}
                  </button>
                  <button
                    type="reset"
                    className="btn btn-danger"
                    onClick={()=>{
                      onResetForm()
                      setDataToEdit(null)
                    }}
                  >
                    {" "}
                    <i className="fa-solid fa-xmark"></i> Cancelar
                  </button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
