import React, { useEffect } from "react";
import "./styles.css";
import { UseProductos } from "../../../context/ProductosContext";
import { TableProductosSA } from "../Productos/TableProductosSA";
import { ModalProductos } from "../Productos/ModalProductos";



export const StockCritico = () => {
  const { productos } = UseProductos();

  
  

  return (
    <div className="row mt-5">
      <div className="col-sm-12">
        <div className="card">
          <div className="card-header bg-ventas text-white">
            Informe de Stock Critico
            <input
              type="number"
              className="form-control form-control-sm"
              style={{
                maxWidth: "60px",
                display: "initial",
                marginLeft: "15px",
              }}
            />
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-sm-12">
                <div className="table-responsive">
                  <TableProductosSA datos={productos}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalProductos />
    </div>
  );
};
