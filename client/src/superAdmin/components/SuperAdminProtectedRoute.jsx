import React from 'react'
import { UseAuth } from '../../context/AuthProvider'
import { Spiner } from '../../components/Spiner';
import { Navigate, Outlet } from 'react-router-dom';

export const SuperAdminProtectedRoute = () => {
   const { isAutenticated, loading ,usuarios} = UseAuth();
   const rolSuperAdmin = usuarios ? usuarios.rol : "superAdmin";
   if(loading) return <Spiner/>
   if(!(loading && !isAutenticated) && rolSuperAdmin !== "superAdmin") return <Navigate to={"/login"} replace/>
   if( isAutenticated && rolSuperAdmin === "superAdmin") return <Outlet />
}
