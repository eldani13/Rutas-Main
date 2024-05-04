import { MessageProduct } from "@/types/product";
import { Dispatch, SetStateAction } from "react";

export default function ViewProductsSelect({
  productsSelect,
  setProductsSelect = null,
}: {
  productsSelect: MessageProduct[] | null;
  setProductsSelect?: Dispatch<SetStateAction<MessageProduct[] | null>> | null;
}) {
  return (
    <div className="w-full pt-5 flex flex-col gap-6">
      {productsSelect &&
        productsSelect.map((product, index) => (
          <div
            className="flex w-full justify-center items-center gap-3"
            key={"select-prod-" + index}
          >
            <button
              onClick={() => {
                // if (!setProductsSelect) return;
                // const newData = [...productsSelect]; // Clonar el array
                // newData.splice(index, 1); // Eliminar el producto en el índice especificado
                // setProductsSelect(newData); // Actualizar el estado
                if (!setProductsSelect) return;
                const newData = productsSelect.filter(
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
              <p className="text-center font-semibold">{product.productName}</p>
              <p className="text-base mt-2 text-slate-700 ">
                {product.productDescription}
              </p>
              <p className="text-right text-sm font-bold mt-3">
                {product.productPrice}
                <span className="text-xs ps-1">MXN</span>
              </p>
            </div>
            <div className="flex items-center gap-1 font-bold text-xl">
              <input
                type="number"
                className="flex gap-2 w-32 text-center p-2 border rounded-xl outline-none "
                // min={0}
                onChange={
                  (e) => console.log(e.target.value)
                  // handleUpdateProductSelect(index, parseInt(e.target.value))
                }
                value={product.productPrice ?? ""}
              />
            </div>
          </div>
        ))}

      {/* {productsSelect && productsSelect.length > 0 && (
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
      )} */}
    </div>
  );
}
