import React from "react";
import { UseProductos } from "../../../context/ProductosContext";
import { Spiner } from "../../../components";
import { formatearNumero } from "../../../helpers/FormatearNumero";
import { useNavigate } from "react-router-dom";

export const TableProductosSA = ({ datos = [], setDataToEdit, deleteProductos }) => {
  const { loading } = UseProductos();
  const navigate = useNavigate();

  const handleNavigate= (id)=>{
    navigate(`/productos/${id}`)
  }
  
  return (
    <>
      {loading ? (
        <div className="container d-flex justify-content-center mt-5">
          <Spiner />
        </div>
      ) : (
        <div className="row ">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-body">
                <table className="table">
                  <thead>
                    <tr className="text-center">
                      <th>Img</th>
                      <th>Nombre</th>
                      <th>Precio</th>
                      <th>Descripcion</th>
                      <th>Stock</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datos.map((el,index) => (
                      <tr key={index} className="text-center">
                        <td>
                          <img
                            src={el.img}
                            alt={el.nombre}
                            style={{ maxWidth: "50px", cursor:"pointer" }}
                            onClick={()=> handleNavigate(el.idproductos)}
                          />
                        </td>
                        <td>{el.nombre}</td>
                        <td>{el.descripcion}</td>
                        <td>{formatearNumero(el.precio)}</td>
                        <td>{el.stock}</td>

                        <td className="d-flex justify-content-center gap-2">
                          <button
                            className="btn btn-warning"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModalProductos"
                            onClick={() => setDataToEdit(el)}
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                          <button 
                          className="btn btn-danger"
                          onClick={()=> deleteProductos(el.idproductos)}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
