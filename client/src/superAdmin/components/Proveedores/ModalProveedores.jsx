import React, { useState, useEffect } from "react";

export const ModalProveedores = ({
  dataToEdit,
  setDataToEdit,
  createProveedores,
  updateProveedores,
}) => {
  const [razonSocial, setRazonSocial] = useState("");
  const [CUIT, setCUIT] = useState(""); // Agregamos estado para CUIT
  const [mail, setMail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");

  useEffect(() => {
    if (dataToEdit) {
      setRazonSocial(dataToEdit.razonSocial || "");
      setCUIT(dataToEdit.CUIT || ""); // Inicializamos CUIT
      setMail(dataToEdit.mail || "");
      setDireccion(dataToEdit.direccion || "");
      setTelefono(dataToEdit.telefono || "");
    } else {
      setRazonSocial("");
      setCUIT("");
      setMail("");
      setTelefono("");
      setDireccion("");
    }
  }, [dataToEdit]);

  const onResetForm = () => {
    setRazonSocial("");
    setCUIT("");
    setMail("");
    setTelefono("");
    setDireccion("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const proveedorData = { razonSocial, CUIT, mail, telefono, direccion }; // Incluimos CUIT
    if (dataToEdit) {
      updateProveedores(dataToEdit.idproveedores, proveedorData);
    } else {
      createProveedores(proveedorData);
    }
    setDataToEdit(null); // Cerrar el modal
  };

  return (
    <div
      className="modal fade"
      id="modalProveedores"
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
              {dataToEdit ? "Editar Proveedor" : "Crear Proveedor"}
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
                  Razon Social
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingrese nombre"
                  value={razonSocial}
                  onChange={(e) => setRazonSocial(e.target.value)}
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example3cg">
                  CUIT
                </label>
                <input
                  type="text"
                  className="form-control "
                  placeholder="Ingrese su CUIT"
                  value={CUIT}
                  onChange={(e) => setCUIT(e.target.value)}
                />
              </div>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example3cg">
                  Email
                </label>
                <input
                  type="text"
                  className="form-control "
                  placeholder="Ingrese email"
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example3cg">
                  Direccion
                </label>
                <input
                  type="text"
                  className="form-control "
                  placeholder="Ingrese direccion"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                />
              </div>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example3cg">
                  Telefono
                </label>
                <input
                  type="text"
                  className="form-control "
                  placeholder="Ingrese precio"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                />
              </div>

              <div className="modal-footer">
                <button
                  type="submit"
                  className={dataToEdit ? "btn btn-warning" : "btn btn-success"}
                  data-bs-dismiss="modal"
                >
                  {dataToEdit ? (
                    <span>
                      {" "}
                      <i className="fa-regular fa-pen-to-square"></i> Confirmar
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
                  onClick={() => {
                    onResetForm();
                    setDataToEdit(null);
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
