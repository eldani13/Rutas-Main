import Quagga, { QuaggaJSResultObject } from "@ericblade/quagga2";

export class ScannerCode {
  idTarget: string;
  isScannerRunning: boolean;
  functionForSearch: (result: QuaggaJSResultObject) => void;
  handleIsScannerRunning?: (state:boolean)=>void;

  constructor(
    targetId: string,
    functionForSearch: (result: QuaggaJSResultObject) => void,
    handleIsScannerRunning: (state:boolean)=>void
  ) {
    this.idTarget = targetId;
    this.isScannerRunning = false;
    this.functionForSearch = functionForSearch;
    this.handleIsScannerRunning = handleIsScannerRunning;
  }

  startScanner() {
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          //@ts-ignore
          target: document.querySelector(`#${this.idTarget}`),
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
      (err) => {
        if (err) {
          console.log(err);
          return;
        }

        console.log("Initialization finished. Ready to start");
        Quagga.start();

        this.isScannerRunning = true;
        if(this.handleIsScannerRunning){
            this.handleIsScannerRunning(true);
        }
        // set_scannerIsRunning(true);
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

    Quagga.onDetected((result) => {
      //   console.log(
      //     "Barcode detected and processed : [" + result.codeResult.code + "]",
      //     result
      //   );

      this.functionForSearch(result);
      //   const productFind = products?.find(
      //     (item) => item.productIdScan == parseInt(result.codeResult.code || "0")
      //   );
      //   if (
      //     productFind != undefined &&
      //     productFind != actualProductSearchScanner
      //   ) {
      //     //@ts-ignore
      //     set_actualProductSearchScanner(productFind);
      //     // @ts-ignore
      //     setSearch(result.codeResult.code);
      //   }
    });
  }

  stopScanner(){
    Quagga.stop();
    this.isScannerRunning = false;
    if(this.handleIsScannerRunning){
        this.handleIsScannerRunning(false);
    }
  }
}
