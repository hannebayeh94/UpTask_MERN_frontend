import { FormularioProyecto } from "../components/FormularioProyecto";

export const NuevoProyecto = () => {
  return (
    <>
      <h1 className="text-4xl font-black">Crear Proyectos</h1>

      <div className="mt-10 flex justify-center">
        <FormularioProyecto />
      </div>
    </>
  );
};
