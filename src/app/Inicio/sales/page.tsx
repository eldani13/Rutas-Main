"use client";

import React, { useState, useEffect } from "react";
import { getAllFetchDataValues } from "@/utils/api";
import { MessageProduct, RootProduct } from "@/types/product";
import { Table, SearchInput } from "@/components";
import Swal from "sweetalert2";
import { ButtonCrud } from "@/components/buttons/ButtonCrud";
// import startCamera from '@/components/Scanner/BarcodeScanner'
// import { BarcodeScanner } from 'dynamsoft-javascript-barcode'

import Image from "next/image";

import Quagga from "@ericblade/quagga2";

export default function Sales() {
  const [products, setProducts] = useState<MessageProduct[]>();
  const [clickInProduct, setClickInProduct] = useState<null | MessageProduct>();
  const [search, setSearch] = useState("");

  // Quagga
  // const Quagga = require("@ericblade/quagga2").default;
  //@ts-ignore
  // Quagga.init({ inputStream: {name: "Live", type :"LiveStream", target: document.querySelector("#viewcamera")}, decoder:{type:"code_128_reader"} }, (err) =>{
  //   if(err){
  //     console.log("ocurrio un error")
  //     return
  //   }
  //   Quagga.start();
  // });

  // Quagga.init({

  //   inputStream : {
  //     name : "Live",
  //     type : "LiveStream",
  //     //@ts-ignore
  //     target: document.querySelector('#viewcamera')
  //        // Or '#yourElement' (optional)
  //   },
  //   decoder : {
  //     readers : ["code_128_reader"]
  //   }
  // }, function(err) {
  //     if (err) {
  //         console.log(err);
  //         return
  //     }
  //     console.log("Initialization finished. Ready to start");
  //     Quagga.start();
  // });

  


  // Quagga.onDetected(function (data) {
  //   console.log(data);
  // });

  const getProducts = async () => {
    const productsget = await getAllFetchDataValues(
      `${process.env.NEXT_PUBLIC_BACK_URL}view-products`
    );
    console.log(productsget);
    setProducts(productsget.details);
  };

  useEffect(() => {
    var _scannerIsRunning = false;

  function startScanner() {
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          //@ts-ignore
          target: document.querySelector("#viewcamera"),
          constraints: {
            width: 480,
            height: 320,
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
        _scannerIsRunning = true;
      }
    );

    Quagga.onProcessed(function (result) {
      var drawingCtx = Quagga.canvas.ctx.overlay,
        drawingCanvas = Quagga.canvas.dom.overlay;

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
    });
  }

  // Start/stop scanner
  document.getElementById("btn")?.addEventListener(
    "click",
    function () {
      if (_scannerIsRunning) {
        Quagga.stop();
      } else {
        startScanner();
      }
    },
    false
  );
    getProducts();
  }, []);

  const filteredProducts = products?.filter((product) =>
    product.productName.toLowerCase().includes(search.toLowerCase())
  );

  function saleProduct() {
    if (!clickInProduct) {
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
    }

    console.log(clickInProduct);
  }

  return (
    <>
      <div className=" h-[100vh] ">
        <div className="z-10 rigth-0 bottom-0 h-fit absolute xl:static xl:flex flex-col items-start xl:border-r-2 xl:border-[#bbbcbc] md:pt-14 px-4 xl:h-[100%] justify-between">
          <div className="hidden md:visible md:flex flex-col items-start justify-center ">
            <h1 className="text-[#000] text-2xl font-bold mb-1">Ventas</h1>
            <span>Selecione los productos</span>
            <button id="btn">hola</button>
          </div>
          

          <div id="viewcamera">

          </div>
          

          <div className="md:static flex flex-col items-start justify-center pb-10 md:min-w-60">
            <ButtonCrud
              isHidden={clickInProduct === null}
              text="Vender Producto"
              color="bg-blue-500"
              onclickHandle={saleProduct}
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
          </div>
        </div>
      </div>

      

      <div
        className="flex flex-col pl-3  max-h-[100vh] h-full "
        style={{ alignSelf: "flex-start" }}
      >
        <SearchInput
          label="Buscar Producto"
          value={search}
          // startCamera={startCamera}
          setValue={setSearch}
        />
        

        {filteredProducts && (
          <Table
            products={filteredProducts}
            clickInProduct={clickInProduct}
            setClickInProduct={setClickInProduct}
          />
        )}
      </div>
    </>
  );
}
