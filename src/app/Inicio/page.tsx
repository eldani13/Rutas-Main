"use client";

import { ViewOnlyGetComponent } from "@/components/views/ViewOnlyGetComponent";
import { RootEmployees } from "@/types/employees";
import { MessageProduct, RootProduct } from "@/types/product";
import { RootRoute } from "@/types/routes";
import { getAllFetchDataValues } from "@/utils/api";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Employees from "./employees/page";
import jwt from "jsonwebtoken";
import { getCookie, processEnv } from "@/utils/cookies";

export default function Home() {
  const [dataView, setDataView] = useState({
    nameUser: "Usuario",
    employees: 0,
    products: 0,
    routes: 0,
  });

  const fetchName = async () => {
    try {
      const getData = await getCookie(processEnv.jtIdentity);
      const decodedToken = jwt.decode(getData as string);
      if (decodedToken && typeof decodedToken !== "string")
        setDataView((prevState) => ({
          ...prevState,
          nameUser: decodedToken?.username as string,
        }));
    } catch {}
  };

  const getHomeData = async () => {
    const rec = await getAllFetchDataValues(
      `${process.env.BACK_URL}homeData`
    );
    setDataView((prevState) => ({
      ...prevState,
      routes: rec.message.routes,
      employees: rec.message.employees,
      products: rec.message.products,
    }));
  };

  useEffect(() => {
    fetchName();
    getHomeData();
  }, []);

  return (
    <>
      <div className="h-[100%]">
        <div className="hidden xl:flex flex-col items-start border-r-2 border-[#bbbcbc] pt-14 px-4 h-[100%]">
          <div className="flex flex-col items-start justify-center">
            <h1 className="text-[#000] text-2xl font-bold mb-1">
              Pagina Principal
            </h1>
          </div>
          <div className="flex flex-col text-[#000] items-start">
            <span className="">Pagina principal</span>
          </div>
        </div>
      </div>
      <div className="text-black flex flex-col items-center gap-20  w-full">
        <h1 className="text-3xl md:text-7xl font-semibold ">¡Bienvenido!</h1>
        <span className="text-center text-lg md:text-xl px-3">
          ¿Qué deseas revisar el día de hoy?
        </span>

        <div className="flex flex-col ">
          <div className="grid px-4 grid-cols-1 lg:grid-cols-2 justify-center items-center gap-x-10 gap-y-2">
            {/* Administrador */}
            <Link href="/Inicio/profile">
              <ViewOnlyGetComponent
                title="Administrador"
                description={`Sesión iniciada como ${dataView.nameUser}`}
              >
                <svg
                  className=" overflow-visible w-full h-8 md:w-11 md:h-11 flex items-center justify-center "
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                </svg>
              </ViewOnlyGetComponent>
            </Link>

            {/* Empleados */}
            <Link href="/Inicio/employees">
              <ViewOnlyGetComponent
                title="Empleados"
                description={`Cuenta actualmente con ${dataView.employees} Empleados`}
              >
                <svg
                  className="w-10 h-10 md:w-14 md:h-14"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="black"
                    d="M12 5.5A3.5 3.5 0 0 1 15.5 9a3.5 3.5 0 0 1-3.5 3.5A3.5 3.5 0 0 1 8.5 9A3.5 3.5 0 0 1 12 5.5M5 8c.56 0 1.08.15 1.53.42c-.15 1.43.27 2.85 1.13 3.96C7.16 13.34 6.16 14 5 14a3 3 0 0 1-3-3a3 3 0 0 1 3-3m14 0a3 3 0 0 1 3 3a3 3 0 0 1-3 3c-1.16 0-2.16-.66-2.66-1.62a5.536 5.536 0 0 0 1.13-3.96c.45-.27.97-.42 1.53-.42M5.5 18.25c0-2.07 2.91-3.75 6.5-3.75s6.5 1.68 6.5 3.75V20h-13zM0 20v-1.5c0-1.39 1.89-2.56 4.45-2.9c-.59.68-.95 1.62-.95 2.65V20zm24 0h-3.5v-1.75c0-1.03-.36-1.97-.95-2.65c2.56.34 4.45 1.51 4.45 2.9z"
                  />
                </svg>
              </ViewOnlyGetComponent>
            </Link>

            {/* Rutas */}
            <Link href="/Inicio/routes">
              <ViewOnlyGetComponent
                title="Rutas"
                description={`Cuentas con ${dataView.routes} Rutas`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 md:w-11 md:h-11"
                  viewBox="0 0 576 512"
                >
                  <path
                    fill="black"
                    d="M408 120c0 54.6-73.1 151.9-105.2 192c-7.7 9.6-22 9.6-29.6 0C241.1 271.9 168 174.6 168 120C168 53.7 221.7 0 288 0s120 53.7 120 120m8 80.4c3.5-6.9 6.7-13.8 9.6-20.6c.5-1.2 1-2.5 1.5-3.7l116-46.4c15.8-6.3 32.9 5.3 32.9 22.3v270.8c0 9.8-6 18.6-15.1 22.3L416 503zm-278.4-62.1c2.4 14.1 7.2 28.3 12.8 41.5c2.9 6.8 6.1 13.7 9.6 20.6v251.4L32.9 502.7C17.1 509 0 497.4 0 480.4V209.6c0-9.8 6-18.6 15.1-22.3l122.6-49zM327.8 332c13.9-17.4 35.7-45.7 56.2-77v249.3l-192-54.9V255c20.5 31.3 42.3 59.6 56.2 77c20.5 25.6 59.1 25.6 79.6 0M288 152a40 40 0 1 0 0-80a40 40 0 1 0 0 80"
                  />
                </svg>
              </ViewOnlyGetComponent>
            </Link>

            {/* Productos */}
            <Link href="/Inicio/product">
              <ViewOnlyGetComponent
                title="Productos"
                description={`Actualmente tienes ${dataView.products} productos registrados`}
              >
                <svg
                  xmlns=" http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-8 h-8 md:w-11 md:h-11"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M15.528 2.973a.75.75 0 0 1 .472.696v8.662a.75.75 0 0 1-.472.696l-7.25 2.9a.75.75 0 0 1-.557 0l-7.25-2.9A.75.75 0 0 1 0 12.331V3.669a.75.75 0 0 1 .471-.696L7.443.184l.004-.001.274-.11a.75.75 0 0 1 .558 0l.274.11.004.001zm-1.374.527L8 5.962 1.846 3.5 1 3.839v.4l6.5 2.6v7.922l.5.2.5-.2V6.84l6.5-2.6v-.4l-.846-.339Z"
                  />
                </svg>
              </ViewOnlyGetComponent>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
