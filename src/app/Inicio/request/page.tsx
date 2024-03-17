"use client";
import { MessageProduct, RootProduct } from "@/types/product";
import {
  deleteRemoveData,
  getAllFetchDataValues,
  patchEditVal,
  postInsertData,
} from "@/utils/api";
import React, { useEffect, useRef, useState, FormEvent } from "react";
import { ButtonCrud } from "@/components/buttons/ButtonCrud";
import { getCookie, processEnv } from "@/utils/cookies";
import jwt from "jsonwebtoken";
import { MessageRequestProducts } from "@/types/requestProducts";
import { MessageRoute } from "@/types/routes";
import { MessageVehicle } from "@/types/vehicles";

export default function Product() {
  const [getAllDataProducts, setAllDataProducts] = useState<
    MessageProduct[] | null
  >(null);
  const [allDataVehicle, setAllDataVehicle] = useState<null | MessageVehicle[]>(
    null
  );
  const [allDataRoutes, setAllDataRoutes] = useState<null | MessageRoute[]>(
    null
  );

  const [getInputData, setInputData] = useState<string>("");
  const [getProductsSelect, setProductsSelect] = useState<
    MessageProduct[] | null
  >(null);
  const [routeSelect, setRouteSelect] = useState<null | MessageRoute>(null);

  const [requestCurrentIfExist, setRequestCurrentIfExist] =
    useState<null | MessageRequestProducts>(null);
  const [indexCurrentRequest, setIndexCurrentRequest] = useState<number>(0);
  const [allPetitionInRequest, setAllPetitionInRequest] = useState<
    MessageRequestProducts[] | null
  >(null);

  const fnGetAllDataRoutes = async () => {
    await getCookie(processEnv.jtIdentity).then(async (jwt_get) => {
      const jwt_decode = jwt.decode(jwt_get + "");
      await getAllFetchDataValues(
        //@ts-ignore
        `${processEnv.back}rutas/employee/${jwt_decode?._id}`
      ).then((rec) => {
        setAllDataRoutes(rec.message);
      });
    });
  };
  const fnGetAllDataVehicle = async () => {
    await getAllFetchDataValues(`${processEnv.back}cars-units/`).then((rec) => {
      setAllDataVehicle(rec.message);
    });
  };

  const updateTable = async () => {
    await getAllFetchDataValues(`${processEnv.back}view-products`).then(
      (rec: RootProduct) => {
        // @ts-ignore
        setAllDataProducts(rec.details);
      }
    );
  };

  useEffect(() => {
    fnGetAllDataVehicle();
    fnGetAllDataRoutes();
    updateTable();
  }, []);

  const handleUpdateProductSelect = (index: number, newNumber: number) => {
    setProductsSelect((prev) => {
      const newArray: MessageProduct[] | null = prev && [...prev];
      if (newArray) newArray[index].amount = newNumber;
      return newArray;
    });
  };

  const handleSendData = async () => {
    const data = {
      route: routeSelect?._id || "",
      state: "pendiente",
      dateTime: new Date().toISOString(),
      products: getProductsSelect?.map((product) => ({
        productId: product._id,
        amount: product.amount,
      })),
    };

    await postInsertData(
      `${processEnv.back}request-products/add`,
      data,
      () => {
        setRouteSelect(null);
        fnGetAllDataRoutes();
        // updateTable();
      },
      "pedido"
    );
  };

  const getIfProductSelect = async (routeSelection: MessageRoute) => {
    // @ts-ignore
    const getDta = await getAllFetchDataValues(
      `${processEnv.back}request-product/route/${routeSelection?._id}`
    );

    console.log(getDta.details);

    setAllPetitionInRequest(getDta.details.length > 0 ? getDta.details : null);
    setRequestCurrentIfExist(
      getDta.details.length > 0 ? getDta.details[indexCurrentRequest] : null
    );
  };

  const dateFormater = (fecha: Date) => {
    const year = fecha.getFullYear();
    const mes = ("0" + (fecha.getMonth() + 1)).slice(-2); // Sumar 1 ya que los meses van de 0 a 11
    const dia = ("0" + fecha.getDate()).slice(-2);
    const horas = ("0" + fecha.getHours()).slice(-2);
    const minutos = ("0" + fecha.getMinutes()).slice(-2);
    const segundos = ("0" + fecha.getSeconds()).slice(-2);
    return (
      <>
        {year}/{mes}/{dia}
        <span className="ms-3 font-normal">
          {horas}:{minutos}
        </span>
      </>
    );
  };
  // 659b7b14eb5e9fb8bea0e9fc
  console.log(allDataVehicle);
  console.log(allDataRoutes);
  console.log(requestCurrentIfExist);
  return (
    <>
      <div className="h-[100%]">
        <div className="z-10 rigth-0 bottom-0 h-fit absolute xl:static xl:flex flex-col items-start xl:border-r-2 xl:border-[#bbbcbc] md:pt-14  xl:h-[100%]">
          <div className="hidden xl:visible xl:flex flex-col items-start justify-center px-2">
            <h1 className="text-[#000] text-2xl font-bold mb-1">Rutas</h1>
            <span className="">Listado de rutas</span>
          </div>
          <div className="flex flex-col pt-5 gap-3">
            {allDataRoutes &&
              allDataRoutes.map((requestRoute, index) => (
                <div
                  key={"route-" + index}
                  onClick={() => {
                    console.log(requestRoute);
                    setRouteSelect(requestRoute);
                    getIfProductSelect(requestRoute);
                    setIndexCurrentRequest(0);
                  }}
                  className={`${
                    requestRoute == routeSelect ? "bg-slate-100" : ""
                  } flex flex-col py-2 text-[#000] items-start overflow-auto gap-2 hover:bg-slate-200 cursor-pointer `}
                >
                  <div className="px-2 min-w-60">
                    <p className="font-semibold text-sm">
                      Marca:{" "}
                      <span className="font-medium">
                        {
                          allDataVehicle?.find(
                            (u) => u._id == requestRoute.vehicle
                          )?.marca
                        }
                      </span>
                    </p>
                    <p className="font-semibold text-sm">
                      Modelo:{" "}
                      <span className="font-medium">
                        {
                          allDataVehicle?.find(
                            (u) => u._id == requestRoute.vehicle
                          )?.modelo
                        }
                      </span>
                    </p>
                    {/* <p className="text-base font-semibold mb-2">
                      {
                        // @ts-ignore
                        allDataEmployees?.find(
                          (pr) => pr._id == requestProd.employee
                        ).username
                      }
                    </p> */}
                    {/* <p className="text-sm">Carro: {allDataEmployees?.filter(pr=>pr._id==requestProd.employee)[0].username}</p> */}

                    {/* <p className="text-xs font-semibold text-right">
                      {dateFormater(new Date(requestProd.dateTime))}
                    </p> */}
                    {/* <p
                      className={`${
                        requestProd.state === "pendiente"
                          ? "text-yellow-500"
                          : requestProd.state === "rechazado"
                          ? "text-orange-500"
                          : requestProd.state === "aprobado"
                          ? "text-lime-500"
                          : ""
                      } 
                          text-sm font-semibold text-right`}
                    >
                      {requestProd.state}
                    </p> */}
                  </div>
                </div>
              ))}
          </div>
          {/* Botones */}
        </div>
      </div>

      <div className="max-h-[100vh] h-full pt-14 flex flex-col overflow-y-auto p-5 ">
        <div className="pt-4 flex items-center gap-2">
          <label>Petición: </label>
          <button
            onClick={() => {
              setRequestCurrentIfExist(
                // @ts-ignore
                allPetitionInRequest[indexCurrentRequest - 1]
              );
              setIndexCurrentRequest(indexCurrentRequest - 1);
            }}
            className={`${indexCurrentRequest == 0 && "text-slate-400"}`}
            disabled={indexCurrentRequest == 0}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 32 32"
            >
              <path
                fill="currentColor"
                d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2m8 15H11.85l5.58 5.573L16 24l-8-8l8-8l1.43 1.393L11.85 15H24Z"
              />
              <path
                fill="none"
                d="m16 8l1.43 1.393L11.85 15H24v2H11.85l5.58 5.573L16 24l-8-8z"
              />
            </svg>
          </button>
          <p className="font-semibold">{indexCurrentRequest + 1}</p>
          <button
            onClick={() => {
              setRequestCurrentIfExist(
                // @ts-ignore
                allPetitionInRequest[indexCurrentRequest + 1]
              );

              console.log(
                indexCurrentRequest + 1 >=
                  (allPetitionInRequest?.length || 0) - 1
                  ? // @ts-ignore
                    allPetitionInRequest[indexCurrentRequest + 1]
                  : null
              );
              // @ts-ignore
              console.log(allPetitionInRequest[indexCurrentRequest + 1]);

              setIndexCurrentRequest(indexCurrentRequest + 1);
            }}
            className={`${
              indexCurrentRequest + 1 > (allPetitionInRequest?.length || 0) &&
              "text-slate-400"
            }`}
            disabled={
              indexCurrentRequest + 1 > (allPetitionInRequest?.length || 0)
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 32 32"
            >
              <path
                fill="currentColor"
                d="M2 16A14 14 0 1 0 16 2A14 14 0 0 0 2 16m6-1h12.15l-5.58-5.607L16 8l8 8l-8 8l-1.43-1.427L20.15 17H8Z"
              />
              <path
                fill="none"
                d="m16 8l-1.43 1.393L20.15 15H8v2h12.15l-5.58 5.573L16 24l8-8z"
              />
            </svg>
          </button>

          {/* <select name="" id="" className="w-fit px-4" onChange={e=>{setRequestCurrentIfExist(e.target.value)}}>
              {requestProductsAll?.map((ex, index) => (
                <option value={index}>{index + 1}</option>
              ))}
            </select> */}
        </div>

        {/* Informacion */}
        <hr className="mb-10 border-[1px]" />
        {routeSelect && (
          <div className="pb-28">
            {!requestCurrentIfExist ? (
              <>
                {requestCurrentIfExist &&
                  // @ts-ignore
                  requestCurrentIfExist.state === "aprobado" && (
                    <div>
                      <h1 className="text-sm font-semibold">
                        {/* Número de petición: {1} */}
                      </h1>
                    </div>
                  )}
                <form className="rounded-xl w-full md:w-1/2 m-auto flex gap-1">
                  <input
                    value={getInputData}
                    onChange={(e) => setInputData(e.target.value)}
                    className="block h-10 w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                  />
                  <button
                    type="reset"
                    onClick={() => setInputData("")}
                    className="text-red-600 w-6 h-10 flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 14 14"
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M1.707.293A1 1 0 0 0 .293 1.707L5.586 7L.293 12.293a1 1 0 1 0 1.414 1.414L7 8.414l5.293 5.293a1 1 0 0 0 1.414-1.414L8.414 7l5.293-5.293A1 1 0 0 0 12.293.293L7 5.586z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </form>
                <div className="w-full flex gap-3 overflow-x-auto pb-5">
                  {getAllDataProducts &&
                    getAllDataProducts
                      .filter(
                        (u) =>
                          (
                            u.productName +
                            u.productDescription +
                            u.productPrice
                          )
                            .toLowerCase()
                            .includes(getInputData.toLowerCase()) &&
                          !getProductsSelect?.includes(u)
                      )
                      .map((product, index) => (
                        <div
                          key={"product_" + index}
                          className="group overflow-hidden bg-orange-200 min-w-60 p-5 rounded-xl flex flex-col justify-between relative"
                        >
                          <div>
                            <p className="text-center font-semibold">
                              {product.productName}
                            </p>
                            <p className="text-base mt-2 text-slate-700 ">
                              {product.productDescription}
                            </p>
                          </div>
                          <div>
                            {/* <button></button> */}
                            <p className="text-right text-sm font-bold mt-3">
                              {product.productPrice}
                              <span className="text-xs ps-1">MXN</span>
                            </p>
                          </div>
                          <div className="w-full h-full grid place-items-center bg-[#ffffff65] absolute top-0 left-full group-hover:left-0 duration-200">
                            <button
                              onClick={() =>
                                setProductsSelect((prev) => {
                                  if (prev === null) return [product];
                                  return [...prev, product];
                                })
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-12 hover:scale-125 duration-75"
                                viewBox="0 0 48 48"
                              >
                                <circle cx="24" cy="24" r="21" fill="#4caf50" />
                                <g fill="#fff">
                                  <path d="M21 14h6v20h-6z" />
                                  <path d="M14 21h20v6H14z" />
                                </g>
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                </div>
                {/* Contenido */}
                <div className="w-full pt-5 flex flex-col gap-6">
                  {getProductsSelect &&
                    getProductsSelect.map((product, index) => (
                      <div
                        className="flex w-full justify-center items-center gap-3"
                        key={"select-prod-" + index}
                      >
                        <button
                          onClick={() => {
                            const newData = getProductsSelect.filter(
                              (dato) => dato != product
                            );
                            setProductsSelect(newData);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-7 hover:animate-pulse text-red-700"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4 7h16M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3m-5 5l4 4m0-4l-4 4"
                            />
                          </svg>
                        </button>
                        <div className="w-2/3 bg-blue-100 p-3 rounded-xl">
                          <p className="text-center font-semibold">
                            {product.productName}
                          </p>
                          <p className="text-base mt-2 text-slate-700 ">
                            {product.productDescription}
                          </p>
                          <p className="text-right text-sm font-bold mt-3">
                            {product.productPrice}
                            <span className="text-xs ps-1">MXN</span>
                          </p>
                        </div>
                        <div className="flex items-center gap-1 font-bold text-xl">
                          <button
                            disabled={(product?.amount ?? 0) === 0}
                            className="w-8 h-8 bg-red-200 rounded-md"
                            onClick={() =>
                              handleUpdateProductSelect(
                                index,
                                (product?.amount ?? 0) - 1
                              )
                            }
                          >
                            -
                          </button>
                          <input
                            type="number"
                            className="flex w-14 text-center"
                            min={0}
                            onChange={(e) =>
                              handleUpdateProductSelect(
                                index,
                                parseInt(e.target.value)
                              )
                            }
                            value={product.amount ?? 0}
                          />
                          <button
                            className="w-8 h-8 bg-green-200 rounded-md"
                            onClick={() =>
                              handleUpdateProductSelect(
                                index,
                                (product?.amount ?? 0) + 1
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}

                  {getProductsSelect && getProductsSelect.length > 0 && (
                    <div className="w-full flex justify-center gap-5 mt-10">
                      <button
                        type="button"
                        onClick={() => {
                          updateTable();
                          setProductsSelect(null);
                        }}
                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                      >
                        Reiniciar
                      </button>

                      <button
                        type="button"
                        onClick={handleSendData}
                        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
                      >
                        Realizar solicitud
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="w-full h-full flex flex-col">
                <div
                  className={`flex flex-col text-[#000] items-center overflow-auto gap-2 `}
                >
                  <div className=" min-w-60 bg-slate-100 rounded-full p-5">
                    {/* <p className="text-sm">Carro: {allDataEmployees?.filter(pr=>pr._id==requestProd.employee)[0].username}</p> */}
                    <p className="text-xl">
                      Ya has realizado un pedido, por favor esperar
                    </p>
                    <p className="text-xs font-semibold text-right">
                      {dateFormater(
                        new Date(requestCurrentIfExist?.dateTime || "")
                      )}
                    </p>
                    <p
                      className={`${
                        requestCurrentIfExist.state === "pendiente"
                          ? "text-yellow-500"
                          : requestCurrentIfExist.state === "rechazado"
                          ? "text-orange-500"
                          : requestCurrentIfExist.state === "aprobado"
                          ? "text-lime-500"
                          : ""
                      }
                           text-sm font-semibold text-right`}
                    >
                      {requestCurrentIfExist.state}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
