import React from "react";
import { useForm } from "../../../hooks/useForm";
import { UseAuth } from "../../../context/AuthProvider";
import { createDomiciliosUsers } from "../../../Api/domicilios";

const initialForm = {
  codigoPostal: "",
  calle: "",
  numero: "",
  descripcion: "",
  idusuarios: null,
};

export const FormEntrega = ({ onFormSubmit, onCancel, getDomicilios }) => {
  const {
    codigoPostal,
    calle,
    numero,
    descripcion,
    onResetForm,
    onInputChange,
  } = useForm(initialForm);

  const { usuarios } = UseAuth();

  

  const createDomicilios = async (data) => {
    if (!data) return;
    await createDomiciliosUsers(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      codigoPostal,
      calle,
      numero,
      descripcion,
      idusuarios: usuarios.idusuarios,
    };
    if (!codigoPostal || !calle || !numero || !descripcion) {
      console.log("Los datos no pueden ir vacíos");
      return;
    }
    await createDomicilios(data);
    onFormSubmit(data);
    onResetForm();
    getDomicilios();
  };

  return (
    <div className="container mt-3">
      <form className="row" onSubmit={handleSubmit}>
        <div className="col-6">
          <div className="mb-3">
            <label htmlFor="codigoPostal" className="form-label">
              Codigo postal
            </label>
            <input
              type="text"
              className="form-control"
              name="codigoPostal"
              value={codigoPostal}
              onChange={onInputChange}
            />
          </div>
        </div>
        <div className="col-6">
          <div className="mb-3">
            <label htmlFor="calle" className="form-label">
              Calle
            </label>
            <input
              type="text"
              className="form-control"
              name="calle"
              value={calle}
              onChange={onInputChange}
            />
          </div>
        </div>
        <div className="col-6">
          <div className="mb-3">
            <label htmlFor="numero" className="form-label">
              Numero
            </label>
            <input
              type="number"
              className="form-control"
              name="numero"
              value={numero}
              onChange={onInputChange}
            />
          </div>
        </div>
        <div className="col-6">
          <div className="mb-3">
            <label htmlFor="descripcion" className="form-label">
              Descripcion
            </label>
            <textarea
              className="form-control"
              name="descripcion"
              value={descripcion}
              onChange={onInputChange}
            />
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-success me-2">
            Enviar
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};
