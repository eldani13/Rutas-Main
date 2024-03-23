"use client";
import RouteForm from "@/components/forms/RouteForm";
import { RootEmployees } from "@/types/employees";
import { MessageRoute, RootRoute } from "@/types/routes";
import { RootVehicle } from "@/types/vehicles";
import { getAllFetchDataValues, postInsertData } from "@/utils/api";
import { processEnv, getCookie } from "@/utils/cookies";
import jwt from "jsonwebtoken";
import Link from "next/link";
import React, { SyntheticEvent, useEffect, useState } from "react";
// import Home from "./HomeSection";

export default function Route() {
  const [routes, setRoutes] = useState<null | RootRoute>(null);
  const [employees, setEmployees] = useState<null | RootEmployees>(null);
  const [vehicles, setVehicles] = useState<null | RootVehicle>(null);
  const [addRoute, setAddRoute] = useState(false);
  const [role, setRole] = useState("");

  const fetchName = async () => {
    try {
      // Obtener el token JWT de las cookies
      const getData = await getCookie(processEnv.jtIdentity);
      const decodedToken = jwt.decode(getData as string);
      if (decodedToken && typeof decodedToken !== "string")
        setRole(decodedToken?.role as string);
    } catch (error) {
      console.error("Error al obtener datos del token:", error);
    }
  };

  const getAllData = async () => {
    await getCookie(processEnv.jtIdentity).then(async (jwt_get) => {
      const jwt_decode = jwt.decode(jwt_get + "") as {
        username: string;
        role: "administrador" | "empleado";
        exp: number;
        iat: number;
      } | null;

      if (jwt_decode?.role === "administrador") {
        return await getAllFetchDataValues(`${processEnv.back}rutas/`).then(
          (rec: RootRoute) => {
            setRoutes(rec);
          }
        );
      }

      await getAllFetchDataValues(
        //@ts-ignore
        `${processEnv.back}rutas/employee/${jwt_decode?._id}`
      ).then((rec) => {
        setRoutes(rec);
      });
    });
  };

  const getAllEmployess = async () => {
    await getAllFetchDataValues(`${processEnv.back}employees`).then(
      (rec: RootEmployees) => {
        setEmployees(rec);
      }
    );
  };

  const getAllVehicles = async () => {
    await getAllFetchDataValues(`${processEnv.back}cars-units`).then(
      (rec: RootVehicle) => {
        setVehicles(rec);
      }
    );
  };

  useEffect(() => {
    getAllEmployess();
    getAllVehicles();
    getAllData();
    fetchName();
  }, []);

  const onHandleform_EditRoute = async (e: SyntheticEvent) => {
    e.preventDefault;
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const employee = formData.get("employee") as string;
    const vehicle = formData.get("vehicle") as string;
    const start = (formData.get("routeStart") as string).split(",").map(Number);
    const end = (formData.get("routeEnd") as string).split(",").map(Number);
    const state = (formData.get("state") as string) === "a" ? true : false;
    // console.log(employee + vehicle + start + )

    await postInsertData(
      `${processEnv.back}rutas/new`,
      {
        empleado: employee,
        vehicle: vehicle,
        start: start,
        end: end,
        status: state,
        amountOfMerchandise: 0,
        LastMinuteSale: new Date().toISOString(),
      },
      () => {
        setAddRoute(false);
        getAllEmployess();
        getAllVehicles();
        getAllData();
      },
      "ruta"
    );
  };
  console.log(routes);
  return (
    <>
      <div className="h-[100%]">
        <div className="hidden xl:flex flex-col items-start border-r-2 border-[#bbbcbc] pt-14 px-4 h-[100%]">
          <div className="flex flex-col items-start justify-center">
            <h1 className="text-[#000] text-2xl font-bold mb-1">Rutas</h1>
          </div>
          <div className="flex flex-col text-[#000] items-start">
            <span className="">Gestiona tus rutas.</span>
          </div>
        </div>
      </div>

      <div className="relative text-[#000] flex flex-col justify-center items-center gap-20 overflow-y-auto h-full max-h-[100vh]">
        <div className="flex flex-col ">
          <div className="flex flex-wrap max-w-full justify-around px-4 gap-x-10 gap-y-5 py-4  w-full">
            {routes && routes.message.length > 0 ? (
              routes.message.map((routeName: MessageRoute, index: number) => (
                <Link
                  key={"ruta_" + index}
                  href={`/Inicio/routes/${routeName._id}`}
                  className="group cursor-pointer flex gap-5 justify-between items-center md:gap-x-10 px-5  py-2 hover:bg-gray-100 rounded-full"
                >
                  <div className="flex justify-start gap-5 md:gap-3">
                    <div className="flex bg-[#ccc] h-14 min-w-14 md:min-h-20 md:min-w-20 rounded-full items-center justify-center">
                      <svg
                        className=" overflow-visible w-full h-8 md:w-11 md:h-11 flex items-center justify-center "
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                      </svg>
                    </div>
                    <div className="text-[#000] flex flex-col gap-1  md:min-w-60">
                      {employees &&
                        (() => {
                          const empl = employees.message.find(
                            (u) => u._id === routeName.empleado
                          );

                          return (
                            <>
                              <span className="font-bold text-xl lg:text-2xl">
                                {empl?.username}
                              </span>

                              <p className="text-[#bbbcbc] text-sm lg:text-base">
                                {vehicles &&
                                  (() => {
                                    const veh = vehicles.message.find(
                                      (u) => u._id === routeName.vehicle
                                    );
                                    return veh?.marca + " - " + veh?.modelo;
                                  })()}
                              </p>
                              <span className="text-[#bbbcbc] text-sm text-right">
                                {empl?.user} {empl?.lastnames}
                              </span>
                            </>
                          );
                        })()}
                    </div>
                  </div>
                  <svg
                    className="group-hover:animate-bounce"
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </Link>
              ))
            ) : (
              <h1 className="text-center font-semibold text-slate-900 text-xl">
                No hay rutas para mostrar
              </h1>
            )}
          </div>
        </div>

        <button
          className={`${
            role === "empleado"
              ? "hidden"
              : "absolute right-10 bottom-10 hover:scale-110"
          }`}
          onClick={() => setAddRoute(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            className="w-14"
          >
            <path
              fill="currentColor"
              d="M208 32H48a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16m-24 104h-48v48a8 8 0 0 1-16 0v-48H72a8 8 0 0 1 0-16h48V72a8 8 0 0 1 16 0v48h48a8 8 0 0 1 0 16"
            />
          </svg>
        </button>
        <RouteForm
          viewForm={addRoute}
          setViewForm={setAddRoute}
          formSucces={() => {
            setAddRoute(false);
            getAllData();
          }}
          type="add"
        />

        {/* {addRoute && (
          <div
            className={`bg-[#1d1b1b6e] absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center ${
              addRoute ? "visible" : "hidden"
            }`}
          >
            <form
              onSubmit={onHandleform_EditRoute}
              action=""
              className="relative bg-slate-50 flex p-20 flex-col rounded-xl"
            >
              <div className="w-full flex absolute justify-center top-[0] -translate-y-[50%] left-0 right-0 ">
                <div className="bg-sky-400 w-20 h-20 flex rounded-full items-center justify-center shadow-lg shadow-emerald-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0m10 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2zM4.862 4.276 3.906 6.19a.51.51 0 0 0 .497.731c.91-.073 2.35-.17 3.597-.17s2.688.097 3.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 10.691 4H5.309a.5.5 0 0 0-.447.276" />
                    <path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679q.05.242.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.8.8 0 0 0 .381-.404l.792-1.848ZM4.82 3a1.5 1.5 0 0 0-1.379.91l-.792 1.847a1.8 1.8 0 0 1-.853.904.8.8 0 0 0-.43.564L1.03 8.904a1.5 1.5 0 0 0-.03.294v.413c0 .796.62 1.448 1.408 1.484 1.555.07 3.786.155 5.592.155s4.037-.084 5.592-.155A1.48 1.48 0 0 0 15 9.611v-.413q0-.148-.03-.294l-.335-1.68a.8.8 0 0 0-.43-.563 1.8 1.8 0 0 1-.853-.904l-.792-1.848A1.5 1.5 0 0 0 11.18 3z" />
                  </svg>
                </div>
              </div>
              <h1 className="text-slate-900 font-semibold text-xl text-center">
                Agregar Ruta
              </h1>
              <div className="flex flex-col gap-3 mb-16">
                <div>
                  <label htmlFor="">Empleado</label>
                  <div className="ms-2 border-[1px] border-gray-500 flex flex-row overflow-hidden rounded-md">
                    <div className="bg-slate-200 flex items-center justify-center color-slate-500 p-2 border-r-2 border-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.873 11.297V4.142H1.699L0 5.379v1.137l1.64-1.18h.06v5.961zm3.213-5.09v-.063c0-.618.44-1.169 1.196-1.169.676 0 1.174.44 1.174 1.106 0 .624-.42 1.101-.807 1.526L4.99 10.553v.744h4.78v-.99H6.643v-.069L8.41 8.252c.65-.724 1.237-1.332 1.237-2.27C9.646 4.849 8.723 4 7.308 4c-1.573 0-2.36 1.064-2.36 2.15v.057zm6.559 1.883h.786c.823 0 1.374.481 1.379 1.179.01.707-.55 1.216-1.421 1.21-.77-.005-1.326-.419-1.379-.953h-1.095c.042 1.053.938 1.918 2.464 1.918 1.478 0 2.642-.839 2.62-2.144-.02-1.143-.922-1.651-1.551-1.714v-.063c.535-.09 1.347-.66 1.326-1.678-.026-1.053-.933-1.855-2.359-1.845-1.5.005-2.317.88-2.348 1.898h1.116c.032-.498.498-.944 1.206-.944.703 0 1.206.435 1.206 1.07.005.64-.504 1.106-1.2 1.106h-.75z" />
                      </svg>
                    </div>

                    <select className="w-full" name="employee">
                      {employees?.message.map((emp) => (
                        <option value={emp._id} key={"mapping-" + emp._id}>
                          Usuario: {emp.username} | Apellidos: {emp.lastnames}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="">Vehículo</label>
                  <div className="ms-2 border-[1px] border-gray-500 flex flex-row overflow-hidden rounded-md">
                    <div className="bg-slate-200 flex items-center justify-center color-slate-500 p-2 border-r-2 border-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.873 11.297V4.142H1.699L0 5.379v1.137l1.64-1.18h.06v5.961zm3.213-5.09v-.063c0-.618.44-1.169 1.196-1.169.676 0 1.174.44 1.174 1.106 0 .624-.42 1.101-.807 1.526L4.99 10.553v.744h4.78v-.99H6.643v-.069L8.41 8.252c.65-.724 1.237-1.332 1.237-2.27C9.646 4.849 8.723 4 7.308 4c-1.573 0-2.36 1.064-2.36 2.15v.057zm6.559 1.883h.786c.823 0 1.374.481 1.379 1.179.01.707-.55 1.216-1.421 1.21-.77-.005-1.326-.419-1.379-.953h-1.095c.042 1.053.938 1.918 2.464 1.918 1.478 0 2.642-.839 2.62-2.144-.02-1.143-.922-1.651-1.551-1.714v-.063c.535-.09 1.347-.66 1.326-1.678-.026-1.053-.933-1.855-2.359-1.845-1.5.005-2.317.88-2.348 1.898h1.116c.032-.498.498-.944 1.206-.944.703 0 1.206.435 1.206 1.07.005.64-.504 1.106-1.2 1.106h-.75z" />
                      </svg>
                    </div>

                    <select className="w-full" name="vehicle">
                      {vehicles?.message.map((veh) => (
                        <option value={veh._id} key={"mappOption2-" + veh._id}>
                          Marca:{veh.marca} | Modelo:{veh.modelo}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="">Inicio:</label>
                  <div className="ms-2 border-[1px] border-gray-500 flex flex-row overflow-hidden rounded-md">
                    <div className="bg-slate-200 flex items-center justify-center color-slate-500 p-2 border-r-2 border-gray-500">
                      <svg
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L7 13.101l-4.223 2.815A.5.5 0 0 1 2 15.5z" />
                        <path d="M4.268 1A2 2 0 0 1 6 0h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L13 13.768V2a1 1 0 0 0-1-1z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      className="flex w-full h-auto px-3"
                      name="routeStart"
                      pattern="-?\d+(\.\d+)?,\s?-?\d+(\.\d+)?"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="">Fin:</label>
                  <div className="ms-2 border-[1px] border-gray-500 flex flex-row overflow-hidden rounded-md">
                    <div className="bg-slate-200 flex items-center justify-center color-slate-500 p-2 border-r-2 border-gray-500">
                      <svg
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L7 13.101l-4.223 2.815A.5.5 0 0 1 2 15.5z" />
                        <path d="M4.268 1A2 2 0 0 1 6 0h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L13 13.768V2a1 1 0 0 0-1-1z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      className="flex w-full h-auto px-3"
                      name="routeEnd"
                      pattern="-?\d+(\.\d+)?,\s?-?\d+(\.\d+)?"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="">Estado:</label>
                  <div className="ms-2 border-[1px] border-gray-500 flex flex-row overflow-hidden rounded-md">
                    <div className="bg-slate-200 flex items-center justify-center color-slate-500 p-2 border-r-2 border-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.873 11.297V4.142H1.699L0 5.379v1.137l1.64-1.18h.06v5.961zm3.213-5.09v-.063c0-.618.44-1.169 1.196-1.169.676 0 1.174.44 1.174 1.106 0 .624-.42 1.101-.807 1.526L4.99 10.553v.744h4.78v-.99H6.643v-.069L8.41 8.252c.65-.724 1.237-1.332 1.237-2.27C9.646 4.849 8.723 4 7.308 4c-1.573 0-2.36 1.064-2.36 2.15v.057zm6.559 1.883h.786c.823 0 1.374.481 1.379 1.179.01.707-.55 1.216-1.421 1.21-.77-.005-1.326-.419-1.379-.953h-1.095c.042 1.053.938 1.918 2.464 1.918 1.478 0 2.642-.839 2.62-2.144-.02-1.143-.922-1.651-1.551-1.714v-.063c.535-.09 1.347-.66 1.326-1.678-.026-1.053-.933-1.855-2.359-1.845-1.5.005-2.317.88-2.348 1.898h1.116c.032-.498.498-.944 1.206-.944.703 0 1.206.435 1.206 1.07.005.64-.504 1.106-1.2 1.106h-.75z" />
                      </svg>
                    </div>

                    <select className="w-full" name="state">
                      <option value="a">Activo</option>
                      <option value="i">Inactivo</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex justify-between w-full gap-8">
                <button
                  type="submit"
                  className="bg-blue-500 text-slate-50 px-6 py-2 rounded-full hover:scale-[1.1]"
                >
                  Guardar
                </button>
                <button
                  type="reset"
                  onClick={() => setAddRoute(false)}
                  className="bg-red-500 text-slate-50 px-6 py-2 rounded-full hover:scale-[1.1]"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )} */}
      </div>
    </>
  );
}
