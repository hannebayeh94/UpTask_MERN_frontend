import { formatearFecha } from "../helpers/formatearFecha";
import useAdmind from "../hooks/useAdmind";
import useProyectos from "../hooks/useProyectos";

export const Tarea = ({ tarea }) => {
  const { handleModalEditarTarea, handleModalEliminarTarea, completarTarea } =
    useProyectos();

  const { _id, descripcion, nombre, prioridad, fechaEntrega, estado } = tarea;

  const admind = useAdmind();

  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div className="flex flex-col items-start">
        <p className="mb-1 text-xl">{nombre}</p>
        <p className="mb-1 text-sm text-gray-500 uppercase">{descripcion}</p>
        <p className="mb-1 text-xl">{formatearFecha(fechaEntrega)}</p>
        <p className="mb-1 text-gray-600">Prioridad: {prioridad}</p>
        {estado && (
          <p className="p-1 text-xs rounded-lg text-white bg-green-500 font-bold uppercase">
            Completado por: {tarea.completado.nombre}
          </p>
        )}
      </div>
      <div className="flex flex-col lg:flex-row gap-2">
        {/* boton editar */}

        {admind && (
          <button
            onClick={() => handleModalEditarTarea(tarea)}
            className="bg-indigo-600 px-4 py-3 text-white font-bold text-sm rounded-lg"
          >
            Editar
          </button>
        )}

        <button
          className={`${
            estado ? "bg-sky-600" : "bg-gray-600"
          } px-4 py-3 text-white font-bold text-sm rounded-lg`}
          onClick={() => completarTarea(_id)}
        >
          {estado ? "Completa" : "Imcompleta"}
        </button>

        {/* boton eliminar  */}
        {admind && (
          <button
            className="bg-red-600 px-4 py-3 text-white font-bold text-sm rounded-lg"
            onClick={() => handleModalEliminarTarea(tarea)}
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};
