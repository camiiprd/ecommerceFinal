import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { UseAuth } from "../../../context/AuthProvider";

export const UsuariosDetallesPages = () => {
  const { id } = useParams();
  const { getIdUsuarios, usuarioIndividual, domiciliosUser, getIdDomicliosUser } = UseAuth();

  useEffect(() => {
    getIdUsuarios(id);
    getIdDomicliosUser(id)
  }, [id]);

  console.log(domiciliosUser)

  const { rol, nombre, apellido, email, DNI, telefono, username } = usuarioIndividual;

  return (
    <div className="container">
      <h3 className="mt-3">Informacion de Usuario</h3>
      <div className="row">
        <div className="col-12 mt-3">
          <div className="card" style={{ width: "35rem" }}>
            <div className="card-body">
              <h5 className="card-title">
                <i className="fa-solid fa-user-tie"></i> {apellido} {nombre}
              </h5>
              <h6 className="card-subtitle mb-2 text-body-secondary">
                <i className="fa-solid fa-briefcase"></i> {rol}
              </h6>
              <h6 className="card-subtitle mb-2 text-body-secondary">
                <i className="fa-solid fa-user"></i> {username}
              </h6>
              <p className="card-text">
                <i className="fa-regular fa-envelope"></i> {email}
              </p>
              <p className="card-text">
                <i className="fa-regular fa-address-card"></i> {DNI}
              </p>
              <p className="card-text">
                <i className="fa-solid fa-phone"></i> {telefono}
              </p>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12">
            <table className="table">
              <thead>
                <tr>
                  <th>Codigo Postal</th>
                  <th>Calle</th>
                  <th>Numero</th>
                  <th>Descripcion</th>
                </tr>
              </thead>
              <tbody>
                {
                    domiciliosUser.length === 0 ?(
                        <tr>
                            <td>Sin direcciones</td>
                        </tr>
                    ):(
                        domiciliosUser.map(el=>(
                            <tr key={el.idDomicilio}>
                                <td>{el.codigoPostal}</td>
                                <td>{el.calle}</td>
                                <td>{el.numero}</td>
                                <td>{el.descripcion}</td>
                            </tr>
                        ))
                    )
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
