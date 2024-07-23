import React, { useEffect } from "react";
import { useForm } from "../../../hooks/useForm";
import Swal from 'sweetalert2'
import { UseAuth } from "../../../context/AuthProvider";

const initialForm = {
  idusuarios: null,
  rol: "",
  nombre: "",
  apellido: "",
  email: "",
  DNI: "",
  telefono: "",
  username: "",
  password: ""
};

export const ModalUsuarios = ({ dataToEdit, setDataToEdit }) => {
  const { formState, onInputChange, onResetForm, setFormState } = useForm(initialForm);
  const { rol, nombre, apellido, email, DNI, telefono, username, password } = formState;
  const { registro, registroSuperAdmin, updateUsuarios } = UseAuth();

  const handleSelectedRol = (e) => {
    setFormState({
      ...formState,
      rol: e.target.value
    });
  };

  useEffect(()=>{
     if(dataToEdit){
        setFormState(dataToEdit)
     }else{
      setFormState(initialForm)
     }
  },[dataToEdit])



  const handleSubmit = (e)=>{
     e.preventDefault();
     if(!rol || !nombre || !apellido || !email || !DNI || !telefono || !username || !password){
        Swal.fire({
            title:"Todos los campos son obligatorios",
            icon:"error"
        })
        return;
     }
     if(formState.idusuarios === null){
       if(rol === "cliente"){
         registro(formState)
         
       }else if(rol === "superAdmin"){
         registroSuperAdmin(formState)
         
       }
     }else{
         updateUsuarios(formState.idusuarios, formState)
     }
     onResetForm();
  }

  return (
    <div
      className="modal fade"
      id="modalUsuariosSA"
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
              { dataToEdit ? "Editar usuarios": "Crear usuario"}
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
                  placeholder="Ingrese nombre"
                  name="nombre"
                  value={nombre}
                  onChange={onInputChange}
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example3cg">
                  Apellido
                </label>
                <input
                  type="text"
                  className="form-control "
                  placeholder="Ingrese su apellido"
                  name="apellido"
                  value={apellido}
                  onChange={onInputChange}
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
                  name="email"
                  value={email}
                  onChange={onInputChange}
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example3cg">
                  DNI
                </label>
                <input
                  type="number"
                  className="form-control "
                  placeholder="Ingrese DNI"
                  name="DNI"
                  value={DNI}
                  onChange={onInputChange}
                />
              </div>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example3cg">
                  Telefono
                </label>
                <input
                  type="text"
                  className="form-control "
                  placeholder="Ingrese telefono"
                  name="telefono"
                  value={telefono}
                  onChange={onInputChange}
                />
              </div>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example3cg">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control "
                  placeholder="Ingrese username"
                  name="username"
                  value={username}
                  onChange={onInputChange}
                />
              </div>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example3cg">
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control "
                  placeholder="Ingrese contraseña"
                  name="password"
                  value={password}
                  onChange={onInputChange}
                />
              </div>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example3cg">
                  Permisos
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="rol"
                  value={rol}
                  onChange={handleSelectedRol}
                >
                  <option value="">Seleccione un permiso</option>
                  <option value="cliente">Cliente</option>
                  <option value="superAdmin">superAdmin</option>
                </select>
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
