import React, { useEffect } from "react";
import './styles.css'
import { useVentas } from "../../../context/VentasContext";
import { sumarTotalesDetallesVentas, sumarVentasPorMes } from "../../../helpers/SumarTotalesCarrito";
import { UseAuth } from "../../../context/AuthProvider";
import { getFecha } from "../../../helpers/fechas";

export const CardInfoSA = () => {

  const { ventas, getVentas } = useVentas();
  const { usuariosAll, getUsuariosAll } = UseAuth();
  const { totalDetalleVenta } = sumarTotalesDetallesVentas(ventas)
  const { totalVentasPorMes } = sumarVentasPorMes(ventas);
  const { nombreMesActual, anioActual } = getFecha();

  useEffect(()=>{
    getVentas()
    getUsuariosAll()
  },[])

  const userCliente = usuariosAll.filter(el=> el.rol === "cliente");


  return (
    <>
      <div className="row mt-5 justify-content-center">
        <div className="col-lg-4 col-md-4 col-sm-12">
          <div
            className="card mb-3 bg-ventas text-white"
            style={{ maxWidth: "20rem"}}
          >
            <div className="card-header bg-transparent ">
              <b>Ventas Totales</b>
            </div>
            <div className="card-body">
              <h5 className="card-title ">Total</h5>
              <p className="card-text ">{ totalDetalleVenta }</p>
            </div>
            <div className="card-footer bg-transparent ">
              Este valor es dinamico
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12">
          <div
            className="card bg-clientes mb-3 text-white"
            style={{ maxWidth: "20rem" }}
          >
            <div className="card-header bg-transparent">
              <b> Clientes totales</b>
            </div>
            <div className="card-body">
              <h5 className="card-title">Activdad de clientes</h5>
              <p className="card-text"><b>{userCliente.length} clientes activos</b></p>
            </div>
            <div className="card-footer bg-transparent ">
              Este valor es dinamico
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12">
          <div
            className="card  bg-productos mb-3 text-white"
            style={{ maxWidth: "20rem" }}
          >
            <div className="card-header bg-transparent ">
              <b>Ventas por mes</b>
            </div>
            <div className="card-body">
              <h5 className="card-title">Mes {nombreMesActual} de {anioActual}</h5>
              <p className="card-text"> <b>{totalVentasPorMes}</b></p>
            </div>
            <div className="card-footer bg-transparent ">
              Este valor es dinamico
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
