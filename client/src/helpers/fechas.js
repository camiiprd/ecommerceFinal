export const getFecha = () => {
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const diasSemana = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  const fechaHoy = new Date();
  const mesActual = fechaHoy.getMonth();
  const nombreMesActual = meses[mesActual];
  const anioActual = new Date().getFullYear();
  const nombreDia = diasSemana[fechaHoy.getDay()];

  return {
    nombreMesActual,
    anioActual,
    nombreDia,
  };
};
