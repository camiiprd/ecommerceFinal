import React from "react";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../../auth/pages/LoginPage";
import { RegisterPage } from "../../auth/pages/RegisterPage";
import { Home } from "../Home";
import { ProductoPage } from "../ProductoPage";
import { Carrito } from "../components/Carrito";
import { SearchProductos } from "../components";
import { NavBarClientes } from "../../components";
import { ConfiguracionUsuario } from "../ConfiguracionUsuario";
import { ComprasPage } from "../ComprasPage.jsx";
import { ComprasDetallesPage } from "../ComprasDetallesPage.jsx";

export const ClientesRoutes = () => {
  return (
    <div className="container-fluid">
    <NavBarClientes />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />
        <Route path="/" element={<Home />} />

        <Route path="/productos/:id" element={<ProductoPage />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/search" element={<SearchProductos />} />
        <Route path="/configuracion" element={<ConfiguracionUsuario />} />
        <Route path="/compras" element={<ComprasPage />} />
        <Route path="/compras/:id" element={<ComprasDetallesPage />} />
      </Routes>
    </div>
  );
};
