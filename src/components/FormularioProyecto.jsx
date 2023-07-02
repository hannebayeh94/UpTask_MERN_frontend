import React, { useEffect, useState } from "react";
import useProyectos from "../hooks/useProyectos";
import { Alerta } from "./Alerta";
import { useParams } from "react-router-dom";

export const FormularioProyecto = () => {
  const [id, setId] = useState(null);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaEntrega, setFechaEntrega] = useState("");
  const [cliente, setCliente] = useState("");

  const params = useParams();
  const { mostrarAlerta, alerta, submitProyecto, proyecto } = useProyectos();

  useEffect(() => {
    if (params.id) {
      setId(proyecto._id);
      setNombre(proyecto.nombre);
      setDescripcion(proyecto.descripcion);
      setFechaEntrega(proyecto.fechaEntrega?.split("T")[0]);
      setCliente(proyecto.cliente);
    }
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombre, descripcion, fechaEntrega, cliente].includes("")) {
      mostrarAlerta({
        msg: "Todos los campos son obligarotios",
        error: true,
      });

      return;
    }

    // pasar los datos
    await submitProyecto({
      id,
      nombre,
      descripcion,
      fechaEntrega,
      cliente,
    });

    setId(null);
    setNombre("");
    setDescripcion("");
    setFechaEntrega("");
    setCliente("");
  };

  const { msg } = alerta;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
    >
      {msg && <Alerta alerta={alerta} />}

      {/* nombre */}
      <div className="mb-5">
        <label
          htmlFor="nombre"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Nombre Proyecto
        </label>
        <input
          id="nombre"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Nombre del proyecto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      {/* descripcion */}
      <div className="mb-5">
        <label
          htmlFor="descripcion"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Descripcion
        </label>
        <textarea
          id="descripcion"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Descripcion del proyecto"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>

      {/* fecha de entrega */}
      <div className="mb-5">
        <label
          htmlFor="fecha"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Fecha de entrega
        </label>
        <input
          id="fecha"
          type="date"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Nombre del proyecto"
          value={fechaEntrega}
          onChange={(e) => setFechaEntrega(e.target.value)}
        />
      </div>

      {/* cliente */}
      <div className="mb-5">
        <label
          htmlFor="cliente"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Cliente del proyecto
        </label>
        <input
          id="cliente"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Nombre del proyecto"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
        />
      </div>

      <input
        type="submit"
        value={params.id ? "Actualizar proyecto" : "crear Proyecto"}
        className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded hover:bg-sky-700 hover:cursor-pointer transition-colors"
      />
    </form>
  );
};
