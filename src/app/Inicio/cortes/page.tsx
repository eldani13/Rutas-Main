"use client";
import { RootEmployees } from "@/types/employees";
import { MessageRoute, RootRoute } from "@/types/routes";
import { RootVehicle } from "@/types/vehicles";
import { getAllFetchDataValues, postInsertData } from "@/utils/api";
import { processEnv, getCookie } from "@/utils/cookies";
import jwt from "jsonwebtoken";
import Link from "next/link";
import React, { SyntheticEvent, useEffect, useState } from "react";

export default function Route() {
  const [routes, setRoutes] = useState<null | RootRoute>(null);
  const [employees, setEmployees] = useState<null | RootEmployees>(null);
  const [vehicles, setVehicles] = useState<null | RootVehicle>(null);
  const [addRoute, setAddRoute] = useState(false);
  const [role, setRole] = useState("");

  const fetchName = async () => {
    try {
      const getData = await getCookie(processEnv.jtIdentity);
      const decodedToken = jwt.decode(getData as string);
      if (decodedToken && typeof decodedToken !== "string")
        setRole(decodedToken?.role as string);
    } catch (error) {
      console.error("Error al obtener datos del token:", error);
    }
  };

  const getAllData = async () => {
    await getAllFetchDataValues(`${processEnv.back}rutas/`).then(
      (rec: RootRoute) => {
        setRoutes(rec);
      }
    );
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

  return (
    <>
      <div className="h-[100%]">
        <div className="hidden xl:flex flex-col items-start border-r-2 border-[#bbbcbc] pt-14 px-4 h-[100%]">
          <div className="flex flex-col items-start justify-center">
            <h1 className="text-[#000] text-2xl font-bold mb-1">Cortes</h1>
          </div>
          <div className="flex flex-col text-[#000] items-start">
            <span className="">
              Seleccionar a un empleado para gestionar sus corts.
            </span>
          </div>
        </div>
      </div>

      <div className="relative text-[#000] flex flex-col justify-center items-center gap-20 overflow-y-auto h-full max-h-[100vh]">
        <div className="flex flex-col ">
          <div className="flex flex-wrap max-w-full justify-around px-4 gap-x-10 gap-y-5 py-4  w-full">
            {routes &&
              routes.message.map((routeName: MessageRoute, index: number) => (
                <Link
                  key={"ruta_" + index}
                  href={`/Inicio/corte-ruta/${routeName.empleado}`}
                  passHref
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
                    <div className="text-[#000] flex flex-col gap-3  md:min-w-60">
                      <span className="font-bold text-xl lg:text-2xl">
                        {employees &&
                          employees.message.find(
                            (u) => u._id === routeName.empleado
                          )?.username}
                      </span>
                      <p className="text-[#bbbcbc] text-sm lg:text-base">
                        {vehicles &&
                          vehicles.message.find(
                            (u) => u._id === routeName.vehicle
                          )?.marca}
                      </p>
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
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
