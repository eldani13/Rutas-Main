import { RootProduct, MessageProduct } from "../../types/product";
import { useState } from "react";

interface Props {
  products: MessageProduct[];
  setClickInProduct: any;
  clickInProduct: any;
}

export function Table({
  products,
  setClickInProduct,
  clickInProduct,
}: Props): JSX.Element {
  return (
    <div className="w-full h-full overflow-y-auto p-4">
      <div className="">
        <div
          className=" hidden md:grid items-center bg-neutral-300 py-2 font-bold gap-2 px-3 mb-2 rounded-full text-center"
          style={{ gridTemplateColumns: "50px 1fr 1fr 1fr 1fr" }}
        >
          <p>ID</p>
          <p>Nombre</p>
          <p>Descripcion</p>
          <p>Precio</p>
          <p>Cantidad/actual</p>
        </div>
        {
          // @ts-ignore
          products &&
            products?.map((data: MessageProduct, index: number) => (
              <div
                onClick={() => {
                  if (!data.productIsSold) {
                    setClickInProduct(clickInProduct != null ? null : data);
                  }
                }}
                className={`
            relative my-2 justify-center  py-6 md:py-2 justify-content rounded-xl flex flex-col px-5 gap-1 font-semibold ${
              data.productIsSold
                ? "bg-red-200"
                : "hover:bg-slate-200 cursor-pointer bg-[linear-gradient(225deg,_#a1c4fd_10%,_#c2e9fb_90%)] "
            }  ${
                  clickInProduct?._id == data._id
                    ? "bg-[linear-gradient(225deg,_#acfca2_10%,_#c0faea_90%)]"
                    : " md:bg-none"
                }
            md:grid  justify-items-center md:rounded-full overflow-hidden text-center`}
                style={{ gridTemplateColumns: "50px 1fr 1fr 1fr 1fr" }}
                key={index}
              >
                <td className=" mt-5 md:m-0 flex gap-1 ">
                  <span className="md:hidden font-black">ID:</span>
                  {index}
                </td>
                <td className="flex gap-1 ">
                  {" "}
                  <span className="md:hidden font-black">Nombre:</span>
                  {data.productName}
                </td>
                <td className="flex gap-1 ">
                  {" "}
                  <span className="md:hidden font-black">Descripción:</span>
                  {data.productDescription}
                </td>
                <td className="flex gap-1 ">
                  {" "}
                  <span className="md:hidden font-black">Precio: $</span>
                  {data.productPrice}
                </td>
                <td className="md:hidden text-center flex absolute   md:static top-0 w-full">
                  <p className="w-full uppercase text-2xl mt-2 font-bold md:font-normal">
                    producto
                  </p>
                </td>
                <td className="flex gap-1 ">
                  {" "}
                  <span className="md:hidden font-black">Cantidad actual</span>
                  {data.productAmount}
                </td>
              </div>
            ))
        }
      </div>
    </div>
  );
}
