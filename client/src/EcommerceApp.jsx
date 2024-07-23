import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";
import { CarritoProvider } from "./context/CarritoContext.jsx";
import { ProductoProvider } from "./context/ProductosContext.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { ProveedoresProvider } from "./context/ProveedoresContext.jsx";
import { CategoriasProvider } from "./context/CategoriasContext.jsx";
import { VentasProvider } from "./context/VentasContext.jsx";


export const EcommerceApp = () => {
  return (
    <AuthProvider>
      <VentasProvider>
        <CarritoProvider>
          <ProductoProvider>
            <ProveedoresProvider>
              <CategoriasProvider>
                <BrowserRouter>
                  <AppRoutes />
                </BrowserRouter>
              </CategoriasProvider>
            </ProveedoresProvider>
          </ProductoProvider>
        </CarritoProvider>
      </VentasProvider>
    </AuthProvider>
  );
};
