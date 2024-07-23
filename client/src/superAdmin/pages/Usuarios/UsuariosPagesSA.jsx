import React, { useEffect, useState } from "react";
import { UsuariosSA } from "../../components/Usuarios/UsuariosSA";
import { UseAuth } from "../../../context/AuthProvider";
import { ModalUsuarios } from "../../components/Usuarios/ModalUsuarios";

export const UsuariosPagesSA = () => {
  
  const { usuariosAll, getUsuariosAll } = UseAuth();
  const [dataToEdit, setDataToEdit] = useState(null);

  useEffect(() => {
    getUsuariosAll()
  }, []);

 

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
                  Clientes
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-10">
                      <div className="form-group">
                        <label form="nro_documento">Buscar clientes</label>
                        <input
                          type="text"
                          className="form-control form-control-xl"
                          placeholder="Ingrese nombre de un cliente"
                        />
                      </div>
                    </div>
                    <div className="col-sm-2 mt-4">
                      <div className="form-group">
                        <button
                          type="button"
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#modalUsuariosSA"
                          onClick={()=> setDataToEdit(null)}
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
              <UsuariosSA datos={usuariosAll} setDataToEdit= {setDataToEdit}/>
            </div>
          </div>
        </div>
      </div>
      <ModalUsuarios dataToEdit = {dataToEdit} setDataToEdit = {setDataToEdit} />
    </div>
  );
};
