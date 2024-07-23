import React, { useEffect } from "react";
import "../styles/Form.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { UseAuth } from "../../context/AuthProvider";
import Swal from "sweetalert2";

const initialForm = {
  nombre: "",
  apellido: "",
  email: "",
  DNI: "",
  telefono: "",
  username: "",
  password: "",
};

export const RegisterPage = () => {
  const {
    nombre,
    apellido,
    email,
    DNI,
    telefono,
    username,
    password,
    onInputChange,
    onResetForm,
  } = useForm(initialForm);

  const { registro, error, isAutenticated } = UseAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      nombre,
      apellido,
      email,
      DNI,
      telefono,
      username,
      password,
    };
    if (
      !nombre ||
      !apellido ||
      !email ||
      !DNI ||
      !telefono ||
      !username ||
      !password
    ) {
      Swal.fire({
        title: "Los campos no pueden ir vacios",
        text: "Todos los campos son obligatorios",
        icon: "error",
      });
      return;
    }
    await registro(data);
  };

  useEffect(() => {
    if (isAutenticated) {
      navigate("/");
    }
  }, [isAutenticated]);

  return (
    <div className="wrapper fadeInDown">
      <div id="formContent">
        {/* Tabs Titles */}
        <h2 className="active">Registro</h2>
        {error && error.length > 0 && (
          <div className="alert alert-danger">{error}</div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="fadeIn second input-text"
            name="nombre"
            placeholder="Nombre"
            value={nombre}
            onChange={onInputChange}
          />
          <input
            type="text"
            className="fadeIn second input-text"
            name="apellido"
            placeholder="Apellido"
            value={apellido}
            onChange={onInputChange}
          />
          <input
            type="email"
            className="fadeIn second input-text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={onInputChange}
          />
          <input
            type="text"
            className="fadeIn second input-text"
            name="DNI"
            placeholder="DNI"
            value={DNI}
            onChange={onInputChange}
          />

          <input
            type="text"
            className="fadeIn second input-text"
            name="telefono"
            placeholder="telefono"
            value={telefono}
            onChange={onInputChange}
          />
          <input
            type="text"
            className="fadeIn second input-text"
            name="username"
            placeholder="Usuario"
            value={username}
            onChange={onInputChange}
          />
          <input
            type="password"
            className="fadeIn second input-text"
            name="password"
            placeholder="Contraseña"
            value={password}
            onChange={onInputChange}
          />
          <input type="submit" className="fadeIn fourth" value="Registarse" />
        </form>

        {/* Remind Passowrd */}
        <div id="formFooter">
          Ya tiene cuenta? <Link to={"/login"}>Login</Link>
        </div>
      </div>
    </div>
  );
};
