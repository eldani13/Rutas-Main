"use client";
import React, { useEffect, useState } from "react";
import { MessageEmployees } from "@/types/employees";
import { processEnv } from "@/utils/cookies";
import { courtResponse } from "@/temp/TempCourtResponse";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import CourtPDF from "@/pdf/CourtPDF";
import { RootRoute } from "@/types/routes";

// @ts-ignore
export default function Route({ params }) {
  const { usernameId } = params;
  console.log(usernameId);

  const [employeCurrent, setEmployeCurrent] = useState<null | MessageEmployees>(
    null
  );

  const infoUser = async () => {
    const api = await fetch(`${processEnv.back}employee/${usernameId}`, {
      method: "GET",
    });

    const username = await api.json();
    setEmployeCurrent(username);
  };

  useEffect(() => {
    infoUser();
  }, [usernameId]);

  useEffect(() => {
    console.log(employeCurrent);

    console.log(
      `current employee ${employeCurrent?.username} ${employeCurrent?.lastnames}`
    );
  }, [employeCurrent]);

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const [showPDF, setShowPDF] = useState(false);
  const [currentCourt, setCurrentCourt] = useState(courtResponse);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [tiendas, setTiendas] = useState([]);
  const [inputsMercancia, setInputsMercancia] = useState(tiendas.map(() => 0));
  const [inputsEfectivo, setInputsEfectivo] = useState(tiendas.map(() => 0));

  console.log(currentCourt);

  const [viewAddproductos, setviewAddproductos] = useState<[boolean, string]>([
    false,
    "insert",
  ]);

  useEffect(() => {
    const fetchTiendas = async () => {
      try {
        const api = await fetch(`${processEnv.back}tiendas`);
        const data = await api.json();

        if (!data || !data.message) {
          console.log("No se encontraron datos de tiendas");
          return;
        }

        setTiendas(data.message.map((tienda: any) => tienda.nombre));
      } catch (error) {
        console.error("Error al obtener las tiendas:", error);
      }
    };

    fetchTiendas();
  }, []);

  const handleInputChangeMercancia = (index: any, value: any) => {
    const newInputs = [...inputsMercancia];
    newInputs[index] = value;
    setInputsMercancia(newInputs);
  };

  const handleInputChangeEfectivo = (index: any, value: any) => {
    const newInputs = [...inputsEfectivo];
    newInputs[index] = value;
    setInputsEfectivo(newInputs);
  };

  // save entregado en mercancia
  const [mercancia, setMercancia] = useState<any>();
  const saveMercancia = async () => {
    console.log(inputsMercancia);
    let resultMercanciaTotal = inputsMercancia.reduce(
      (valor, result) => valor + result,
      0
    );

    // aqui hay que guardar en la db el resultMercanciaTotal
    setMercancia(resultMercanciaTotal);
  };

  useEffect(() => {
    console.log(typeof mercancia);
  }, [mercancia]);

  // save entregado en efectivo
  const [efectivo, setEfectivo] = useState<any>();
  const saveEfectivo = async () => {
    console.log(inputsMercancia);
    let resultEfectivoTotal = inputsEfectivo.reduce(
      (valor, result) => valor + result,
      0
    );

    // aqui hay que guardar en la db el resultEfectivoTotal
    setEfectivo(resultEfectivoTotal);
  };

  useEffect(() => {
    console.log(efectivo);
  }, [efectivo]);

  const [diferencia, setDiferencia] = useState<number>();

  const returnResultDifference = () => {
    let result =
      parseInt(efectivo) + parseInt(mercancia) - parseInt(resultDownload);

    console.log(result);
    setDiferencia(result);
  };

  useEffect(() => {
    returnResultDifference();
  }, []);

  useEffect(() => {
    console.log(diferencia);
  }, [diferencia]);

  // descarga here
  const [routes, setRoutes] = useState<null | RootRoute>(null);

  const getAllData = async () => {
    try {
      const response = await fetch(`${processEnv.back}rutas/`);
      if (!response.ok) {
        throw new Error("Error al obtener los datos de las rutas");
      }
      const data = await response.json();
      setRoutes(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  console.log(routes);

  const [resultDownload, setDownloadResult] = useState<any>();
  useEffect(() => {
    let amountContent: number[] = [];

    routes?.message.forEach((numbers) => {
      let value = numbers.amountOfMerchandise;
      amountContent.push(value);
    });

    const resultAmountTotal = amountContent.reduce(
      (total, currentValue) => total + currentValue,
      0
    );

    setDownloadResult([resultAmountTotal]);
  }, [routes?.message]);

  console.log(resultDownload);

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
              <p style={{ color: "#000" }}>{employeCurrent?.user}</p>
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
                <p style={{ color: "#828282" }}>
                  {employeCurrent?.username} {employeCurrent?.lastnames}
                </p>
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="pb-10 flex flex-col space-y-10 items-center">
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

        <hr className="mb-10 border-[1px]" />

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

            {/* Primer div */}
            <div className="flex text-black px-3 xl:col-span-2 col-span-3 col-start-1 row-start-1 h-[20vh] ">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#ccc] rounded-full py-2.5">
                    <th className="hidden md:table-cell">Nombre tienda</th>
                    <th className="hidden md:table-cell">Descarga</th>
                    <th>Entregado en mercancia</th>
                    <th>Entregado en efectivo</th>
                    <th>Diferencia</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {/* nombre tienda */}
                    <td>
                      {tiendas.map((nombre, index) => (
                        <li key={index}>{nombre}</li>
                      ))}
                    </td>

                    {/* descarga */}
                    <td>
                      {routes?.message.map((nombre, index) => (
                        <li key={index}>{nombre.amountOfMerchandise}</li>
                      ))}
                    </td>

                    {/* entregado en mercancia */}
                    <td>
                      {tiendas.map((nombre, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input
                            className="border-4"
                            type="number"
                            value={inputsMercancia[index]}
                            min={0}
                            onChange={(e) =>
                              handleInputChangeMercancia(
                                index,
                                parseInt(e.target.value)
                              )
                            }
                            name=""
                            id=""
                          />
                        </div>
                      ))}
                      <button
                        onClick={saveMercancia}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded flex items-center justify-center"
                        type="button"
                      >
                        🔰
                      </button>
                    </td>

                    {/* entregado en efectivo */}
                    <td>
                      {tiendas.map((nombre, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input
                            className="border-4"
                            type="number"
                            value={inputsEfectivo[index]}
                            min={0}
                            onChange={(e) =>
                              handleInputChangeEfectivo(
                                index,
                                parseInt(e.target.value)
                              )
                            }
                            name=""
                            id=""
                          />
                        </div>
                      ))}
                      <button
                        onClick={saveEfectivo}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded flex items-center justify-center"
                        type="button"
                      >
                        🔰
                      </button>
                    </td>

                    {/* diferencia */}
                    <td>
                      {tiendas.map((nombre, index) => (
                        <li key={index}>{nombre}</li>
                      ))}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex text-black px-3 xl:col-span-2 col-span-3 row-start-2 h-[20vh]">
              <div className="flex text-black px-3 xl:col-span-2 col-span-3 col-start-1 row-start-1 h-[20vh]">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#ccc] rounded-full py-2.5">
                      <th className="hidden md:table-cell px-4 py-2">
                        Descarga ruta
                      </th>
                      <th className="hidden md:table-cell px-4 py-2">
                        Efectivo ruta
                      </th>
                      <th className="px-4 py-2">En mercancia Ruta</th>
                      <th className="px-4 py-2">Diferencia</th>{" "}
                      <button
                        onClick={returnResultDifference}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Calcular Diferencia
                      </button>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {/* suma de descarga */}
                      <td className="px-4 py-2">{resultDownload ?? 0}</td>

                      {/* mercancia ruta */}
                      <td className="px-4 py-2">{mercancia ?? 0}</td>

                      {/* entregado en efectivo */}
                      <td className="px-4 py-2">{efectivo ?? 0}</td>

                      {/* diferencia */}
                      <td className="px-4 py-2">
                        {Number.isNaN(diferencia) ? 0 : diferencia}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        <div
          className={`bg-[#1d1b1b6e] absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center ${
            viewAddproductos[0] ? "visible" : "hidden"
          }`}
        ></div>
      </div>
    </>
  );
}
