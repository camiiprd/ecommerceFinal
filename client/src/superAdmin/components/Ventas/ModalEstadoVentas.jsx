import React, { useEffect, useState } from "react";
import { useVentas } from "../../../context/VentasContext";
import Swal from "sweetalert2";

const initialForm = {
  estado: "",
};

export const ModalEstadoVentas = ({ dataToEdit }) => {
  const [form, setForm] = useState(initialForm);
  const { updateEstadoVentas } = useVentas();


  useEffect(() => {
    if (dataToEdit) {
      setForm(dataToEdit.estado);
    } else {
      setForm(initialForm);
    }
  }, [dataToEdit]);

  const handleSelectedChangeEstado = (e) => {
    setForm({
      ...form,
      estado: e.target.value,
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!form.estado){
      Swal.fire({
        title:"Tienes que seleccionar un estado",
        icon:"error"
      })
      return;
    }
    const { estado } = form 

    await updateEstadoVentas(dataToEdit.idventas, {estado})
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Cambios guardados",
      showConfirmButton: false,
      timer: 1500
    });
    setForm(initialForm)
  };

  return (
    <div
      className="modal fade"
      id="exampleModalVentas"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
     >
      <div className="modal-dialog">
        <div className="modal-content">
          <div
            className="modal-header"
            style={{ backgroundColor: "#4e73df", color: "white" }}
          >
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Estado actual {dataToEdit ? <b>{dataToEdit.estado}</b> : ""}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={()=> setForm(initialForm)}
            ></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example4cg">
                  Categoria
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="idcategoria"
                  value={form.estado}
                  onChange={handleSelectedChangeEstado}
                >
                  <option value="">Seleccione una estado </option>
                  <option value="pendiente">Pendiente</option>
                  <option value="completado">Completado</option>
                  <option value="anulado">Anulado</option>
                </select>
              </div>

              {form.estado === "" && ""}

              {form.estado === "pendiente" && (
                <div className="d-flex justify-content-center">
                  <p>
                    El estado <b>pendiente</b> es el estado por defecto cuando
                    el usuarios realiza una compra
                  </p>
                </div>
              )}

              {form.estado === "completado" && (
                <div className="d-flex justify-content-center">
                  <p>
                    El estado <b>completado</b> manifiesta que el producto fue
                    abonado y entregado
                  </p>
                </div>
              )}
              {form.estado === "anulado" && (
                <div className="d-flex justify-content-center">
                  <p>
                    El estado <b>anulado</b> manifiesta que el producto/s no fue
                    abonado o no entregado o una combinacion de ambas.
                  </p>
                </div>
              )}

              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-warning"
                  data-bs-dismiss="modal"
                >
                  <span>
                    <i className="fa-regular fa-pen-to-square"></i> Confirmar
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
