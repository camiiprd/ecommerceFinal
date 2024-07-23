import React, { useEffect, useState } from "react";
import { TableVentasSA } from "../../components/Ventas/TableVentasSA";
import { useVentas } from "../../../context/VentasContext";
import Swal from "sweetalert2";
// import { ModalEstadoVentas } from "../../components/Ventas/ModalEstadoVentas";

export const VentasPage = () => {
  const { ventas, getVentas, updateEstadoVentas } = useVentas();
  const [filterVentas, setFilterVentas] = useState([]);

  useEffect(() => {
    getVentas();
  }, []);

  useEffect(() => {
    if (filterVentas.length > 0) {
      let filterUpdateVenta = ventas.filter((venta) =>
        filterVentas.some((el) => el.idventas === venta.idventas)
      );
      setFilterVentas(filterUpdateVenta);
    }
  }, [ventas]);

  const handleBuscarFacturaInput = (e) => {
    e.preventDefault();
    const searchInput = e.target.value.toLocaleLowerCase();
    if (searchInput === "") {
      setFilterVentas(ventas);
    }
    const filterFacturaVentas = ventas.filter((el) => {
      return (
        el.numeroFactura.toLocaleLowerCase().includes(searchInput) ||
        el.estado.toLocaleLowerCase().includes(searchInput) ||
        el.mediodepago.toLocaleLowerCase().includes(searchInput) ||
        el.apellido.toLocaleLowerCase().includes(searchInput) ||
        el.nombre.toLocaleLowerCase().includes(searchInput)
      );
    });
    setFilterVentas(filterFacturaVentas);
  };

  const data = filterVentas.length > 0 ? filterVentas : ventas;

  const updateEstado = async (id, estado, comp) => {
    if (comp === "pendiente") {
      Swal.fire({
        title: "Completar venta?",
        text: "Recuerda que el pedido tiene que estar pagado y entregado al cliente",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Completar",
        denyButtonText: `No Completar`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await updateEstadoVentas(id, { estado });
          Swal.fire("Venta completada", "", "success");
          await getVentas();
        } else if (result.isDenied) {
          Swal.fire("La venta no se completó", "", "info");
        }
      });
    } else if (comp === "completado") {
      Swal.fire({
        title: "Volver la venta a pendiente?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Confirmar pendiente",
        denyButtonText: `No confirmar`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await updateEstadoVentas(id, { estado });
          Swal.fire("Accion retrotraída", "", "success");
          await getVentas();
        } else if (result.isDenied) {
          Swal.fire("La accion no se completó", "", "info");
        }
      });
    } else if (comp === "anular") {
      Swal.fire({
        title: "Estas seguro de anular esta venta?",
        text: "Recuerda que una vez anulada la venta, el stock que se resto se vuelve a sumar y esta opcion desaparecera, solo se puede utlizar una sola vez",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Confirmar anuluacion",
        denyButtonText: `No confirmar`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await updateEstadoVentas(id, { estado });
          Swal.fire("Anulacion completada", "", "success");
          await getVentas();
        } else if (result.isDenied) {
          Swal.fire("La accion no se completó", "", "info");
        }
      });
    }
  };

  return (
    <div className="container mt-3">
      <div className="row mt-5">
        <div className="col-sm-12">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div
                  className="card-header"
                  style={{ backgroundColor: "#0d6efd", color: "white" }}
                >
                  Ventas
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-10">
                      <div className="form-group">
                        <label form="nro_documento">Buscar ventas</label>
                        <input
                          type="text"
                          className="form-control form-control-xl"
                          placeholder="Ingrese numero de factura, apellido un cliente, nombre, estado, forma de pago"
                          onChange={handleBuscarFacturaInput}
                        />
                      </div>
                    </div>
                    {/* Posible boton */}
                    <div className="col-sm-2 mt-4">
                      <div className="form-group">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={()=> getVentas()}
                        >
                         <i className="fa-solid fa-arrows-rotate"></i> Refrescar
                        </button>
                      </div>
                    </div>
                    {/* End Posible boton */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <TableVentasSA datos={data} updateEstado={updateEstado} />
            </div>
          </div>
        </div>
        {/* Modal */}
        {/* <ModalEstadoVentas dataToEdit = {dataToEdit} /> */}
      </div>
    </div>
  );
};
