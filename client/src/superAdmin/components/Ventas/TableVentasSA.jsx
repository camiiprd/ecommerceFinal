import React, { useEffect } from "react";
import { formatearNumero } from "../../../helpers/FormatearNumero";
import "./styles/styles.css";
import { useNavigate } from "react-router-dom";
import { useVentas } from "../../../context/VentasContext";

export const TableVentasSA = ({ datos = [], updateEstado }) => {
  const { getVentas } = useVentas();
  const navigate = useNavigate();

  useEffect(()=>{
    getVentas()
  },[])

  const handleNavigate = (id) => {
    navigate(`/superAdmin/ventas/${id}`);
  };


  return (
    <div className="row ">
      <div className="col-sm-12">
        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table ">
                <thead>
                  <tr className="text-center">
                    <th>Fecha</th>
                    <th>Factura</th>
                    <th>Estado</th>
                    <th>Entrega</th>
                    <th>Total</th>
                    <th>Pago</th>
                    <th>Apellido</th>
                    <th>Nombre</th>
                    <th>Telefono</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {datos.map((el, index) => (
                    <tr key={index} className="text-center">
                      <td>{el.fecha}</td>
                      <td>{el.numeroFactura}</td>
                      <td>{el.estado.toUpperCase()}</td>
                      <td>{el.entrega}</td>
                      <td>{formatearNumero(el.total)}</td>
                      <td>{el.mediodepago}</td>
                      <td>{el.apellido}</td>
                      <td>{el.nombre}</td>
                      <td>{el.telefono}</td>

                      <td className="d-flex justify-content-center gap-2">
                        <button
                          className="btn btn-info"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModalProductos"
                          title="Ver detalle"
                          onClick={() => handleNavigate(el.idventas)}
                        >
                          <i className="fa-solid fa-eye"></i>
                        </button>
                        {el.estado === "pendiente" ? (
                          <button
                            className="btn btn-warning"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModalProductos"
                            title="Completar venta"
                            hidden = {el.estado === "anulado" && true}
                            onClick={() =>
                              updateEstado(
                                el.idventas,
                                "completado",
                                "pendiente"
                              )
                            }
                          >
                            <i className="fa-solid fa-pen"></i>
                          </button>
                        ) : (
                          <button
                            className="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModalProductos"
                            title="Volver venta a pendiente"
                            hidden = {el.estado === "anulado" && true}
                            onClick={() =>
                              updateEstado(
                                el.idventas,
                                "pendiente",
                                "completado"
                              )
                            }
                          >
                            <i className="fa-solid fa-backward-fast"></i>
                          </button>
                        )}

                        <button
                          className="btn btn-danger"
                          hidden={el.estado === "anulado" || el.estado ==="completado" && true}
                          onClick={() =>
                            updateEstado(el.idventas, "anulado", "anular")
                          }
                        >
                          <i className="fa-solid fa-eraser"></i>
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
    </div>
  );
};
