import React from "react";
import { Routes, Route } from "react-router-dom";
import { SuperAdminRoutes } from "../superAdmin/routes/SuperAdminRoutes.jsx";
import { ClientesRoutes } from "../pages/routes/ClientesRoutes.jsx";
import { SuperAdminProtectedRoute } from "../superAdmin/components/SuperAdminProtectedRoute.jsx";


export const AppRoutes = () => {
 
  return (
    <Routes>
      <Route path="/*" element={<ClientesRoutes />} />
      
      <Route element={<SuperAdminProtectedRoute />}>
        <Route path="/superAdmin/*" element={<SuperAdminRoutes />} />
      </Route>
    </Routes>
  );
};
