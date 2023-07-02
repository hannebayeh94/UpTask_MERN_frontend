import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Alerta } from "../components/Alerta";

import clienteAxios from "../config/clienteAxios";

export const Registrar = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombre, email, password, repetirPassword].includes("")) {
      setAlerta({
        msg: "Todos los cambios deben ser obligatorios",
        error: true,
      });

      return;
    }

    if (password !== repetirPassword) {
      setAlerta({
        msg: "los password no son iguales",
        error: true,
      });

      return;
    }

    if (password.length < 6) {
      setAlerta({
        msg: "El password debe tener minimo 6 caracteres",
        error: true,
      });

      return;
    }

    setAlerta({});

    // Crear el usuario en la api
    try {
      const { data } = await clienteAxios.post(`/usuarios`, {
        nombre,
        email,
        password,
      });

      setAlerta({
        msg: data.msg,
        error: false,
      });

      setNombre("");
      setEmail("");
      setPassword("");
      setRepetirPassword("");
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Crea tu cuenta y administra tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>

      {msg && <Alerta alerta={alerta} />}
      <form
        className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="nombre"
          >
            Nombre
          </label>
          <input
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            type="text"
            placeholder="Nombre"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            type="email"
            placeholder="Email de registro"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            type="password"
            placeholder="Password de registro"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="r-password"
          >
            Repite el password
          </label>
          <input
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            type="password"
            placeholder="Repetir tu password"
            id="r-password"
            value={repetirPassword}
            onChange={(e) => setRepetirPassword(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Crear cuenta"
          className="bg-sky-700 w-full py-3 text-white mb-5 uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          to="/"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          ¿Ya tienees una cuenta? Inicia Sesion
        </Link>

        <Link
          to="/olvide-password"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          Olvide mi contraseña
        </Link>
      </nav>
    </>
  );
};
