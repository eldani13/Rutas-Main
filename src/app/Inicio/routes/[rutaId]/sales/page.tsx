"use client";

import React, { useState, useEffect, FormEvent } from "react";
import {
  getAllFetchDataValues,
  patchEditVal,
  patchSaleProduct,
} from "@/utils/api";
import { MessageProduct, RootProduct } from "@/types/product";
import { Table, SearchInput } from "@/components";
import Swal from "sweetalert2";
import { ButtonCrud } from "@/components/buttons/ButtonCrud";

import Quagga from "@ericblade/quagga2";
import { MessageRoute } from "@/types/routes";
import { getCookie, processEnv } from "@/utils/cookies";
import jwt from "jsonwebtoken";
import { MessageRequestProducts } from "@/types/requestProducts";
import Link from "next/link";

//@ts-ignore
export default function Sales({ params }) {
  const { rutaId } = params;

  const [indexCurrentRequest, setIndexCurrentRequest] = useState<number>(0);
  const [ammountSaleInp, setAmmountSaleInp] = useState<number>(1);

  const [allProducts, setAllProducts] = useState<MessageProduct[]>();
  const [products, setProducts] = useState<MessageProduct[]>();
  const [clickInProduct, setClickInProduct] = useState<null | MessageProduct>(
    null
  );
  const [search, setSearch] = useState("");
  const [_scannerIsRunning, set_scannerIsRunning] = useState(false);
  const [actualProductSearchScanner, set_actualProductSearchScanner] =
    useState<MessageProduct | null>(null);

  const [routeCurrent, setRouteCurrent] = useState<null | MessageRoute>(null);

  const [requestProductsAll, setRequestProductsAll] = useState<
    null | MessageRequestProducts[]
  >(null);
  const [requestCurrentIfExist, setRequestCurrentIfExist] =
    useState<null | MessageRequestProducts>(null);

  const getDataRoute = async () => {
    const dataValues = await getAllFetchDataValues(
      `${processEnv.back}rutas/${rutaId}`
    )
      .then((rec) => {
        const messList: MessageRoute = rec.message;
        if (messList != null) {
          return messList;
        }
      })
      .catch(() => null);

    setRouteCurrent(dataValues || null);
  };

  const getProducts = async () => {
    const productsget = await getAllFetchDataValues(
      `${processEnv.back}view-products`
    );
    setAllProducts(productsget.details);
  };
  function startScanner() {
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          //@ts-ignore
          target: document.querySelector("#viewcamera"),
          constraints: {
            facingMode: "environment",
          },
        },
        decoder: {
          readers: [
            "code_128_reader",
            "ean_reader",
            "ean_8_reader",
            "code_39_reader",
            "code_39_vin_reader",
            "codabar_reader",
            "upc_reader",
            "upc_e_reader",
            "i2of5_reader",
          ],
          debug: {
            //@ts-ignore
            showCanvas: true,
            showPatches: true,
            showFoundPatches: true,
            showSkeleton: true,
            showLabels: true,
            showPatchLabels: true,
            showRemainingPatchLabels: true,
            boxFromPatches: {
              showTransformed: true,
              showTransformedBox: true,
              showBB: true,
            },
          },
        },
      },
      function (err) {
        if (err) {
          console.log(err);
          return;
        }

        console.log("Initialization finished. Ready to start");
        Quagga.start();

        // Set flag to is running
        set_scannerIsRunning(true);
      }
    );

    Quagga.onProcessed(function (result) {
      var drawingCtx = Quagga.canvas.ctx.overlay,
        drawingCanvas = Quagga.canvas.dom.overlay;
      drawingCanvas.style.position = "absolute";
      drawingCanvas.style.top = "0";
      if (result) {
        if (result.boxes) {
          drawingCtx.clearRect(
            0,
            0,
            //@ts-ignore
            parseInt(drawingCanvas.getAttribute("width")),
            //@ts-ignore
            parseInt(drawingCanvas.getAttribute("height"))
          );
          result.boxes
            .filter(function (box) {
              return box !== result.box;
            })
            .forEach(function (box) {
              Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                color: "green",
                lineWidth: 2,
              });
            });
        }

        if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
            color: "#00F",
            lineWidth: 2,
          });
        }

        if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(
            result.line,
            { x: "x", y: "y" },
            drawingCtx,
            { color: "red", lineWidth: 3 }
          );
        }
      }
    });

    Quagga.onDetected(function (result) {
      console.log(
        "Barcode detected and processed : [" + result.codeResult.code + "]",
        result
      );

      const productFind = products?.find(
        (item) => item.productIdScan == parseInt(result.codeResult.code || "0")
      );
      if (
        productFind != undefined &&
        productFind != actualProductSearchScanner
      ) {
        //@ts-ignore
        set_actualProductSearchScanner(productFind);
        // @ts-ignore
        setSearch(result.codeResult.code);
      }
    });
  }

  useEffect(() => {
    getIfProductSelect();
    getProducts();
    getDataRoute();
  }, []);

  useEffect(() => {
    const dataReturn = allProducts
      ?.filter((prod) => {
        return requestCurrentIfExist?.products.some(
          (item) => item.product === prod._id
        );
      })
      .map((obj) => {
        const objetoEnSegundoArray = requestCurrentIfExist?.products.find(
          (item) => obj._id === item.product
        );
        return {
          ...obj,
          amount: objetoEnSegundoArray?.amount || 0,
          amountCurrent: objetoEnSegundoArray?.amountCurrent || 0,
          _idInRequest: objetoEnSegundoArray?._id || "",
        };
      });
    // @ts-ignore
    //ADDMER
    setProducts(dataReturn);

    console.log(dataReturn);
  }, [allProducts]);

  const handleClickOnOffScanner = (value: boolean) => {
    console.log("lol");
    if (!value) {
      set_scannerIsRunning(value);
      try {
        Quagga.stop();
      } catch (err) {
        console.log(err);
      }
    } else {
      startScanner();
    }
  };

  // useEffect(() => {
  const filteredProducts = products?.filter(
    (product) =>
      product.productName.toLowerCase().includes(search.toLowerCase()) ||
      product.productDescription.toLowerCase().includes(search.toLowerCase()) ||
      `${product.productIdScan}`.includes(search)
  );
  console.log(products);
  // }, []);

  async function saleProduct(
    productSale: MessageProduct | null | undefined,
    ammountSale: number
  ) {
    if (!productSale) {
      Swal.fire({
        icon: "error",
        title: "Error al intentar hacer la compra",
        text: "Por favor seleccione un producto",
        toast: true,
        timer: 2500,
        position: "bottom-right",
        background: "#a00",
        color: "#fff",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } else {
      await patchEditVal(
        `${processEnv.back}request-products/edit/${requestCurrentIfExist?._id}/${productSale._idInRequest}`,
        {
          amount: productSale.amount,
          amountCurrent: productSale.amountCurrent - ammountSale,
        },
        async () => {
          const dateCurrent = new Date().toISOString();
          const amountNew =
            (routeCurrent?.amountOfMerchandise || 0) +
            productSale.productPrice * ammountSale;

          await patchEditVal(
            `${processEnv.back}rutas/edit/${routeCurrent?._id}`,
            {
              amountOfMerchandise: amountNew,
              LastMinuteSale: dateCurrent,
            },
            () => {
              // event.currentTarget.reset();
              //@ts-ignore
              setRouteCurrent((prev) => ({
                ...prev,
                LastMinuteSale: dateCurrent,
                amountOfMerchandise: amountNew,
              }));
            },
            "Ruta"
          );
        },
        "requisito"
      );

      // patchSaleProduct(
      //   `${processEnv.back}api/v1/products/edit/${productSale._id}`,
      //   {
      //     ...productSale,
      //     productIsSold: true,
      //   },
      //   async () => {
      //     const dateCurrent = new Date().toISOString();
      //     const amountNew =
      //       (routeCurrent?.amountOfMerchandise || 0) + productSale.productPrice;
      //     await patchEditVal(
      //       `${processEnv.back}api/v1/rutas/edit/${routeCurrent?._id}`,
      //       {
      //         amountOfMerchandise: amountNew,
      //         LastMinuteSale: dateCurrent,
      //       },
      //       () => {
      //         // event.currentTarget.reset();
      //         //@ts-ignore
      //         setRouteCurrent((prev) => ({
      //           ...prev,
      //           LastMinuteSale: dateCurrent,
      //           amountOfMerchandise: amountNew,
      //         }));
      //       },
      //       "Ruta"
      //     );

      //     setClickInProduct(null);
      //     set_actualProductSearchScanner(null);
      //     getProducts();
      //   }
      // );
    }
  }

  console.log(routeCurrent);
  const clockLastMinuteSale = () => {
    const date = new Date(routeCurrent?.LastMinuteSale || "");

    return (
      <div className="mt-5">
        <p className="font-semibold">- Última hora de venta:</p>
        <p className="relative ps-8 ">
          {date.getHours() % 12 || 12} : {date.getMinutes()}
          <span className="text-base font-bold absolute top-0 ms-2 text-[.6rem]">
            {date.getHours() >= 12 ? "PM" : "AM"}
          </span>
        </p>
      </div>
    );
  };

  const getIfProductSelect = async () => {
    try {
      await getAllFetchDataValues(
        `${processEnv.back}request-product/route/${rutaId}`
      ).then((rec) => {
        console.log(rec);
        // @ts-ignore
        setRequestProductsAll(rec.details);
        if (rec.details.length > 0) {
          setRequestCurrentIfExist(rec.details[0]);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  console.log(requestCurrentIfExist);

  const handleFormSale = (e: FormEvent) => {
    e.preventDefault();
    var form = e.target;
    // @ts-ignore
    saleProduct(clickInProduct, form.elements("inpAmmount").value || 1);
  };

  return (
    <>
      <div className=" h-[100vh] ">
        <div className="z-10 rigth-0 bottom-0 h-fit absolute xl:static xl:flex flex-col items-start xl:border-r-2 xl:border-[#bbbcbc] md:pt-14 px-4 xl:h-[100%] justify-between">
          <div className="hidden  xl:flex flex-col items-start justify-center ">
            <h1 className="text-[#000] text-2xl font-bold mb-1">Ventas</h1>
            <span>Selecione los productos</span>
            <div>
              <p className="font-semibold ">- Carga en Mercancía:</p>
              <p className="ps-8 relative">
                {routeCurrent?.amountOfMerchandise}{" "}
                <span className="absolute text-sm font-bold ms-2 text-[.6rem] top-0">
                  MXN
                </span>
              </p>
            </div>
            {clockLastMinuteSale()}
          </div>
          <form
            onSubmit={handleFormSale}
            className="md:static flex flex-col items-start justify-center pb-10 md:min-w-60"
          >
            <input
              type="number"
              name="inpAmmount"
              value={ammountSaleInp}
              onChange={(e) => setAmmountSaleInp(parseInt(e.target.value))}
              id=""
              max={clickInProduct?.amountCurrent}
              min={1}
            />
            <ButtonCrud
              isHidden={clickInProduct === null}
              text="Vender Producto"
              color="bg-blue-500"
              // onclickHandle={() => saleProduct(clickInProduct, 1)}
              onclickHandle={() => {}}
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path
                  fill="black"
                  d="M504.717 320H211.572l6.545 32h268.418c15.401 0 26.816 14.301 23.403 29.319l-5.517 24.276C523.112 414.668 536 433.828 536 456c0 31.202-25.519 56.444-56.824 55.994c-29.823-.429-54.35-24.631-55.155-54.447c-.44-16.287 6.085-31.049 16.803-41.548H231.176C241.553 426.165 248 440.326 248 456c0 31.813-26.528 57.431-58.67 55.938c-28.54-1.325-51.751-24.385-53.251-52.917c-1.158-22.034 10.436-41.455 28.051-51.586L93.883 64H24C10.745 64 0 53.255 0 40V24C0 10.745 10.745 0 24 0h102.529c11.401 0 21.228 8.021 23.513 19.19L159.208 64H551.99c15.401 0 26.816 14.301 23.403 29.319l-47.273 208C525.637 312.246 515.923 320 504.717 320M408 168h-48v-40c0-8.837-7.163-16-16-16h-16c-8.837 0-16 7.163-16 16v40h-48c-8.837 0-16 7.163-16 16v16c0 8.837 7.163 16 16 16h48v40c0 8.837 7.163 16 16 16h16c8.837 0 16-7.163 16-16v-40h48c8.837 0 16-7.163 16-16v-16c0-8.837-7.163-16-16-16"
                />
              </svg>
            </ButtonCrud>
          </form>
        </div>
      </div>

      {requestCurrentIfExist && requestCurrentIfExist.state === "aprobado" && (
        <div
          className="flex flex-col pl-3  max-h-[100vh] h-full "
          style={{ alignSelf: "flex-start" }}
        >
          <div className="pt-4 flex items-center gap-2">
            <label>Petición: </label>
            <button
              onClick={() =>
                setRequestCurrentIfExist(
                  // @ts-ignore
                  requestProductsAll[indexCurrentRequest]
                )
              }
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
              className={`${
                indexCurrentRequest + 1 == requestProductsAll?.length &&
                "text-slate-400"
              }`}
              disabled={indexCurrentRequest + 1 == requestProductsAll?.length}
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

          <SearchInput
            label="Buscar Producto"
            value={search}
            setValue={setSearch}
            handleClickOnOffScanner={handleClickOnOffScanner}
          />

          {filteredProducts && (
            <Table
              products={filteredProducts.sort(
                (a, b) =>
                  (a.productIsSold ? 1 : -1) - (b.productIsSold ? 1 : -1)
              )}
              clickInProduct={clickInProduct}
              setClickInProduct={setClickInProduct}
            />
          )}
        </div>
      )}
      {requestCurrentIfExist && requestCurrentIfExist.state !== "aprobado" && (
        <div
          className="flex flex-col pl-3  max-h-[100vh] h-full items-center justify-center"
          style={{ alignSelf: "flex-start" }}
        >
          <p className="text-xl font-bold mb-1">
            Revisa la sección de requisitos, el estado de tu requisito es:
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
            } text-center text-xl font-bold mb-10`}
          >
            {requestCurrentIfExist.state}
          </p>

          <Link href="/Inicio/request">
            <button
              type="button"
              className="inline-block rounded border-2 hover:scale-105
                border-info px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-info transition duration-150 ease-in-out hover:border-info-600 hover:bg-info-50/50 hover:text-info-600 focus:border-info-600 focus:bg-info-50/50 focus:text-info-600 focus:outline-none focus:ring-0 active:border-info-700 active:text-info-700 motion-reduce:transition-none "
              data-twe-ripple-init
            >
              Ir a sección
            </button>
          </Link>
        </div>
      )}
      {!requestCurrentIfExist && (
        <div
          className="flex flex-col pl-3  max-h-[100vh] h-full items-center justify-center"
          style={{ alignSelf: "flex-start" }}
        >
          <p className="text-xl font-bold mb-10">
            No tienes productos asignados
          </p>

          <Link href="/Inicio/request">
            <button
              type="button"
              className="inline-block rounded border-2 hover:scale-105
                border-info px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-info transition duration-150 ease-in-out hover:border-info-600 hover:bg-info-50/50 hover:text-info-600 focus:border-info-600 focus:bg-info-50/50 focus:text-info-600 focus:outline-none focus:ring-0 active:border-info-700 active:text-info-700 motion-reduce:transition-none "
              data-twe-ripple-init
            >
              Realizar un requisito de productos
            </button>
          </Link>
        </div>
      )}

      <div
        className={`${
          !_scannerIsRunning ? "hidden" : "flex"
        } absolute bg-[#151516cc] top-0 w-full h-full z-10 `}
      >
        <div className="relative w-full h-full grid place-content-center ">
          <div className="relative flex h-fit w-fit">
            <div id="viewcamera"></div>
          </div>
          <div className="absolute bottom-5 w-full flex flex-col items-center">
            {actualProductSearchScanner && (
              <div>
                <div
                  // bg-[linear-gradient(225deg,_#a1c4fd_10%,_#c2e9fb_90%)]
                  className={` 
            relative my-2 justify-center  py-6  justify-content rounded-xl flex flex-col px-5 gap-1 font-semibold hover:bg-slate-200  bg-[linear-gradient(225deg,_#acfca2_10%,_#c0faea_90%)]
            `}
                  style={{ gridTemplateColumns: "50px 1fr 1fr 1fr" }}
                >
                  <td className=" mt-5  flex gap-1 ">
                    <span className="font-black">ID:</span>
                    {actualProductSearchScanner._id}
                  </td>
                  <td className="flex gap-1 ">
                    <span className=" font-black">Nombre:</span>
                    {actualProductSearchScanner.productName}
                  </td>
                  <td className="flex gap-1 ">
                    <span className=" font-black">Descripción:</span>
                    {actualProductSearchScanner.productDescription}
                  </td>
                  <td className="flex gap-1 ">
                    <span className=" font-black">Precio: $</span>
                    {actualProductSearchScanner.productPrice}
                  </td>
                  <td className="text-center flex absolute left-0 top-0 w-full">
                    <p className="w-full uppercase text-xl mt-2 font-bold ">
                      {actualProductSearchScanner.productIsSold
                        ? "X Producto vendido X"
                        : "Producto"}
                    </p>
                  </td>
                </div>
              </div>
            )}
            <div className="flex gap-10 ">
              <button
                onClick={() => handleClickOnOffScanner(false)}
                className="bg-red-400 min-w-40 rounded-full py-2 hover:scale-[1.1]"
              >
                Cancelar
              </button>
              {actualProductSearchScanner && (
                <ButtonCrud
                  isHidden={actualProductSearchScanner.productIsSold}
                  text="Vender Producto"
                  color="bg-blue-500"
                  onclickHandle={() =>
                    saleProduct(actualProductSearchScanner, 1)
                  }
                >
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path
                      fill="black"
                      d="M504.717 320H211.572l6.545 32h268.418c15.401 0 26.816 14.301 23.403 29.319l-5.517 24.276C523.112 414.668 536 433.828 536 456c0 31.202-25.519 56.444-56.824 55.994c-29.823-.429-54.35-24.631-55.155-54.447c-.44-16.287 6.085-31.049 16.803-41.548H231.176C241.553 426.165 248 440.326 248 456c0 31.813-26.528 57.431-58.67 55.938c-28.54-1.325-51.751-24.385-53.251-52.917c-1.158-22.034 10.436-41.455 28.051-51.586L93.883 64H24C10.745 64 0 53.255 0 40V24C0 10.745 10.745 0 24 0h102.529c11.401 0 21.228 8.021 23.513 19.19L159.208 64H551.99c15.401 0 26.816 14.301 23.403 29.319l-47.273 208C525.637 312.246 515.923 320 504.717 320M408 168h-48v-40c0-8.837-7.163-16-16-16h-16c-8.837 0-16 7.163-16 16v40h-48c-8.837 0-16 7.163-16 16v16c0 8.837 7.163 16 16 16h48v40c0 8.837 7.163 16 16 16h16c8.837 0 16-7.163 16-16v-40h48c8.837 0 16-7.163 16-16v-16c0-8.837-7.163-16-16-16"
                    />
                  </svg>
                </ButtonCrud>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
