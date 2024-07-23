import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useVentas } from "../context/VentasContext.jsx";
import { UseAuth } from "../context/AuthProvider.jsx";
import { formatearNumero } from "../helpers/FormatearNumero.js";

export const ComprasPage = () => {
 
  const { usuarios } = UseAuth();
  const { ventas, getVentas } = useVentas();


  
  useEffect(()=>{
    getVentas()
  },[])

 
  const ventasUsuarios = ventas.filter(el=> el.idusuarios === usuarios.idusuarios);
  console.log(ventas)


  return (
    <div className="container">
      <h3 className="mt-5">Mis pedidos</h3>
      <div className="row mt-3">
        <div className="col-12">
          <table className="table">
            <thead>
              <tr>
                <th>Factura</th>
                <th>Fecha</th>
                <th>Estado</th>
                {/* <th>Entrega</th> */}
                <th>Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ventasUsuarios.map((el) => (
                
                <tr key={el.idventas}>
                  <td>{el.numeroFactura}</td>
                  <td>{el.fecha}</td>
                  <td>{el.estado}</td>
                  {/* <td>{el.entrega}</td> */}
                  <td>{formatearNumero(el.total)}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <Link className="btn btn-info" to={`/compras/${el.idventas}`}> <i className="fa-solid fa-eye"></i> Ver</Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
