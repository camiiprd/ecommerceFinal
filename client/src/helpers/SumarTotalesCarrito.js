import { formatearNumero } from "./FormatearNumero";

export const sumarTotalesCarrito = (data = [], counter = {}) => {
  let totalCarrito = 0;
  for (let i = 0; i < data.length; i++) {
    const { idproductos, precio } = data[i];
    totalCarrito += Number(precio) * (counter[idproductos] || 1);
  }
  return {
    totalCarrito,
  };
};

export const sumarTotalesDetallesVentas = (data = []) => {
  if (!data) return;
  let totalDetalleVenta = 0;
  for (let i = 0; i < data.length; i++) {
    const { total } = data[i];
    totalDetalleVenta += Number(total);
  }

  return {
    totalDetalleVenta: formatearNumero(totalDetalleVenta),
  };
};


export const sumarVentasPorMes = (data = [])=>{
  if(!data) return;
  let totalVentasPorMes = 0;
  const fechaHoy = new Date();
  const mesActual = fechaHoy.getMonth()
  const anioActual = fechaHoy.getFullYear();

  for (let i = 0; i <data.length; i++){
     const { total, fecha } = data[i]
     const fechaVenta = new Date(fecha);
     const mesVenta = fechaVenta.getMonth();
     const anioVenta = fechaVenta.getFullYear();

     if(mesVenta === mesActual && anioVenta === anioActual){
       totalVentasPorMes += Number(total)
     }
  }
  return {
     totalVentasPorMes : formatearNumero(totalVentasPorMes)
  }
}
