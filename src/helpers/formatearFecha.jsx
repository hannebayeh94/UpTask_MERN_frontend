export const formatearFecha = (fecha) => {
  let nuevaFecha;
  if (fecha.includes("T00:00:00.000Z")) {
    const fechaSplit = fecha.split("T")[0].split("-");
    const año = parseInt(fechaSplit[0]);
    const mes = parseInt(fechaSplit[1]) - 1; // Los meses en JavaScript comienzan desde 0 (enero = 0)
    const dia = parseInt(fechaSplit[2]);
    nuevaFecha = new Date(año, mes, dia);
  } else {
    nuevaFecha = new Date(fecha);
  }
  const opciones = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const idioma = "es-ES";
  return nuevaFecha.toLocaleDateString(idioma, opciones);
};
