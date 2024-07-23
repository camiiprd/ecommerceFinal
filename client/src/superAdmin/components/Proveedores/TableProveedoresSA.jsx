import React from 'react';

export const TableProveedoresSA = ({ datos, setDataToEdit, deleteProveedores }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr className="text-center">
          <th>Razon Social</th>
          <th>CUIT</th>
          <th>Email</th>
          <th>Dirección</th>
          <th>Teléfono</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {datos.map((el, index) => (
          <tr key={index} className="text-center">
            <td>{el.razonSocial}</td>
            <td>{el.CUIT}</td>
            <td>{el.mail}</td>
            <td>{el.direccion}</td>
            <td>{el.telefono}</td>
            <td className="d-flex justify-content-center gap-2">
              <button
                className="btn btn-warning"
                data-bs-toggle="modal"
                data-bs-target="#modalProveedores"
                onClick={() => setDataToEdit(el)}
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  if (window.confirm('¿Estás seguro de que quieres eliminar este proveedor?')) {
                    deleteProveedores(el.idproveedores);
                  }
                }}
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
