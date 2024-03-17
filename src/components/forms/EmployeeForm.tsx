import { MessageEmployees } from "@/types/employees";
import { patchEditVal } from "@/utils/api";
import { processEnv } from "@/utils/cookies";
import Image from "next/image";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";

export default function EmployeeForm({
  dataInitial,
  setDataInitial,
  type,
}: {
  setDataInitial: Dispatch<SetStateAction<MessageEmployees | null>>;
  dataInitial: MessageEmployees | null;
  type: "insert" | "edit";
}) {
  const [dataCamb, setDataCamb] = useState<MessageEmployees | null>(null);

  const formUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (dataInitial == dataCamb) return;

    if(type === "edit"){
        await editEmployee();
    }
   
  };

  const editEmployee = async () =>{
    await patchEditVal(
        `${processEnv.back}employee/edit/${dataCamb?._id}`,
        {
          user: dataCamb?.user,
          username: dataCamb?.username,
          lastnames: dataCamb?.lastnames,
          role: dataCamb?.role,
          password: dataCamb?.password,
        },
        () => {
          setDataInitial(dataCamb);
        },
        "usuario"
      );
  }

  useEffect(() => {
    setDataCamb(dataInitial);
  }, []);

  return (
    <div className="w-full m-auto h-[100vh] overflow-auto flex justify-center ">
      <div className="w-full md:w-1/2  grid grid-rows-[auto_1fr] mb-8 h-fit">
        <div className="w-full h-[10rem] overflow-hidden object-cover relative">
          <Image
            src={"/imgs/background-profile.jpg"}
            alt="."
            height={100}
            width={900}
            className="w-full flex absolute bottom-0 h-[100%] object-cover object-bottom"
          />
        </div>
        <div className="h-full flex relative">
          <div className="z-10 flex justify-center w-full text-slate-900 absolute top-0 -translate-y-1/2">
            <div className="bg-white shadow-[0_0_20px_#fff]  rounded-full p-8">
              <svg
                className=" overflow-visible w-full h-14 flex items-center justify-center "
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
              </svg>
            </div>
          </div>
          {/* @ts-ignore */}
          <form
            className="max-w-sm mx-auto pt-10  w-full px-5 md:px-0 z-30"
            onSubmit={formUpdate}
          >
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Tu usuario
              </label>
              <input
                type="text"
                id="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="name@flowbite.com"
                onChange={(e) =>
                  //@ts-ignore
                  setDataCamb((prev) => ({
                    ...(prev || {}),
                    user: e.target.value,
                  }))
                }
                value={dataCamb?.user || ""}
                required
                disabled={dataInitial?.role === "empleado"}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Tu contraseña
              </label>
              <input
                type="password"
                id="password"
                placeholder="•••••••"
                value={dataCamb?.password}
                onChange={(e) =>
                  //@ts-ignore
                  setDataCamb((prev) => ({
                    ...(prev || {}),
                    password: e.target.value,
                  }))
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                required
                disabled={dataInitial?.role === "empleado"}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="user"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Nombres
              </label>
              <input
                type="text"
                id="user"
                value={dataCamb?.username}
                onChange={(e) =>
                  //@ts-ignore
                  setDataCamb((prev) => ({
                    ...(prev || {}),
                    username: e.target.value,
                  }))
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Juanito"
                required
                disabled={dataInitial?.role === "empleado"}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="inp_apellidos"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Apellidos
              </label>
              <input
                type="text"
                id="inp_apellidos"
                value={dataCamb?.lastnames}
                onChange={(e) =>
                  //@ts-ignore
                  setDataCamb((prev) => ({
                    ...(prev || {}),
                    lastnames: e.target.value,
                  }))
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Ba..."
                required
                disabled={dataInitial?.role === "empleado"}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Puesto
              </label>
              <select
                id="countries"
                value={dataCamb?.role.toLowerCase()}
                onChange={(e) =>
                  //@ts-ignore
                  setDataCamb((prev) => ({
                    ...(prev || {}),
                    role: e.target.value,
                  }))
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                disabled={dataInitial?.role === "empleado"}
              >
                <option value="empleado">Empleado</option>
                <option value="administrador">Administrador</option>
              </select>
            </div>
            <div className="flex justify-center gap-10">
              <button
                type="button"
                onClick={() => {
                  setDataCamb(dataInitial);
                }}
                className={`text-white px-5 py-2.5 text-center rounded-lg text-sm w-full sm:w-auto focus:ring-4 focus:outline-none focus:ring-blue-300 
                  ${
                    dataInitial?.role === "empleado"
                      ? "bg-green-300 cursor-not-allowed"
                      : "bg-green-400 hover:bg-green-700"
                  }`}
                disabled={dataInitial?.role === "empleado"}
              >
                Reiniciar
              </button>
              <button
                type="submit"
                className={`text-white px-5 py-2.5 text-center rounded-lg text-sm w-full sm:w-auto focus:ring-4 focus:outline-none focus:ring-blue-300 
                  ${
                    dataInitial?.role === "empleado"
                      ? "bg-blue-300 cursor-not-allowed"
                      : "bg-blue-700 hover:bg-blue-800"
                  }`}
                disabled={dataInitial?.role === "empleado"}
              >
                Actualizar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
