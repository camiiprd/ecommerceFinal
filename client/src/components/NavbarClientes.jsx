import React, { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UseCarrito } from "../context/CarritoContext.jsx";
import "./styles/styles.css";
import { UseAuth } from "../context/AuthProvider.jsx";
import { useCategorias } from "../context/CategoriasContext.jsx";

export const NavBarClientes = () => {
  const { carritoCompras } = UseCarrito();
  const { usuarios, isAutenticated, logout, loading } = UseAuth();
  const { categorias } = useCategorias();

  const [pulse, setPulse] = useState(false);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (carritoCompras.length > 0) {
      setPulse(true);
    } else {
      setPulse(false);
    }
  }, [carritoCompras, loading]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?query=${search}`);
    }
  };

  return (
    <div className="navbar-wrapper d-flex justify-content-around">
      <Navbar bg="light" expand="lg" className="navbar-custom">
        <Navbar.Brand as={Link} to="/" className="navbar-brand-custom">
          Supermercado Online
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown
              title="Categorías"
              id="basic-nav-dropdown"
              className="nav-link-custom"
            >
              {categorias.map((el) => (
                <NavDropdown.Item as={Link} to="#" key={el.idcategoria}>
                  {el.nombreCat}
                </NavDropdown.Item>
              ))}
              
            </NavDropdown>
            <Nav.Link as={Link} to="/contacto" className="nav-link-custom">
              Contacto
            </Nav.Link>
          </Nav>
          <Form className="mr-auto d-flex" onSubmit={handleSearch}>
            {" "}
            {/* Agregamos la clase "mr-auto" para alinear a la izquierda */}
            <FormControl
              type="text"
              placeholder="Buscar"
              className="mr-sm-2 form-control-custom"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant="outline-success ms-2" type="submit">
              Buscar
            </Button>
          </Form>
          <Nav className="ml-auto">
            {" "}
            {/* Agregamos la clase "ml-auto" para alinear a la derecha */}
            <Nav.Link
              as={Link}
              to="/carrito"
              className={`position-relative ${pulse ? "pulse" : ""}`}
            >
              <i className="fa-solid fa-cart-shopping"></i> Carrito
              {carritoCompras.length > 0 && (
                <span className="card-badge"></span>
              )}
            </Nav.Link>
            {isAutenticated ? (
              <NavDropdown
                title={usuarios ? usuarios.username : "User"}
                id="basic-nav-dropdown"
                className="nav-link-custom"
              >
                <NavDropdown.Item as={Link} to="/configuracion">
                  Configuracion
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/compras">
                  Mis compras
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="#" onClick={() => logout()}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown
                title="Cuenta"
                id="basic-nav-dropdown"
                className="nav-link-custom"
              >
                <NavDropdown.Item as={Link} to="/registro">
                  Registrarse
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/login">
                  Login
                </NavDropdown.Item>
              </NavDropdown>
            )}
            {isAutenticated && usuarios.rol === "superAdmin" && (
              <Nav.Link
                as={Link}
                to="/superAdmin/dashboard"
                className="nav-link-custom"
              >
                Ir dashboard
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};
