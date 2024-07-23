import axios from "../Api/axios.js";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useVentas } from "../context/VentasContext.jsx";
import { formatearNumero } from "../helpers/FormatearNumero.js";
import { sumarTotalesDetallesVentas } from "../helpers/SumarTotalesCarrito.js";

export const ComprasDetallesPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { detalleVentas, getIdDetalleVentas, ventas, getVentas } = useVentas();

  useEffect(() => {
    const getIdDetalleVentasApi = async (id) => {
      getIdDetalleVentas(id);
    };
    getIdDetalleVentasApi(id);
    getVentas();
  }, [id]);

  const filteVentas = ventas.filter((el) => el.idventas === Number(id));

  const numeroFactura =
    filteVentas.length > 0 ? filteVentas[0].numeroFactura : "Sin datos";

  const entrega = filteVentas.length > 0 ? filteVentas[0].entrega : "Sin datos";

  const medioDePago = filteVentas.length > 0 ? filteVentas[0].mediodepago : "Sin datos"

  const { totalDetalleVenta } = sumarTotalesDetallesVentas(detalleVentas);

  return (
    <div className="container">
      <h3 className="mt-5">Numero Factura #{numeroFactura}</h3>
      <div className="row mt-5">
        <div className="col-12">
          <table className="table text-center">
            <thead className="table-light">
              <tr>
                <th>Img</th>
                <th>Producto</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {detalleVentas.map((el, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={el.img}
                      alt={el.nombre}
                      style={{ maxWidth: "50px" }}
                    />
                  </td>
                  <td>
                    {el.nombre} <b> x {el.cantidad}</b>
                  </td>
                  <td>{formatearNumero(el.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="row">
        <div className="col-12 d-flex justify-content-end">
          <div className="card mb-3">
            <div className="card-body">
              {/* <h5 className="card-title">Card title</h5> */}
              <p className="card-text">
                <b>Subtotal</b>: {totalDetalleVenta}
              </p>
              <p className="card-text">
                <b>Envio</b> {entrega}
              </p>
              <p className="card-text">
                <b>Metodo de pago</b>: {medioDePago}
              </p>
              <p className="card-text">
                <b>Total</b>: {totalDetalleVenta}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
