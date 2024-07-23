import React from "react";
import { CardInfoSA } from "../components/Dashboard/CardInfoSA";
import { GraficaSA } from "../components/Dashboard/GraficasSA";
import { LinesChart } from "../components/Dashboard/GraficaLineVentasSA";
import { StockCritico } from "../components/Dashboard/StockCritico";

export const Dash = () => {
  return (
    <div className="container">
      <CardInfoSA />
      <div className="row mt-5">
        <div className="col-6">
          <p className="m-2">
            <b>Ventas totales por mes</b>
          </p>
          <GraficaSA />
        </div>
        <div className="col-6">
          <p className="m-2">
            <b>Productos mas vendidos por mes</b>
          </p>
          <LinesChart />
        </div>
      </div>
      <StockCritico />
    </div>
  );
};
