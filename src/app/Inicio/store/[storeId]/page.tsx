"use client";
import { MessageProduct, RootProduct } from "@/types/product";
import { getAllFetchDataValues } from "@/utils/api";
import { processEnv } from "@/utils/cookies";
import { useEffect, useState } from "react";
import ViewAllProducts from "../../../../components/views/ViewAllProducts";
import ViewProductsSelect from "../../../../components/views/ViewProductsSelect";

export default function Products() {
  const [searchData, setSearchData] = useState("");
  const [selectData, setSelectData] = useState<MessageProduct[] | null>(null);
  return (
    <>
      {/* <div className="h-[100%]">
        <div className="z-10 rigth-0 bottom-0 h-fit absolute xl:static xl:flex flex-col items-start xl:border-r-2 xl:border-[#bbbcbc] md:pt-14  xl:h-[100%]">
          <div className="hidden xl:visible xl:flex flex-col items-start justify-center px-2">
            <h1 className="text-[#000] text-2xl font-bold mb-1">Rutas</h1>
            <span className="">Listado de rutas</span>
          </div>

        </div>
      </div> */}
      <span></span>
      <div className="max-h-[100vh] h-full pt-14 flex flex-col overflow-y-auto p-5 ">
        {/* Informacion */}
        <hr className="mb-10 border-[1px]" />
        {/* {allDataProducts && ( */}
        {true && (
          <div className="pb-28">
            <form className="rounded-xl w-full md:w-1/2 m-auto flex gap-1">
              <input
                value={searchData}
                onChange={(e) => setSearchData(e.target.value)}
                className="block h-10 w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
              />
              <button
                type="reset"
                onClick={() => setSearchData("")}
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
            <ViewAllProducts
              dataFilter={searchData}
              noIncludeData={selectData}
              setProductsSelect={setSelectData}
            />
            {/* Contenido */}
            <ViewProductsSelect
              productsSelect={selectData}
              setProductsSelect={setSelectData}
            />
          </div>
        )}
      </div>
    </>
  );
}
