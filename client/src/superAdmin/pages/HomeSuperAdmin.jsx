import axios from "axios";
import React, { useEffect, useState } from "react";
// import { UsuariosSA } from "../components/Usuarios/UsuariosSA";
import "../components/Dashboard/styles.css";
import { UseAuth } from "../../context/AuthProvider";
import { TablePersonailzada } from "../../components/TablePersonailzada";

const btnEditar = ({ rowData }) => {
  const handleEditar = (data) => {
    console.log(data);
  };
  return (
    <button className="btn btn-warning" onClick={() => handleEditar(rowData)}>
      <i className="fa-solid fa-pen-to-square"></i>
    </button>
  );
};

const btnEliminar = ({ rowData }) => {
  const handleEliminar = (id) => {
    console.log(id);
  };
  return (
    <button
      className="btn btn-danger"
      onClick={() => handleEliminar(rowData.idusuarios)}
    >
      <i className="fa-solid fa-delete-left"></i>
    </button>
  );
};

export const HomeSuperAdmin = () => {
  // const [usuarios, setUsuarios] = useState([]);
  const { usuarios, usuariosAll, getUsuariosAll } = UseAuth();

  useEffect(() => {
    const getUsuarios = async () => {
      await getUsuariosAll();
    };
    getUsuarios();
  }, []);

  const titles = [
    { key: "apellido", title: "Apellido" },
    { key: "nombre", title: "Nombre" },
    { key: "username", title: "Username" },
    { key: "rol", title: "Rol" },
  ];

  const acciones = [btnEditar, btnEliminar];

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-12 d-flex justify-content-center">
          <div className="card w-75 mb-3 bg-ventas text-white">
            <div className="card-body">
              <h5 className="card-title">Bienvenido {usuarios.username}</h5>
              <p className="card-text mt-3">
                <i className="fa-solid fa-user-tie"></i> {usuarios.username}
              </p>
              <p className="card-text">
                <i className="fa-solid fa-briefcase"></i> {usuarios.rol}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-sm-12">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div
                  className="card-header"
                  style={{ backgroundColor: "#0d6efd", color: "white" }}
                >
                  Usuarios ADMIN
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-10">
                      <div className="form-group">
                        <label form="nro_documento">Buscar Admin</label>
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
                          data-bs-target="#exampleModal"
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
              {/* <UsuariosSA datos={usuarios} /> */}
              <div className="card">
                <div className="card-body">
                  <TablePersonailzada
                    data={usuariosAll}
                    columns={titles}
                    actions={acciones}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
