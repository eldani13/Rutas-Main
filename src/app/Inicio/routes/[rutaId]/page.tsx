"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
// import Home from "./HomeSection";
import mapboxgl from "mapbox-gl";
import { getAllFetchDataValues } from "@/utils/api";
import { MessageRoute, RootRoute } from "@/types/routes";
import { MessageVehicle, RootVehicle } from "@/types/vehicles";
import { MessageEmployees, RootEmployees } from "@/types/employees";

import { Map, LoadingMap } from "@/components";
import { DirectionsResponse } from "@/types/RouteResponseApi";
import { routeResponse } from "@/temp/TempResponseDirections";

// @ts-ignore
export default function Route({ params }) {
  const { rutaId } = params;
  const [routeCurrent, setRouteCurrent] = useState<null | MessageRoute>(null);

  const [modifyRoute, setModifyRoute] = useState<{
    state: boolean;
    route: MessageRoute | null;
  }>({
    state: false,
    route: null,
  });
  const onHandleform_EditProduct = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    //aqui
  };

  const [employeCurrent, setEmployeCurrent] = useState<null | MessageEmployees>(
    null
  );
  const [vehicleCurrent, setVehicleCurrent] = useState<null | MessageVehicle>(
    null
  );

  const [responseDirections, setResponseDirections] =
    useState<DirectionsResponse>();
  const [errorResponseDirections, setErrorResponseDirections] = useState<any>();
  const [loadingDirections, setLoadingDirections] = useState<boolean>(true);

  const getDataRoute = async () => {
    const dataValues = await getAllFetchDataValues(
      `${process.env.NEXT_PUBLIC_BACK_URL}rutas/${rutaId}`
    )
      .then((rec) => {
        const messList: MessageRoute = rec.message;
        if (messList != null) {
          return messList;
        }
      })
      .catch(() => null);

    setRouteCurrent(dataValues || null);
    setModifyRoute((prev) => ({ ...prev, route: dataValues || null }));
    await getDataDirections(dataValues || null);
  };
  const getDataEmploye = async () => {
    await getAllFetchDataValues(
      `${process.env.NEXT_PUBLIC_BACK_URL}employee/${
        routeCurrent && routeCurrent.empleado
      }`
    )
      .then((rec) => {
        const messList: MessageEmployees = rec;
        // console.log(rec);
        if (messList != null) {
          setEmployeCurrent(messList);
        }
      })
      .catch(() => setEmployeCurrent(null));
  };
  const getDataCars = async () => {
    await getAllFetchDataValues(
      `${process.env.NEXT_PUBLIC_BACK_URL}cars-units`
    ).then((rec: RootVehicle) => {
      const messList: MessageVehicle[] = rec.message;
      if (Array.isArray(messList) && messList.length > 0) {
        //@ts-ignore
        setVehicleCurrent(messList.find((u) => u._id == routeCurrent.vehicle));
      }
    });
  };

  const getDataDirections = async (currentRoute: MessageRoute | null) => {
    if (process.env.NEXT_PUBLIC_MAPBOX_ACCESS == null) return;

    setLoadingDirections(true);

    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/`;
    const routes = `${currentRoute?.start[0]}, ${currentRoute?.start[1]}; ${currentRoute?.end[0]}, ${currentRoute?.end[1]}`;
    const options = `?alternatives=false&geometries=geojson&overview=simplified&steps=false&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS}`;

    await getAllFetchDataValues(`${url}${routes}${options}`)
      .then((data) => {
        setResponseDirections(data);
      })
      .catch((err) => setErrorResponseDirections(err))
      .finally(() => setLoadingDirections(false));
  };

  useEffect(() => {
    getDataRoute();
  }, []);

  useEffect(() => {
    if (routeCurrent == null) {
      return;
    }
    getDataCars();
    getDataEmploye();
  }, [routeCurrent]);

  return (
    <>
      <div className="flex flex-col items-start border-r-2 border-[#bbbcbc] pt-14 px-4 h-[100%] justify-between  overflow-hidden max-h-[100vh]">
        <div className="flex flex-col items-start justify-center">
          <h1 className="text-[#000] text-2xl font-bold mb-1">
            Sistema de Corte
          </h1>
          <div className="grid grid-cols-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30"
              width="30"
              viewBox="0 0 384 512"
              transform="rotate(90)"
            >
              <path d="M32 448c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c53 0 96-43 96-96l0-306.7 73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 109.3 160 416c0 17.7-14.3 32-32 32l-96 0z" />
            </svg>
            <span className="mr-[-40px]">Ruta {employeCurrent?.lastnames}</span>
          </div>

          <div className="flex items-center justify-center bg-[#ccc] h-40 w-40 rounded-full m-auto mt-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="75"
              width="75"
              viewBox="0 0 448 512"
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
            </svg>
          </div>

          <div className="grid grid-rows-3 gap-5 m-auto mt-6">
            <div>
              <span style={{ color: "#5e5e5e", fontWeight: "900" }}>
                Empleado:
              </span>
              <p style={{ color: "#828282" }}>{employeCurrent?.user}</p>
            </div>
            <div>
              <span style={{ color: "#5e5e5e", fontWeight: "900" }}>
                Vehículo asignado:
              </span>
              <p style={{ color: "#828282", maxWidth: "200px" }}>
                Vehículo numero {vehicleCurrent?._id}
              </p>
            </div>
            <div>
              <span style={{ color: "#5e5e5e", fontWeight: "900" }}>
                Estado de ruta:
              </span>
              <p style={{ color: "#00c040", fontWeight: "600" }}>En curso.</p>
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="pb-10 flex flex-col space-y-10 items-center">
          <button
            onClick={() => setModifyRoute((prev) => ({ ...prev, state: true }))}
            className="bg-[#ececec] text-black px-2 py-2 mb-2 rounded-[50px] h-14 w-52 flex items-center justify-between font-bold"
          >
            <svg
              className="h-[50px] w-[50px] text-blue-500 pr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <circle cx="10" cy="10" r="8" />
            </svg>
            <span className="mr-10">Editar Ruta</span>
          </button>

          <button className="bg-[#ececec] text-black px-2 py-2 mb-2 rounded-[50px] h-14 w-52 flex items-center justify-between font-bold">
            <svg
              className="h-[50px] w-[50px] text-red-500 pr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <circle cx="10" cy="10" r="8" />
            </svg>
            <span className="mr-10 text-[14px]">Eliminar</span>
          </button>
        </div>
      </div>

      <div
        className="flex flex-col  justify-between px-3  max-h-[100vh] h-full overflow-y-auto"
        style={{ alignSelf: "flex-start" }}
      >
        <div className="">
          <Link href="/Inicio/routes">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="my-3"
              fill="#ccc"
              height="20"
              width="18"
              viewBox="0 0 448 512"
            >
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg>
          </Link>

          <hr className="mb-10 border-[1px]" />
        </div>

        <div className="flex flex-1">
          {/* Primer div */}
          <div
            className="flex flex-1 flex-col text-black px-3"
            style={{ gridArea: "productSold" }}
          >
            <span className="font-bold">Mapa de la Ruta.</span>
            <div className="flex flex-1">
              {/* Activar: */}
              {/* {loadingDirections ? (
                <LoadingMap />
              ) : (
                responseDirections && (
                  <Map route={responseDirections} controls />
                )
              )} */}
            </div>
          </div>

          <div className="flex flex-col p-10 gap-y-10 justify-center">
            {/* Segundo div */}
            <div className="flex flex-col items-center text-black gap-10">
              <span className="font-bold">Carga en Mercancía</span>
              {/* Card */}
              <div
                className="flex flex-row p-4"
                style={{
                  boxShadow: "0px 6px 13.7px 0px rgba(0, 0, 0, 0.10)",
                  borderRadius: "20px",
                  cursor: "pointer",
                }}
              >
                <svg
                  className="h-[170px] w-[170px] text-red-400 pr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <circle cx="10" cy="10" r="8" />
                </svg>
                <div className="flex flex-col justify-center gap-y-3">
                  <span className="text-4xl relative">
                    $ 24, 550{" "}
                    <span className="text-base font-bold absolute">MXN</span>
                  </span>
                  <p className="text-xs text-[#5e5e5e] flex text-center">
                    Haga clic para gestionar la carga del vehiculo
                  </p>
                </div>
              </div>
            </div>

            {/* Tercer div */}
            <div className=" flex flex-col items-center text-black gap-10">
              <span className="font-bold">Última hora de venta.</span>
              <div
                className="flex flex-row p-4"
                style={{
                  boxShadow: "0px 6px 13.7px 0px rgba(0, 0, 0, 0.10)",
                  borderRadius: "20px",
                  cursor: "pointer",
                }}
              >
                <svg
                  className="h-[170px] w-[170px] text-yellow-600 pr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <circle cx="10" cy="10" r="8" />
                </svg>
                <div className="flex flex-col justify-center gap-y-3">
                  <span className="text-4xl relative">
                    02 : 35{" "}
                    <span className="text-base font-bold absolute">PM</span>
                  </span>
                  <p className="text-xs text-[#5e5e5e] flex text-center">
                    Haga clic para gestionar el historial de venta
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {modifyRoute.route && (
          <div
            className={`bg-[#1d1b1b6e] absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center ${
              modifyRoute.state ? "visible" : "hidden"
            }`}
          >
            <form
              onSubmit={onHandleform_EditProduct}
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
                {/* {viewAddProduct[1] == "insert" ? "Insertar" : "Editar"}  */}
                Editar Ruta
              </h1>
              <div className="flex flex-col gap-3 mb-16">
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
                      value={modifyRoute.route.start.join(",")}
                      onChange={(e) =>
                        // @ts-ignore
                        setModifyRoute((prev) => ({
                          ...prev,
                          route: {
                            ...prev.route,
                            start: e.target.value.split(",").map(Number),
                          },
                        }))
                      }
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
                      value={modifyRoute.route.end.join(",")}
                      onChange={(e) =>
                        // @ts-ignore
                        setModifyRoute((prev) => ({
                          ...prev,
                          route: {
                            ...prev.route,
                            end: e.target.value.split(",").map(Number),
                          },
                        }))
                      }
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
                    <select className="w-full">
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
                  onClick={() =>
                    setModifyRoute((prev) => ({ ...prev, state: true }))
                  }
                  className="bg-red-500 text-slate-50 px-6 py-2 rounded-full hover:scale-[1.1]"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
