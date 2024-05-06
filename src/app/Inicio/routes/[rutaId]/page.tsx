"use client";
import "./style.css";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { deleteRemoveData, getAllFetchDataValues } from "@/utils/api";
import { MessageRoute } from "@/types/routes";
import { MessageVehicle, RootVehicle } from "@/types/vehicles";
import { MessageEmployees } from "@/types/employees";
import { ButtonCrud } from "@/components/buttons/ButtonCrud";
import { getCookie, processEnv } from "@/utils/cookies";
import RouteForm from "@/components/forms/RouteForm";
import MapboxMap from "@/components/maps/MapboxMap";

// @ts-ignore
export default function Route({ params }) {
  const { rutaId } = params;
  const [viewForm, setViewForm] = useState(false);
  const [routeCurrent, setRouteCurrent] = useState<null | MessageRoute>(null);
  const [role, setRole] = useState<"administrador" | "empleado">("empleado");
  const [employeCurrent, setEmployeCurrent] = useState<null | MessageEmployees>(
    null
  );
  const [vehicleCurrent, setVehicleCurrent] = useState<null | MessageVehicle>(
    null
  );

  const getDataRoute = async () => {
    await getAllFetchDataValues(`${processEnv.back}rutas/${rutaId}`)
      .then((rec) => {
        setRouteCurrent(rec.message as MessageRoute);
      })
      .catch(() => null);
  };
  const getDataCars = async () => {
    await getAllFetchDataValues(`${processEnv.back}cars-units`).then(
      (rec: RootVehicle) => {
        if (rec.message && rec.message.length > 0) {
          setVehicleCurrent(
            rec.message.find((u) => u._id == (routeCurrent?.vehicle || 0)) ||
            null
          );
        }
      }
    );
  };
  const getDataEmploye = async () => {
    await getAllFetchDataValues(
      `${processEnv.back}employee/${routeCurrent && routeCurrent.empleado}`
    )
      .then((rec) => {
        const messList: MessageEmployees = rec;
        if (messList != null) {
          setEmployeCurrent(messList);
        }
      })
      .catch(() => setEmployeCurrent(null));
  };

  const getTypeData = async () => {
    try {
      // Obtener el token JWT de las cookies
      const getData = await getCookie(processEnv.jtIdentity);
      const decodedToken = jwt.decode(getData as string);
      if (decodedToken && typeof decodedToken !== "string")
        setRole(decodedToken?.role as "empleado" | "administrador");
      console.log(decodedToken);
    } catch (error) {
      console.error("Error al obtener datos del token:", error);
    }
  };

  useEffect(() => {
    if (routeCurrent == null) {
      return;
    }
    getDataCars();
    getDataEmploye();
  }, [routeCurrent]);

  useEffect(() => {
    getTypeData();
    getDataRoute();
  }, []);

  const removeDairectionHandle = async () => {
    await deleteRemoveData(
      `${processEnv.back}rutas/delete/${routeCurrent?._id}`,
      () => {
        window.location.href = "/Inicio/routes";
      },
      "ruta",
      `Quieres eliminar \nUsuario: ${employeCurrent?.user} \nCarro: ${vehicleCurrent?.marca}`
    );
  };

  const clockLastMinuteSale = () => {
    const date = new Date(routeCurrent?.LastMinuteSale || "");

    return (
      <>
        {date.getHours() % 12 || 12} : {date.getMinutes()}
        <span className="text-base font-bold absolute">
          {date.getHours() >= 12 ? "PM" : "AM"}
        </span>
      </>
    );
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <>
      <div
        className={` ${menuOpen ? "sm:ml-0" : "hidden"
          } hidden xl:flex flex-col items-start border-r-2 border-[#bbbcbc] pt-14 ml:px-4 h-[100%] justify-between  overflow-hidden max-h-[100vh] p-4`}
      >
        <div className="hidden  xl:flex flex-col items-start justify-center">
          <h1 className="text-[#000] text-2xl font-bold mb-1">
            Sistema de Ruta
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

          <div className="flex items-center justify-center bg-[#ccc] h-32 w-32 rounded-full m-auto mt-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="75"
              width="75"
              viewBox="0 0 448 512"
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
            </svg>
          </div>

          <div className="grid grid-rows-3 gap-3 m-auto mt-6">
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
              <p
                style={{
                  color: routeCurrent?.status ? "#00c040" : "#da3636",
                  fontWeight: "600",
                }}
              >
                {routeCurrent?.status ? "En curso." : "Fuera de servicio"}
              </p>
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="z-20 absolute bottom-0 ms-3 ps-3 xl:ps-0 gap-3 xl:gap-0 xl:static pb-10 flex  xl:flex-col xl:space-y-5 items-center">
          {role === "administrador" && (
            <>
              <ButtonCrud
                isHidden={false}
                text="Editar Ruta"
                color="bg-[#ececec] text-blue-500"
                onclickHandle={() => setViewForm(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m14.06 9.02l.92.92L5.92 19H5v-.92zM17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83l3.75 3.75l1.83-1.83a.996.996 0 0 0 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29m-3.6 3.19L3 17.25V21h3.75L17.81 9.94z"
                  />
                </svg>
              </ButtonCrud>
              <ButtonCrud
                isHidden={false}
                text="Eliminar"
                color="bg-[#ececec] text-red-500"
                onclickHandle={removeDairectionHandle}
              >
                <svg
                  className="w-6 h-6 text-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 2048 2048"
                >
                  <path
                    fill="rgb(239 68 68 / 1)"
                    d="M1086 91L281 896h999v960q0 40-15 75t-41 61t-61 41t-75 15H320q-40 0-75-15t-61-41t-41-61t-15-75v-807l-37 37l-91-90l272-272l-91-90q-18-18-27-41t-10-50q0-51 37-90l271-272q18-18 41-27t50-10q26 0 49 9t42 28l90 91L996 0zm66 1765v-832H256v832q0 26 19 45t45 19h768q26 0 45-19t19-45M543 272L272 543l90 91l272-272zm1377-16h128v512h-512V640h292q-77-60-167-91t-188-31q-115 0-219 43t-185 124l-90-90q100-100 226-152t268-53q123 0 238 41t209 119zm-896 896v640H896v-640zm-256 0v640H640v-640zm-256 0v640H384v-640z"
                  />
                </svg>
              </ButtonCrud>
            </>
          )}
        </div>
      </div>
      <div
        className="z-10 flex flex-col  justify-between px-3  max-h-[100vh] h-full overflow-y-auto"
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

        <div className="mapa flex flex-1 xl:flex-row">
          <button
            className="xl:hidden flex bg-[#ccc] p-1 absolute top-0 right-0 m-5 rounded-lg items-center cursor-pointer  transition duration-300 transform hover:scale-110"
            onClick={toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M3 5h8m-8 7h13M3 19h18"
              />
            </svg>
          </button>
          {/* todo: Active */}
          <MapboxMap route={routeCurrent} />

          <div className="template flex flex-col p-10 gap-y-10 justify-center">
            {/* Segundo div */}
            <div className="card1 flex flex-col items-center text-black gap-10">
              <span className="font-bold">Carga en Mercancía</span>
              {/* Card */}
              <Link
                href={`/Inicio/routes/${rutaId}/sales`}
                className={`flex flex-row p-4 ${role === "administrador" && "pointer-events-none"
                  }`}
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
                    {routeCurrent?.amountOfMerchandise}
                    <span className="text-base font-bold absolute">MXN</span>
                  </span>
                  <p className="text-xs text-[#5e5e5e] flex text-center">
                    Haga clic para gestionar la carga del vehiculo
                  </p>
                </div>
              </Link>
            </div>

            {/* Tercer div */}
            <div className="card2 flex flex-col items-center text-black gap-10">
              <span className="font-bold">Última hora de venta.</span>
              <Link
                href={`/Inicio/routes/${rutaId}/court`}
                className={`flex flex-row p-4 ${role === "empleado" && "pointer-events-none"
                  }`}
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
                    {/* 02 : 35 */}
                    {clockLastMinuteSale()}
                  </span>
                  <p className="text-xs text-[#5e5e5e] flex text-center">
                    Haga clic para gestionar el historial de venta
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <RouteForm
          viewForm={viewForm}
          setViewForm={setViewForm}
          type="modify"
          routeCurrent={routeCurrent}
          setRouteIfIsModify={setRouteCurrent}
        />
      </div>
    </>
  );
}
