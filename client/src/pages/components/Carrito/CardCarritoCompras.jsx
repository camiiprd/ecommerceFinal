import React, { useEffect, useState } from "react";
import { formatearNumero } from "../../../helpers/FormatearNumero";
import { FormEntrega } from "./FormEntrega";
import { getDomiciliosUsers } from "../../../Api/domicilios";
import { UseAuth } from "../../../context/AuthProvider";
import { Link } from "react-router-dom";
import { UseCarrito } from "../../../context/CarritoContext";
import { useVentas } from "../../../context/VentasContext";
import Swal from "sweetalert2";

export const CardCarritoCompras = ({
  totalCarrito,
  metodoEnvio,
  setMetodoEnvio,
}) => {
  const { usuarios, isAutenticated } = UseAuth();
  const { carritoCompras, counter, handleResetCarrito } = UseCarrito();
  const { createVentas, getFormaDePago, formaDePago } = useVentas();
  const [domicilios, setDomicilios] = useState([]);
  const [selectedDomicilio, setSelectedDomicilio] = useState(null);
  const [selectedFormaPago, setSelectedFormaPago] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const getDomicilios = async () => {
    const { data } = await getDomiciliosUsers();
    if (!data) return;
    setDomicilios(data);
  };

  useEffect(() => {
    getDomicilios();
    getFormaDePago();
  }, []);

  const handleFormSubmit = (data) => {
    setDomicilios([...domicilios, data]);
    setSelectedDomicilio(data);
    setShowForm(false);
  };

  const handleAgregardireccion = () => {
    setShowForm(true);
    setSelectedDomicilio(null);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  const filterDomicilios =
    domicilios && usuarios
      ? domicilios.filter((el) => el.idusuarios === usuarios.idusuarios)
      : [];

  const domicilioEntrega = filterDomicilios.find(
    (el) => el.idDomicilio === Number(selectedDomicilio)
  );

 

  const btnFinalizarCompras = () => {
    if (selectedFormaPago === null) {
      Swal.fire({
        title: "Debes seleccionar una forma de pago",
        icon: "error",
      });
      return;
    }
    if (metodoEnvio === "envio" && (selectedDomicilio === null || !domicilioEntrega)) {
      Swal.fire({
        title: "El campo domicilio es obligatorio",
        text:"Si no tienes un domicilio aun guardado, debes crear uno para llevar tu compra a destino",
        icon: "error"
      });
      return;
    }

    let metodoEnvioSet =
      metodoEnvio === "retiro"
        ? "retiro"
        : `${domicilioEntrega.calle} ${domicilioEntrega.numero} ${domicilioEntrega.descripcion}`;

    const ventaData = carritoCompras.map((el) => ({
      precioUni: Number(el.precio),
      cantidad: counter[el.idproductos],
      entrega: metodoEnvioSet,
      idusuarios: usuarios.idusuarios,
      idformaDePago: selectedFormaPago,
      idproductos: el.idproductos,
      idDomicilio: selectedDomicilio,
    }));

  
    createVentas(ventaData);
    handleResetCarrito();
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Compra exitosa",
      text: "Para mas info ve a la seccion mis compras",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <>
      <div className="checkout">
        <h2 className="text-black">Totales del carrito</h2>
        <div className="subtotal">
          <span>Subtotal:</span>
          <span>
            {formatearNumero(totalCarrito) ? formatearNumero(totalCarrito) : 0}
          </span>
        </div>
        <div className="shipping">
          <span>Envío:</span>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              value="retiro"
              checked={metodoEnvio === "retiro"}
              onChange={(e) => setMetodoEnvio(e.target.value)}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Retiro en tienda
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              value="envio"
              checked={metodoEnvio === "envio"}
              onChange={(e) => setMetodoEnvio(e.target.value)}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              Envio a domicilio
            </label>
          </div>
        </div>
        {metodoEnvio === "envio" && !showForm && (
          <>
            {!isAutenticated && (
              <div className="container mt-3">
                <div className="row">
                  <h2>Tienes que tener un Usuario para compras</h2>
                  <div className="col mt-3 d-flex gap-2 justify-content-center">
                    <Link className="btn btn-primary" to={"/registro"}>
                      {" "}
                      Registro{" "}
                    </Link>
                    <Link className="btn btn-success" to={"/login"}>
                      {" "}
                      Login{" "}
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {filterDomicilios.length > 0 && (
              <div className="mb-3">
                <label htmlFor="selectDomicilio" className="form-label">
                  Seleccionar Dirección de Envío
                </label>
                <select
                  className="form-select"
                  id="selectDomicilio"
                  onChange={(e) => setSelectedDomicilio(e.target.value)}
                >
                  <option value="">Selecciones un domiclio</option>
                  {filterDomicilios.map((domicilio, index) => (
                    <option key={index} value={domicilio.idDomicilio}>
                      {`${domicilio.calle} ${domicilio.numero}, ${domicilio.descripcion}`}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-secondary mt-3"
                onClick={handleAgregardireccion}
                hidden={!isAutenticated && true}
              >
                {filterDomicilios.length > 0
                  ? "+Agregar"
                  : "Agregar direccion de envio"}
              </button>
            </div>
          </>
        )}
        {showForm && (
          <FormEntrega
            onFormSubmit={handleFormSubmit}
            onCancel={handleCancel}
            getDomicilios={getDomicilios}
          />
        )}
        {/* Forma de pagos */}
        <div className="mt-3">
          <label htmlFor="selectDomicilio" className="form-label">
            Selecciones una forma de pago
          </label>
          <select
            className="form-select"
            id="selectedFormaDePago"
            onChange={(e) => setSelectedFormaPago(e.target.value)}
            disabled={isAutenticated ? false : true}
          >
            <option value="">Selecciones un metodo de pago</option>
            {formaDePago.map((el) => (
              <option key={el.idformaDePago} value={el.idformaDePago}>
                {el.medioDePago}
              </option>
            ))}
          </select>
        </div>
        {/* End Forma de pagos */}

        <div className={metodoEnvio === "envio" ? "total mt-4" : "total"}>
          <span>Total:</span>
          <span>
            {formatearNumero(totalCarrito) ? formatearNumero(totalCarrito) : 0}
          </span>
        </div>
        <div className="d-grid">
          <button
            className="btn btn-primary"
            onClick={btnFinalizarCompras}
            disabled={!isAutenticated && true}
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </>
  );
};
