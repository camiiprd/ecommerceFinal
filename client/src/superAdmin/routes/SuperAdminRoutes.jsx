import React from "react";
import { Route, Routes } from "react-router-dom";
import { Dash } from "../pages/DashboardSA";
import { NavbarSuperAdmin } from "../../components";

import { UsuariosPagesSA } from "../pages/Usuarios/UsuariosPagesSA";
import { ProveedoresPageSA } from "../pages/Proveedores/ProveedoresPageSA";
import { ProductosPageSA } from "../pages/Productos/ProductosPageSA";
import { HomeSuperAdmin } from "../pages/HomeSuperAdmin";
import { VentasPage } from "../pages/Ventas/VentasPage";
import { DetalleVentasPage } from "../pages/Ventas/DetalleVentasPage";
import { CategoriasPageSA } from "../pages/CategoriasPageSA";
import { UsuariosDetallesPages } from "../pages/Usuarios/UsuariosDetallesPages";

export const SuperAdminRoutes = () => {
  return (
    <div
      className="container-fluid"
      style={{ height: "100vh", display: "flex" }}
    >
      <div className="row flex-nowrap" style={{ width: "100%" }}>
        <div className="col-2 p-0">
          <NavbarSuperAdmin />
        </div>
        <div className="col-10">
          <Routes>
            <Route path="/" element={<HomeSuperAdmin />} />
            <Route path="dashboard" element={<Dash />} />
            <Route path="usuarios" element={<UsuariosPagesSA />} />
            <Route path="productos" element={<ProductosPageSA />} />
            <Route path="proveedores" element={<ProveedoresPageSA />} />
            <Route path="ventas" element={<VentasPage />} />
            <Route path="ventas/:id" element={<DetalleVentasPage />} />
            <Route path="categorias" element={<CategoriasPageSA />} />
            <Route path="usuarios/:id" element={<UsuariosDetallesPages />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
