import React from "react";
import { formatearNumero } from "../../helpers/FormatearNumero";
import { Link, useNavigate } from "react-router-dom";
import { UseCarrito } from "../../context/CarritoContext";

export const CardProductos = ({ data }) => {
  const { addToCarrito, deleteProducto, chekingProductoCarrito } = UseCarrito();
  const navigate = useNavigate();

  const handleNavigate = (id) => {
    navigate(`/productos/${id}`);
  };

  return (
    <>
      {data.map((datos) => {
        const productoEncontrado = chekingProductoCarrito(datos);
        return (
          <div
            className="col-lg-2 col-md-4 col-sm-6 mb-4 mt-5 producto-hover"
            key={datos.idproductos}
          >
            <div className="card h-100">
              <img
                src={datos.img}
                className="card-img-top product-image"
                alt={datos.nombre}
                onClick={() => handleNavigate(datos.idproductos)}
              />
              <div className="card-body">
                <h5 className="card-title">{datos.nombre}</h5>
                <p className="card-text" style={{ color: "black" }}>
                  {formatearNumero(datos.precio)}
                </p>
                {datos.stock <= 0 ? (
                  <p className="card-text text-danger">
                    <i className="fa-regular fa-face-tired"></i>{" "}
                    Sin Stock
                  </p>
                ) : (
                  <p className="card-text text-success">
                    <i className="fa-regular fa-face-smile"></i>{" "}
                    {`${datos.stock} disponibles`}
                  </p>
                )}
                <div className="cont d-flex gap-2 align-items-center">
                  {productoEncontrado ? (
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteProducto(datos.idproductos)}
                    >
                      <i className="fa-solid fa-x"></i>
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary"
                      disabled={datos.stock <= 0 ? true : false}
                      onClick={() => addToCarrito(datos)}
                    >
                      <i className="fa-solid fa-cart-shopping"></i>
                    </button>
                  )}

                  <Link
                    to={`/productos/${datos.idproductos}`}
                    className="btn btn-success"
                  >
                    <i className="fa-solid fa-right-long"></i>
                  </Link>

                  {productoEncontrado ? (
                    <Link
                      className="btn btn-outline-info"
                      title="Ver Carrito"
                      to={"/carrito"}
                    >
                      <i className="fa-solid fa-eye"></i>
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
