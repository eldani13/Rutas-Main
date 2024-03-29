"use client";
import LinkRoute from "@/components/buttons/LinkRoute";
import RouteForm from "@/components/forms/RouteForm";
import { MessageEmployees, RootEmployees } from "@/types/employees";
import { MessageRoute, RootRoute } from "@/types/routes";
import { MessageVehicle, RootVehicle } from "@/types/vehicles";
import { getAllFetchDataValues, postInsertData } from "@/utils/api";
import { processEnv, getCookie } from "@/utils/cookies";
import jwt from "jsonwebtoken";
import Link from "next/link";
import React, { SyntheticEvent, useEffect, useState } from "react";
// import Home from "./HomeSection";

export default function Route() {
  const [routes, setRoutes] = useState<null | RootRoute>(null);
  const [employees, setEmployees] = useState<null | MessageEmployees[]>(null);
  const [vehicles, setVehicles] = useState<null | MessageVehicle[]>(null);
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
        setEmployees(rec.message);
      }
    );
  };

  const getAllVehicles = async () => {
    await getAllFetchDataValues(`${processEnv.back}cars-units`).then(
      (rec: RootVehicle) => {
        setVehicles(rec.message);
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

      <div className="relative text-[#000] flex flex-col justify-center items-center gap-20  overflow-y-auto h-full max-h-[100vh]">
        <div className="flex flex-col ">
          <div className="flex flex-wrap max-w-full justify-around px-4 gap-x-10 gap-y-5 py-4 pt-10  w-full">
            {routes && routes.message.length > 0 ? (
              routes.message.map((routeName: MessageRoute, index: number) => (
                <LinkRoute
                  key={"ruta_" + index}
                  employees={employees}
                  vehicles={vehicles}
                  routeCurrent={routeName}
                />
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
              : "fixed right-10 bottom-10 hover:scale-110 "
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
      </div>
    </>
  );
}
