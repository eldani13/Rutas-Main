"use client";

import React, { FormEvent, useRef, useState } from "react";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import CourtPDF from "@/pdf/CourtPDF";
// import { MessageEmployees, RootEmployees } from "@/types/employees";
import { courtResponse } from "@/temp/TempCourtResponse";
import { ButtonCrud } from "@/components/buttons/ButtonCrud";

export default function Court() {
  const [showPDF, setShowPDF] = useState(false);
  const [currentCourt, setCurrentCourt] = useState(courtResponse);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const [viewAddproductos, setviewAddproductos] = useState<[boolean, string]>([
    false,
    "insert",
  ]);

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <>
      <div className=" h-[100vh]">
        <div
          className={` ${
            isOpenMenu ? "visible" : "hidden"
          } z-10 absolute left-15 xl:static bg-white  xl:flex flex-col items-start xl:border-r-2 xl:border-[#bbbcbc] pt-14 px-4 h-[100%] justify-between  overflow-hidden max-h-[100vh]`}
        >
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
              <p style={{ color: "#000" }}>{currentCourt.empleado}</p>
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
                <p style={{ color: "#828282" }}>{currentCourt.empleado}</p>
              </div>
              <div>
                <span style={{ color: "#5e5e5e", fontWeight: "900" }}>
                  Vehículo asignado:
                </span>
                <p style={{ color: "#828282" }}>{currentCourt.vehiculo}</p>
              </div>
              <div>
                <span style={{ color: "#5e5e5e", fontWeight: "900" }}>
                  Estado de ruta:
                </span>

                <p
                  style={{ color: "#ecab0f", fontWeight: "600" }}
                  className="mb-5 xl:mb-0"
                >
                  {currentCourt.estadoRuta}
                </p>
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="pb-10 flex flex-col space-y-10 items-center">
            {/* <button className='bg-[#ececec] text-black px-2 py-2 mb-2 rounded-[50px] h-14 w-52 flex items-center justify-between font-bold'>
              <svg
                className='h-[50px] w-[50px] text-green-500 pr-2'
                fill='currentColor'
                viewBox='0 0 20 20'>
                <circle cx='10' cy='10' r='8' />
              </svg>
              <span className='mr-10'>Ver Historial</span>
            </button> */}

            <ButtonCrud
              isHidden={false}
              text="Ver Historial"
              color="bg-green-500"
              onclickHandle={() => setviewAddproductos([true, "insert"])}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-6 w-6">
                <path d="M75 75L41 41C25.9 25.9 0 36.6 0 57.9V168c0 13.3 10.7 24 24 24H134.1c21.4 0 32.1-25.9 17-41l-30.8-30.8C155 85.5 203 64 256 64c106 0 192 86 192 192s-86 192-192 192c-40.8 0-78.6-12.7-109.7-34.4c-14.5-10.1-34.4-6.6-44.6 7.9s-6.6 34.4 7.9 44.6C151.2 495 201.7 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0C185.3 0 121.3 28.7 75 75zm181 53c-13.3 0-24 10.7-24 24V256c0 6.4 2.5 12.5 7 17l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-65-65V152c0-13.3-10.7-24-24-24z"/>
              </svg>
            </ButtonCrud>


            <div className="flex bg-[#ececec] justify-center items-center gap-4 rounded-full h-14 w-52 px-2 py-2 mb-2">
              <button
                onClick={() => setShowPDF(!showPDF)}
                className="flex w-5/6 justify-center items-center text-black font-bold"
              >
                <svg
                  className="h-[50px] w-[50px] text-blue-500 pr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <circle cx="10" cy="10" r="8" />
                </svg>
                <span className="ml-2 text-[14px]">Finalizar corte</span>
              </button>
              <PDFDownloadLink
                className="w-1/6 flex justify-center items-center border-l-2 border-[#bbbcbc]"
                document={<CourtPDF corte={currentCourt} />}
                fileName="sistemaCorte.pdf"
                title="Descargar PDF"
              >
                <svg
                  className="h-[50px] w-[50px] "
                  data-slot="icon"
                  fill="none"
                  stroke-width="1.5"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                  ></path>
                </svg>
              </PDFDownloadLink>
            </div>
          </div>
        </div>
      </div>
      <div
        className="flex flex-col justify-between px-3  max-h-[100vh] h-full overflow-y-auto"
        style={{ alignSelf: "flex-start" }}
      >
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

        <hr className='mb-10 border-[1px]' />

        {showPDF ? (
          <PDFViewer className="w-full h-[100vh]" showToolbar>
            <CourtPDF corte={currentCourt} />
          </PDFViewer>
        ) : (
          <div className="xl:grid w-full flex-1 xl:grid-cols-3 xl:grid-rows-2 h-[vh] transition duration-300  ">
            <button
              className="xl:hidden flex bg-[#ccc] p-1 absolute top-0 right-0 m-5 rounded-lg items-center cursor-pointer  transition duration-300 transform hover:scale-110"
              onClick={() => setIsOpenMenu(!isOpenMenu)}
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M3 5h8m-8 7h13M3 19h18"
                />
              </svg>
            </button>
            {/*gridTemplateAreas: " 'productSold productSold summary' 'productNotSold productNotSold summary'*/}

            {/* Primer div */}
            <div className="flex text-black px-3 xl:col-span-2 col-span-3 col-start-1 row-start-1 h-[20vh] ">
              <table className="h-full w-full border-collapse">
                <thead>
                  <tr className="bg-[#ccc] rounded-full grid grid-cols-3 py-2.5">
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCourt.productosVendidos.map((product, index) => (
                    <tr

                      key={"productoVendido-" + index}
                      className='grid grid-cols-3 py-2.5 text-center'>

                      <td>{product.nombre}</td>
                      <td>{product.cantidad}</td>
                      <td>{product.precio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Tercer div */}

            <div className="flex text-black px-3 xl:col-span-2 col-span-3 row-start-2 h-[20vh]">
              <table className="h-full w-full border-collapse">
                <thead>
                  <tr className="bg-[#ccc] rounded-full grid grid-cols-3 py-2">
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCourt.productosNoVendidos.map((product, index) => (
                    <tr

                      key={"productoNoVendido-"+ index}
                      className='grid grid-cols-3 py-2.5 text-center'>

                      <td>{product.nombre}</td>
                      <td>{product.cantidad}</td>
                      <td>{product.precio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Segundo div */}

            <div className="flex  flex-col justify-items-center  text-black px-3  pb-5 row-span-2  xl:col-span-2 col-span-3 xl:col-start-3 xl:row-start-1 col-start-1 row-start-3  xl:justify-start">
              {/* Primer elemento */}
              <div className="text-[#000]  flex flex-col items-center w-full h-fit bg-[#ccc] py-2 rounded-full mb-8">
                <p className="font-bold text-[20px] text-center">ESTIMADOS</p>
              </div>
              <div className="grid gap-3 md:mb-10 ">
                <div className="flex justify-between  ">
                  <td className="justify-self-start">Salio con</td>
                  <td className="relative">
                    {currentCourt.estimados.salio}
                    <span className=" ps-3 text-sm font-bold top-0">MXN</span>
                  </td>
                </div>
                <div className="flex justify-between  ">
                  <td>Vendio</td>
                  <td className="relative">
                    {currentCourt.estimados.vendio}
                    <span className=" ps-3 text-sm font-bold top-0">MXN</span>
                  </td>
                </div>
                <div className="flex justify-between ">
                  <td>Entrego en Efectivo</td>
                  <td className="relative">
                    {currentCourt.estimados.efectivo}
                    <span className=" ps-3 text-sm font-bold top-0">MXN</span>
                  </td>
                </div>
                <div className="flex justify-between  ">
                  <td>Entrego en mercancia</td>
                  <td className="relative">
                    {currentCourt.estimados.mercancia}
                    <span className=" ps-3 text-sm font-bold   top-[-3]">
                      MXN
                    </span>
                  </td>
                </div>
              </div>
            </div>
            {/* Cuarto div */}
            <div className="w-full flex flex-col p-4   xl:col-start-3 xl:row-start-2 mb-3 xl:mb-0 xl:justify-end">
              <div
                className="w-full  gap-5 rounded-xl text-center py-5"
                style={{ boxShadow: "0px 6px 13.7px 0px rgba(0, 0, 0, 0.10)" }}
              >
                <p className="font-bold text-lg">LA DIFERENCIA ES DE:</p>
                <p className="font-normal text-xl text-red-500 relative">
                  $ {currentCourt.estimados.diferencia}
                  <span className=" ps-3 text-sm font-bold absolute top-[-3px]">
                    MXN
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}
        <div
          className={`bg-[#1d1b1b6e] absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center ${
            viewAddproductos[0] ? "visible" : "hidden"
          }`}
        >
          <form
            ref={formRef}
            action=""
            className="relative bg-slate-50 flex p-20 flex-col rounded-xl "
          >
            <div className="w-full flex absolute justify-center top-[0] -translate-y-[50%] left-0 right-0 ">
              <div
                className={`${
                  viewAddproductos[1] == "insert" ? "bg-teal-300" : "bg-sky-400"
                } w-20 h-20 flex rounded-full items-center justify-center shadow-lg shadow-emerald-800`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" height='40' width='40'>
                  <path d="M547.6 103.8L490.3 13.1C485.2 5 476.1 0 466.4 0H109.6C99.9 0 90.8 5 85.7 13.1L28.3 103.8c-29.6 46.8-3.4 111.9 51.9 119.4c4 .5 8.1 .8 12.1 .8c26.1 0 49.3-11.4 65.2-29c15.9 17.6 39.1 29 65.2 29c26.1 0 49.3-11.4 65.2-29c15.9 17.6 39.1 29 65.2 29c26.2 0 49.3-11.4 65.2-29c16 17.6 39.1 29 65.2 29c4.1 0 8.1-.3 12.1-.8c55.5-7.4 81.8-72.5 52.1-119.4zM499.7 254.9l-.1 0c-5.3 .7-10.7 1.1-16.2 1.1c-12.4 0-24.3-1.9-35.4-5.3V384H128V250.6c-11.2 3.5-23.2 5.4-35.6 5.4c-5.5 0-11-.4-16.3-1.1l-.1 0c-4.1-.6-8.1-1.3-12-2.3V384v64c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V384 252.6c-4 1-8 1.8-12.3 2.3z"/>
                </svg>
              </div>
            </div>
            <h1 className="text-slate-900 font-semibold text-xl text-center p-8">
              {viewAddproductos[1] == "insert" ? "Historial" : "Editar"} de productos vendidos
            </h1>
            <div className="flex flex-col gap-3 mb-16">
            <table className="h-full w-full border-collapse">
                <thead>
                  <tr className="bg-[#ccc] rounded-full grid grid-cols-4 py-2.5">
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCourt.productosVendidos.map((product, index) => (
                    <tr
                      key={index}
                      className="grid grid-cols-4 py-2.5 text-center"
                    >
                      <td>{product.nombre}</td>
                      <td>{product.cantidad}</td>
                      <td>{product.precio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center w-full gap-8">
              <button
                type="submit"
                onClick={() => setviewAddproductos([false, "insert"])}
                className="bg-blue-500 text-slate-50 px-6 py-2 rounded-full hover:scale-[1.1]"
              >
                Aceptar
              </button>

            </div>
          </form>
        </div>
      </div>
    </>
  );
}
