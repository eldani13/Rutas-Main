import { MessageProduct } from "@/types/product";
import { Dispatch, SetStateAction } from "react";

export default function ViewProductsSelect({
  productsSelect,
  setProductsSelect = null,
  utils,
}: {
  productsSelect: MessageProduct[] | null;
  setProductsSelect?: Dispatch<SetStateAction<MessageProduct[] | null>> | null;
  utils: any;
}) {
  const handleUpdateProductSelect = (index: number, newNumber: number) => {
    if (!setProductsSelect) return;

    setProductsSelect((prev) => {
      const newArray: MessageProduct[] | null = prev && [...prev];
      if (newArray) newArray[index].productPrice = newNumber;

      console.log("sangre de JUNIORSSSSSSS!!!!!");
      return newArray;
    });
  };

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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
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
              {/* precio producto */}
              <input
                type="number"
                className="flex gap-2 w-32 text-center p-2 border rounded-xl outline-none "
                min={0}
                onChange={(e) =>
                  handleUpdateProductSelect(index, parseInt(e.target.value))
                }
                value={product.productPrice ?? 0}
              />
            </div>
          </div>
        ))}
    </div>
  );
}
