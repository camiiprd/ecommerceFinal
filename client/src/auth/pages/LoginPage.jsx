import React, { useEffect, useState } from "react";
import "../styles/Form.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { UseAuth } from "../../context/AuthProvider";

const initialForm = {
  username: "",
  password: "",
};

export const LoginPage = () => {
  const { login, isAutenticated, usuarios, error } = UseAuth();
  const { username, password, onInputChange, onResetForm } =
    useForm(initialForm);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username,
      password,
    };
    await login(data);
  };

  useEffect(() => {
    if (isAutenticated && usuarios.rol === "cliente") {
      navigate("/");
    } else if (isAutenticated && usuarios.rol === "superAdmin") {
      navigate("/superAdmin");
    }
  }, [isAutenticated, usuarios]);

  return (
    <div className="wrapper fadeInDown">
      <div id="formContent">
        {/* Tabs Titles */}
        <h2 className="active">Login</h2>
        {error && error.length > 0 && (
          <div className="alert alert-danger">{error}</div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="fadeIn second input-text"
            name="username"
            placeholder="Username"
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
          <input type="submit" className="fadeIn fourth" value="Login" />
        </form>

        {/* Remind Passowrd */}
        <div id="formFooter">
          Aun no tiene cuenta? <Link to={"/registro"}>Registrarse</Link>
        </div>
      </div>
    </div>
  );
};
