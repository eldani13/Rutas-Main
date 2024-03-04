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

export default function Product() {
  const [getAllDataProducts, setAllDataProducts] = useState<
    MessageProduct[] | null
  >(null);
  const [getInputData, setInputData] = useState<string>("");
  const [getProductsSelect, setProductsSelect] = useState<
    MessageProduct[] | null
  >(null);

  const updateTable = async () => {
    await getAllFetchDataValues(
      `http://localhost:3000/api/v1/view-products`
    ).then((rec: RootProduct) => {
      // @ts-ignore
      setAllDataProducts(rec.details);
    });
  };

  useEffect(() => {
    updateTable();
  }, []);

  const handleUpdateProductSelect = (index: number, newNumber: number) => {
    setProductsSelect((prev) => {
      const newArray: MessageProduct[] | null = prev && [...prev];
      if (newArray) newArray[index].productAmount = newNumber;
      return newArray;
    });
  };

  const handleSendData = async () => {
    await getCookie(processEnv.jtIdentity).then(async(jwt_get) => {
      const jwt_decode = jwt.decode(jwt_get+"");
      const data = {
        // @ts-ignore
        employee: (jwt_decode?._id) || "",
        products: getProductsSelect?.map((product) => ({
          productId: product._id,
          amount: product.productAmount,
        })),
      };

      await postInsertData(`http://localhost:3000/api/v1/request-products/add`,data, ()=>{
        console.log("genial")
      }, 'pedido')
    });
  };

  return (
    <>
      <div className="h-[100%]">
        <div className="z-10 rigth-0 bottom-0 h-fit absolute xl:static xl:flex flex-col items-start xl:border-r-2 xl:border-[#bbbcbc] md:pt-14 px-4 xl:h-[100%] justify-between">
          <div className="hidden xl:visible xl:flex flex-col items-start justify-center">
            <h1 className="text-[#000] text-2xl font-bold mb-1">Productos</h1>
            <span className="">
              Listado de productos <br />
              registrados.
            </span>
          </div>

          {/* Botones */}
        </div>
      </div>

      <div className="max-h-[100vh] h-full pt-14 flex flex-col overflow-y-auto p-5 ">
        {/* Informacion */}
        <hr className="mb-10 border-[1px]" />

        <div className="pb-28">
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
                  fill-rule="evenodd"
                  d="M1.707.293A1 1 0 0 0 .293 1.707L5.586 7L.293 12.293a1 1 0 1 0 1.414 1.414L7 8.414l5.293 5.293a1 1 0 0 0 1.414-1.414L8.414 7l5.293-5.293A1 1 0 0 0 12.293.293L7 5.586z"
                  clip-rule="evenodd"
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
                    ).includes(getInputData) && !getProductsSelect?.includes(u)
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
                <div className="flex w-full justify-center items-center gap-3">
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
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
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
                      disabled={(product?.productAmount ?? 0) === 0}
                      className="w-8 h-8 bg-red-200 rounded-md"
                      onClick={() =>
                        handleUpdateProductSelect(
                          index,
                          (product?.productAmount ?? 0) - 1
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
                      value={product.productAmount ?? 0}
                    />
                    <button
                      className="w-8 h-8 bg-green-200 rounded-md"
                      onClick={() =>
                        handleUpdateProductSelect(
                          index,
                          (product?.productAmount ?? 0) + 1
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
        </div>
      </div>
    </>
  );
}
