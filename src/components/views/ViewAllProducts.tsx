import { MessageProduct, RootProduct } from "@/types/product";
import { getAllFetchDataValues } from "@/utils/api";
import { processEnv } from "@/utils/cookies";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function ViewAllProducts({
  dataFilter = "",
  noIncludeData = null,
  setProductsSelect = null,
}: {
  dataFilter?: string;
  noIncludeData?: MessageProduct[] | null;
  setProductsSelect?: Dispatch<SetStateAction<MessageProduct[] | null>> | null;
}) {
  const [allDataProducts, setAllDataProducts] = useState<
    MessageProduct[] | null
  >(null);
  const getAllProducts = async () => {
    await getAllFetchDataValues(`${processEnv.back}view-products`).then(
      (rec: RootProduct) => {
        setAllDataProducts(rec.details);
      }
    );
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="w-full flex gap-3 overflow-x-auto pb-5">
      {allDataProducts &&
        allDataProducts
          .filter(
            (u) =>
              (u.productName + u.productDescription + u.productPrice)
                .toLowerCase()
                .includes(dataFilter.toLowerCase()) &&
              !noIncludeData?.includes(u)
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
                    setProductsSelect &&
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
  );
}
