import React from "react";
import { Link, useLocation } from "react-router-dom";

export const UsuariosSA = ({ datos = [], setDataToEdit }) => {

  const location = useLocation();

  return (
    <div className="row ">
      <div className="col-sm-12">
        <div className="card">
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th>Rol</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Username</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {datos.map((el) => (
                  <tr key={el.idusuarios}>
                    <td>{el.rol}</td>
                    <td>{el.nombre}</td>
                    <td>{el.apellido}</td>
                    <td>{el.username}</td>
                    <th className="d-flex gap-2">
                      <Link className="btn btn-primary"
                       to={`${location.pathname}/${el.idusuarios}`}
                      >
                        <i className="fa-solid fa-eye"></i>
                      </Link>
                      <button
                        className="btn btn-warning"
                        data-bs-toggle="modal"
                        data-bs-target="#modalUsuariosSA"
                        onClick={()=> setDataToEdit(el)}
                      >
                        <i className="fa-solid fa-user-pen"></i>
                      </button>
                      <button className="btn btn-danger"
                      >
                        <i className="fa-solid fa-user-xmark"></i>
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
