import React from "react";
import { Link, useLocation } from 'react-router-dom';

export const NavbarSuperAdmin = () => {
  const location = useLocation();

  return (
    <div
      className="d-flex flex-column p-3 bg-light"
      style={{ width: "280px", height: "100vh" }}
    >
      <Link
        to={"/superAdmin"}
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
      >
        <svg className="bi me-2" width="40" height="32">
          <use xlinkHref="#bootstrap"></use>
        </svg>
        <span className="fs-4">Super Online</span>
      </Link>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to="/superAdmin" className={`nav-link ${location.pathname === '/superAdmin' ? 'active' : 'link-dark'}`} aria-current="page">
            <svg className="bi me-2" width="16" height="16">
              <use xlinkHref="#home"></use>
            </svg>
            Home
          </Link>
        </li>
        <li>
          <Link to="/superAdmin/dashboard" className={`nav-link ${location.pathname === '/superAdmin/dashboard' ? 'active' : 'link-dark'}`}>
            <svg className="bi me-2" width="16" height="16">
              <use xlinkHref="#speedometer2"></use>
            </svg>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/superAdmin/usuarios" className={`nav-link ${location.pathname === '/superAdmin/usuarios' ? 'active' : 'link-dark'}`}>
            <svg className="bi me-2" width="16" height="16">
              <use xlinkHref="#table"></use>
            </svg>
            Usuarios
          </Link>
        </li>
        <li>
          <Link to="/superAdmin/ventas" className={`nav-link ${location.pathname === '/superAdmin/ventas' ? 'active' : 'link-dark'}`}>
            <svg className="bi me-2" width="16" height="16">
              <use xlinkHref="#table"></use>
            </svg>
            Ventas
          </Link>
        </li>
        <li>
          <Link to="/superAdmin/productos" className={`nav-link ${location.pathname === '/superAdmin/productos' ? 'active' : 'link-dark'}`}>
            <svg className="bi me-2" width="16" height="16">
              <use xlinkHref="#grid"></use>
            </svg>
            Productos
          </Link>
        </li>
        <li>
          <Link to="/superAdmin/proveedores" className={`nav-link ${location.pathname === '/superAdmin/proveedores' ? 'active' : 'link-dark'}`}>
            <svg className="bi me-2" width="16" height="16">
              <use xlinkHref="#people-circle"></use>
            </svg>
            Proveedores
          </Link>
        </li>
        <li>
          <Link to="/superAdmin/categorias" className={`nav-link ${location.pathname === '/superAdmin/categorias' ? 'active' : 'link-dark'}`}>
            <svg className="bi me-2" width="16" height="16">
              <use xlinkHref="#speedometer2"></use>
            </svg>
            Categorias
          </Link>
        </li>
        <li>
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : 'link-dark'}`}>
            <svg className="bi me-2" width="16" height="16">
              <use xlinkHref="#people-circle"></use>
            </svg>
            Ver Wed
          </Link>
        </li>
      </ul>
      <hr />
      <div className="dropdown">
        <Link
          to="#"
          className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
          id="dropdownUser2"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="https://github.com/mdo.png"
            alt=""
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <strong>mdo</strong>
        </Link>
        <ul
          className="dropdown-menu text-small shadow"
          aria-labelledby="dropdownUser2"
        >
          <li>
            <Link className="dropdown-item" to="#">
              New project...
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="#">
              Settings
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="#">
              Profile
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <Link className="dropdown-item" to="#">
              Sign out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
