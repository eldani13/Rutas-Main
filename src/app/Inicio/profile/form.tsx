"use client";

import { MessageEmployees } from "@/types/employees";
import { FormEvent, useEffect, useState } from "react";

export default function FormProfile({
  dataUser,
}: {
  dataUser: MessageEmployees | null;
}) {
  const formUpdate = (e: FormEvent) => {
    e.preventDefault();
  };
  const [dataCamb, setDataCamb] = useState<MessageEmployees | null>(null);

  useEffect(() => {
    const getData = async () => {
      const data: MessageEmployees | null = await JSON.parse(
        // @ts-ignore
        dataUser?.value || null
      );
      return data;
    };
    // @ts-ignore
    setDataCamb(getData());
    console.log(getData());
  }, []);

  console.log(dataCamb);

  return (
    <form
      className="max-w-sm mx-auto pt-10  w-full px-5 md:px-0 z-30"
      onSubmit={formUpdate}
    >
      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Tu email
        </label>
        <input
          type="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="name@flowbite.com"
          value={dataCamb?.user}
          onChange={(e) =>
            //@ts-ignore
            setDataCamb((prev) => ({ ...prev, user: e.target.value }))
          }
          required
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
            setDataCamb((prev) => ({ ...prev, password: e.target.value }))
          }
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          required
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
            setDataCamb((prev) => ({ ...prev, username: e.target.value }))
          }
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="Juanito"
          required
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
            setDataCamb((prev) => ({ ...prev, lastnames: e.target.value }))
          }
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="Ba..."
          required
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
            setDataCamb((prev) => ({ ...prev, role: e.target.value }))
          }
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        >
          <option value="empleado">Empleado</option>
          <option value="administrador">Administrador</option>
        </select>
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Actualizar
        </button>
      </div>
    </form>
  );
}
