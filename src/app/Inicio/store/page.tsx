"use client";
import StoreForm from "@/components/forms/StoreForm";
import { MessageStores, RootStores } from "@/types/stores";
import { getAllFetchDataValues } from "@/utils/api";
import { processEnv } from "@/utils/cookies";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Store() {
  const [viewForm, setViewForm] = useState(false);
  const [allStores, setAllStores] = useState<MessageStores[] | null>();

  const getAllStores = async () => {
    await getAllFetchDataValues(`${processEnv.back}tiendas`).then(
      (resp: RootStores) => {
        console.log(resp.message);
        setAllStores(resp.message);
      }
    );
  };
  useEffect(() => {
    getAllStores();
  }, []);

  return (
    <>
      <span></span>
      <div className="flex items-center justify-center gap-5 p-5 flex-wrap relative h-full">
        {allStores && allStores.length > 0 ? (
          allStores.map((store) => (
            <Link href={`store/${store._id}`}>
              <div
                className="grid grid-cols-[auto_1fr] rounded-md shadow shadow-slate-800/30 p-3 gap-2 bg-white
					hover:bg-slate-100 duration-100 cursor-pointer"
              >
                <div className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-14 h-14"
                  >
                    <path
                      fill="currentColor"
                      d="M4 6V4h16v2zm0 14v-6H3v-2l1-5h16l1 5v2h-1v6h-2v-6h-4v6zm2-2h6v-4H6z"
                    />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <h1 className="text-base font-semibold text-center">
                    {/* Nombre tienda */}
                    {store.nombre}
                  </h1>
                  <h2 className="text-sm text-slate-700">
                    Coordinador: {store.coordinador}
                  </h2>
                  <h2 className="text-xs text-right mt-2">
                    {/* jr alfonso ugarte C.3 */}
                    {store.direccion}
                  </h2>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <h1 className="text-center font-semibold text-slate-900 text-xl">
            No hay tiendas para mostrar
          </h1>
        )}

        <button
          className=" absolute z-10 right-5 bottom-5 hover:scale-105"
          onClick={() => setViewForm(true)}
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

        {/* Form Store*/}
        <StoreForm
          view={viewForm}
          setReturnView={setViewForm}
          handleSuccesForm={() => {
            getAllStores();
            setViewForm(false);
          }}
        />
      </div>
    </>
  );
}
