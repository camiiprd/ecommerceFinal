import React, { useEffect } from "react";
import { useVentas } from "../../../context/VentasContext";
import { useNavigate, useParams } from "react-router-dom";
import { sumarTotalesDetallesVentas } from "../../../helpers/SumarTotalesCarrito";
import { formatearNumero } from "../../../helpers/FormatearNumero";
import { Spiner } from "../../../components/Spiner";

export const DetalleVentasPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    detalleVentas,
    getIdDetalleVentas,
    loading,
    ventasIndividual,
    getIdVentas,
  } = useVentas();

  const getIdDetalleVentasApi = async (id) => {
    getIdDetalleVentas(id);
  };
  const getIdVentasApi = async (id) => {
    getIdVentas(id);
  };

  useEffect(() => {
    getIdDetalleVentasApi(id);
    getIdVentasApi(id);
  }, [id]);

   const {fecha, numeroFactura, estado, entrega, mediodepago, apellido, nombre, telefono, calle, numero,descripcion} = ventasIndividual;
 

  const { totalDetalleVenta } = sumarTotalesDetallesVentas(detalleVentas);

  return (
    <>
      {loading ? (
        <Spiner />
      ) : (
        <div className="container">
          <h3 className="mt-5">Numero Factura #{numeroFactura}</h3>
          <h4 className="mt-5">Estado {estado}</h4>
          <div className="row">
            <div className="col-12">Fecha: {fecha} </div>
            <div className="col-12">Cliente: {apellido} {nombre} </div>
            <div className="col-12">Telefono: {telefono}</div>
            <div className="col-12">Direccion: {calle} {numero} {descripcion}</div>
          </div>
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
                  <p className="card-text"><b>Envio</b> {entrega}</p>
                  <p className="card-text">
                    <b>Metodo de pago</b>: {mediodepago}
                  </p>
                  <p className="card-text">
                    <b>Total</b>: {totalDetalleVenta}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
