"use client";
import { MessageProduct } from "@/types/product";
import {
  deleteRemoveData,
  getAllFetchDataValues,
  patchEditVal,
} from "@/utils/api";
import { processEnv } from "@/utils/cookies";
import { useEffect, useState } from "react";
import ViewAllProducts from "../../../../components/views/ViewAllProducts";
import ViewProductsSelect from "../../../../components/views/ViewProductsSelect";
import { MessageStores, ProductsInStores } from "@/types/stores";
import StoreForm from "@/components/forms/StoreForm";

export default function Products({ params }: { params: { storeId: string } }) {
  const { storeId } = params;

  const [searchData, setSearchData] = useState("");
  const [allDataProducts, setAllDataProducts] = useState<
    MessageProduct[] | null
  >(null);
  const [selectData, setSelectData] = useState<MessageProduct[] | null>(null);
  const [storeCurrent, setStoreCurrent] = useState<MessageStores | null>(null);
  const [productsInStore, setProductsInStore] = useState<
    MessageProduct[] | null
  >(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isModifyStore, setIsModifyStore] = useState(false);

  const getStoreCurrent = async () => {
    await getAllFetchDataValues(`${processEnv.back}tienda/${storeId}`).then(
      (resp) => {
        console.log(resp);
        setStoreCurrent(resp.message);
      }
    );
  };

  const removeStore = async () => {
    await deleteRemoveData(
      `${processEnv.back}tienda/delete/${storeId}`,
      () => {
        window.location.href = "/Inicio/store";
      },
      "tienda",
      `Quieres eliminar \nTienda: ${storeCurrent?.nombre} \nCoordinador: ${storeCurrent?.coordinador}`
    );
  };

  useEffect(() => {
    getStoreCurrent();
  }, []);
  useEffect(() => {
    transformIdToProducts();
  }, [allDataProducts]);

  const transformIdToProducts = () => {
    const dataReturn =
      allDataProducts
        ?.filter((prod) => {
          return storeCurrent?.productos.some(
            (item) => item.product === prod._id
          );
        })
        .map((obj: MessageProduct) => {
          const objetoEnSegundoArray = storeCurrent?.productos.find(
            (item) => obj._id === item.product
          );
          return {
            ...obj,
            productPrice: objetoEnSegundoArray?.price || 0,
            _idInRequest: objetoEnSegundoArray?._id || 0,
          } as MessageProduct;
        }) || null;

    if (!dataReturn) return;
    const newData = [...dataReturn];
    setProductsInStore(newData);
    // setProductsInStoreInitial(newData);
    setSelectData(newData);
  };

  const handleSendData = async () => {
    if (!selectData) return;
    setIsLoading(true);
    console.log(
      selectData.map((prev) => ({
        product: prev?._id,
        price: prev.productPrice,
      }))
    );
    await patchEditVal(
      `${processEnv.back}tienda/rempleaceproducts/${storeId}`,

      selectData.map((prev) => ({
        product: prev._id,
        price: prev.productPrice,
      })),

      async () => {
        await getStoreCurrent();
      },
      "Quieres Modificar los productos de la tienda?"
    );
    setIsLoading(false);
  };
  console.log(productsInStore);
  console.log(selectData);
  console.log(storeCurrent);
  // console.log(productsInStoreInitial);
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
        <div className="absolute right-2 top-2 flex gap-5">
          <button
            onClick={() => setIsModifyStore(true)}
            className="bg-blue-400 rounded-xl hover:bg-blue-500 px-2 py-1 text-slate-50"
          >
            Editar tienda
          </button>
          <button
            onClick={removeStore}
            className="bg-red-400 rounded-xl hover:bg-red-500 px-2 py-1 text-slate-50"
          >
            Eliminar tienda
          </button>
        </div>

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
                    fillRule="evenodd"
                    d="M1.707.293A1 1 0 0 0 .293 1.707L5.586 7L.293 12.293a1 1 0 1 0 1.414 1.414L7 8.414l5.293 5.293a1 1 0 0 0 1.414-1.414L8.414 7l5.293-5.293A1 1 0 0 0 12.293.293L7 5.586z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </form>
            <ViewAllProducts
              dataFilter={searchData}
              noIncludeData={selectData}
              setProductsSelect={setSelectData}
              setAllDataProductsProp={setAllDataProducts}
            />
            {/* Contenido */}
            <ViewProductsSelect
              productsSelect={selectData}
              setProductsSelect={setSelectData}
            />
          </div>
        )}

        <div className="w-full flex justify-center gap-5 mt-10">
          {!isLoading ? (
            selectData &&
            selectData.length > 0 && (
              <>
                <button
                  type="button"
                  onClick={async () => {
                    setIsLoading(true);
                    await getStoreCurrent();
                    transformIdToProducts();
                    setIsLoading(false);
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
                  Guardar cambios
                </button>
              </>
            )
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="5em"
              height="5em"
              className="m-auto text-blue-600"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z"
                opacity="0.5"
              />
              <path
                fill="currentColor"
                d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"
              >
                <animateTransform
                  attributeName="transform"
                  dur="1s"
                  from="0 12 12"
                  repeatCount="indefinite"
                  to="360 12 12"
                  type="rotate"
                />
              </path>
            </svg>
          )}
        </div>

        <StoreForm
          view={isModifyStore}
          setReturnView={setIsModifyStore}
          handleSuccesForm={() => {
            // getAllStores();
            // setViewForm(false);
          }}
          dataFormCurrentParam={storeCurrent}
          type="Editar"
        />
      </div>
    </>
  );
}
