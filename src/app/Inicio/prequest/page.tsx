"use client";

import { MessageEmployees, RootEmployees } from "@/types/employees";
import { MessageProduct, RootProduct } from "@/types/product";
import { MessageRequestProducts } from "@/types/requestProducts";
import { MessageRoute } from "@/types/routes";
import { Product } from "@/types/requestProducts";
import { getAllFetchDataValues, patchEditVal } from "@/utils/api";
import { getCookie, processEnv } from "@/utils/cookies";
import { useEffect, useState } from "react";
import { useViewProducts } from "@/hooks/useViewProducts";
import { useRequestProducts } from "@/hooks/useRequestProducts";

import "./style.css";

export default function PrequestProd() {
  const [selectDataRequest, setSelectDataRequest] =
    useState<null | MessageRequestProducts>(null);

  const [selectedProduct, setSelectedProduct] = useState<MessageProduct | null>(
    null
  );

  const [showAssignQuantityMessage, setShowAssignQuantityMessage] =
    useState(false);

  const [showModal, setShowModal] = useState<boolean>(false);

  const [assignedQuantity, setAssignedQuantity] = useState<number | undefined>(
    undefined
  );
  const asignarCantidad = (product: Product) => {
    if (product && assignedQuantity !== undefined) {
      const updatedProduct = { ...product, cantidadAsignada: assignedQuantity };

      console.log("Producto actualizado:", updatedProduct);
      closeModal();
      setAssignedQuantity(undefined);
    }
  };

  const openModalForApprove = () => {
    setShowModal(true);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const convertToProduct = (messageProduct: MessageProduct): Product => {
    return {
      assignedQuantity: 0,
      product: messageProduct.productName,
      amount: messageProduct.amount,
      amountCurrent: messageProduct.amountCurrent,
      _id: messageProduct._id,
    };
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleConfirmAssignQuantity = () => {
    console.log("Cantidad asignada:", assignQuantity);
    setShowAssignQuantityMessage(false);
    setAssignQuantity(0);
  };

  const [assignQuantity, setAssignQuantity] = useState(0);

  const [allDataEmployees, setAllDataEmployees] = useState<
    null | MessageEmployees[]
  >(null);

  const [allDataRoutes, setAllDataRoutes] = useState<null | MessageRoute[]>(
    null
  );
  const { products: allDataProducts, isLoading, isError } = useViewProducts();
  const {
    requests: allDataRequest,
    isLoading: isLoadingRequestProducts,
    isError: isErrorRequestProducts,
  } = useRequestProducts();

  const getAllDataEmployees = async () => {
    await getAllFetchDataValues(`${processEnv.back}employees`).then(
      (rec: RootEmployees) => {
        // @ts-ignore
        setAllDataEmployees(rec.message);
      }
    );
  };


  //const updateTable = async (state: string) => {
   // if (state === selectDataRequest?.state) {
      // setShowAssignQuantityMessage(true);
      
     // return;
    //}

    //await patchEditVal(
     // `${processEnv.back}request-products/edit/${selectDataRequest?._id}`,
     // { state: state },

  const updateTable = async (state: "aprobado" | "rechazado") => {
    if (state === "aprobado") {
      await updateAceptRequest();
    } else {
      await patchEditVal(
        `${processEnv.back}request-products/edit/${selectDataRequest?._id}`,
        {
          state: state,
        },
        () => {},
        "requisito"
      );
    }
  };

  const updateAceptRequest = async () => {
    await patchEditVal(
      `${processEnv.back}request-products/update-acepted/${selectDataRequest?._id}`,
      {
        ...selectDataRequest,
      },

      () => {},
      "requisito"
    );
  };

  const fnGetAllDataRoutes = async () => {
    await getAllFetchDataValues(`${processEnv.back}rutas/`).then((rec) => {
      setAllDataRoutes(rec.message);
    });
  };

  const dateFormater = (fecha: Date) => {
    const year = fecha.getFullYear();
    const mes = ("0" + (fecha.getMonth() + 1)).slice(-2); // Sumar 1 ya que los meses van de 0 a 11
    const dia = ("0" + fecha.getDate()).slice(-2);
    const horas = ("0" + fecha.getHours()).slice(-2);
    const minutos = ("0" + fecha.getMinutes()).slice(-2);
    const segundos = ("0" + fecha.getSeconds()).slice(-2);
    return (
      <>
        {year}/{mes}/{dia}
        <span className="ms-3 font-normal">
          {horas}:{minutos}
        </span>
      </>
    );
  };

  useEffect(() => {
    fnGetAllDataRoutes();
    getAllDataEmployees();
  }, []);

  // console.log(allDataEmployees?.filter(pr=>pr._id==allDataRequest[0].employee)[0].username)
  console.log(allDataRequest);
  console.log(allDataEmployees);
  console.log(allDataProducts);

  // const handleUpdateProductSelect = (index: number, newNumber: number) => {
  //   if(newNumber < 0 ||  isNaN(newNumber)){
  //     return null;
  //   }
    
  //   //@ts-ignore
  //   setSelectDataRequest((prev) => {
  //     const newArray = prev && [...prev.products];
  //     if (newArray) newArray[index].amount = newNumber;
  //     if (!prev) return null;
  //     return { ...prev, products: newArray };
  //   });
  //   if (selectDataRequest && selectDataRequest.products) {
  //     // Crear una copia del objeto selectDataRequest
  //     const updatedDataRequest = { ...selectDataRequest };
  
  //     // Verificar si el índice proporcionado es válido
  //     if (index >= 0 && index < updatedDataRequest.products.length) {
  //       // Actualizar la cantidad del producto en la copia del objeto
  //       updatedDataRequest.products[index].amount = newNumber;
  
  //       // Actualizar el estado selectDataRequest con la copia actualizada
  //       setSelectDataRequest(updatedDataRequest);
  //     }
  //   }
  // };

  const handleUpdateProductSelect = (index: number, newNumber: number) => {
    if (newNumber < 0 || isNaN(newNumber)) {
      return null;
    }
  
    const updatedDataRequest = { ...selectDataRequest };
  
    if (
      updatedDataRequest &&
      updatedDataRequest.products &&
      index >= 0 &&
      index < updatedDataRequest.products.length
    ) {
      updatedDataRequest.products[index].amount = newNumber;
  
      //@ts-ignore
      setSelectDataRequest(updatedDataRequest);
    }
  };
  
  // Función para enviar los datos actualizados al backend
  const sendUpdatedDataToBackend = () => {
    // Verificar si selectDataRequest está definido y tiene productos
    if (selectDataRequest && selectDataRequest.products) {
      // Aquí debes enviar selectDataRequest al backend, por ejemplo, usando una solicitud HTTP
      // Ejemplo con fetch:
      fetch(`http://localhost:3000/api/v1/request-products/update-to-acepted/${selectDataRequest?._id}`, {
        method: 'PATCH', // Usar PATCH o PUT para actualizar los datos en el backend
        headers: {
          'Content-Type': 'application/json',
          // Agregar encabezados necesarios, como token de autenticación si es necesario
        },
        body: JSON.stringify(selectDataRequest), // Convertir el objeto a JSON antes de enviarlo al backend
      })
        .then((response) => {
          if (response.ok) {
            // Manejar la respuesta del backend si es necesario
            console.log('Datos actualizados enviados exitosamente al backend');
          } else {
            // Manejar errores de respuesta del backend si es necesario
            console.error('Error al enviar los datos actualizados al backend');
          }
        })
        .catch((error) => {
          // Manejar errores de red u otros errores relacionados con la solicitud HTTP
          console.error('Error al enviar los datos actualizados al backend:', error);
        });
    }
  };
  
  
  return (
    <>
      <div className="h-[100%]">
        <div className="hidden md:flex flex-col items-start border-r-2 border-[#bbbcbc] pt-14 h-[100%]">
          <div className="flex flex-col items-start justify-center">
            <h1 className="text-[#000] text-2xl font-bold mb-1">Pendientes</h1>
          </div>
          <div className="flex flex-col">
            {allDataRequest &&
              allDataRoutes &&
              allDataRequest.map(
                (requestProd: MessageRequestProducts, index: number) => {
                  const routeD = allDataRoutes?.find(
                    (pr) => pr._id == requestProd.route
                  );
                  if (!routeD) return;
                  const employeeD = allDataEmployees?.find(
                    (pr) => pr._id == routeD?.empleado
                  );
                  if (!employeeD) return;

                  return (
                    <div
                      key={"dataReq-" + index}
                      onClick={() => setSelectDataRequest(requestProd)}
                      className={`${
                        requestProd == selectDataRequest ? "bg-slate-100" : ""
                      } flex flex-col text-[#000] items-start overflow-auto gap-2 hover:bg-slate-200 cursor-pointer`}
                    >
                      <div className=" px-2 min-w-60">
                        <p className="text-base font-semibold mb-2">
                          {employeeD?.username}
                        </p>
                        {/* <p className="text-sm">Carro: {allDataEmployees?.filter(pr=>pr._id==requestProd.employee)[0].username}</p> */}

                        <p className="text-xs font-semibold text-right">
                          {dateFormater(new Date(requestProd.dateTime))}
                        </p>
                        <p
                          className={`${
                            requestProd.state === "pendiente"
                              ? "text-yellow-500"
                              : requestProd.state === "rechazado"
                              ? "text-orange-500"
                              : requestProd.state === "aprobado"
                              ? "text-lime-500"
                              : ""
                          } 
                          text-sm font-semibold text-right`}
                        >
                          {requestProd.state}
                        </p>
                      </div>
                    </div>
                  );
                }
              )}
          </div>
        </div>
      </div>

      <div className="relative text-[#000] flex flex-col justify-center items-center gap-20 overflow-y-auto h-full max-h-[100vh]">
        {selectDataRequest && (
          <div className="flex flex-col w-full h-full pt-5">
            <h1 className="text-center font-bold text-xl mb-4">
              Requisito de productos
            </h1>
            <div className="flex justify-between px-4 pb-3">
              {selectDataRequest.state === "pendiente" && (
                <button
                  onClick={() => updateTable("rechazado")}
                  className="bg-red-300 w-fit px-3 py-1 rounded-full text-sm font-semibold hover:scale-105 duration-100 h-max"
                >
                  Rechazar pedido
                </button>
              )}
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setShowAssignQuantityMessage(true)}
                  disabled={selectDataRequest.state === "aprobado"}
                  className={`bg-lime-300  px-3 py-1 rounded-full text-sm font-semibold hover:scale-105 duration-100 ${
                    selectDataRequest.state === "aprobado"
                      ? "disabled:opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {selectDataRequest.state !== "aprobado"
                    ? "Aceptar pedido"
                    : "Pedido Aprobado"}
                </button>
                {/* <button
                  onClick={() => updateTable("aprobado")}
                  disabled={selectDataRequest.state === "aprobado"}
                  className={`bg-[#eab346] w-fit px-3 py-1 rounded-full text-sm font-semibold hover:scale-105 duration-100 ${
                    selectDataRequest.state === "aprobado"
                      ? "disabled:opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {selectDataRequest.state !== "aprobado"
                    ? "Asignar cantidad"
                    : "Pedido Aprobado"}
                </button> */}
              </div>
              {showAssignQuantityMessage && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                  <div className="absolute inset-0 bg-black opacity-75"></div>
                  <div className="bg-white rounded-lg p-8 z-50 flex flex-col gap-5 justify-center items-center">
                    <p>Debes asignar una cantidad primero.</p>
                    {/* <input
                      type="number"
                      value={assignQuantity}
                      onChange={(e) =>
                        setAssignQuantity(parseInt(e.target.value))
                      }
                      style={{
                        border: "1px solid black",
                        borderRadius: "10px",
                        padding: "5px",
                        width: "100%",
                      }}
                    /> */}
                    <div className="flex gap-10">
                      <button
                        className="bg-green-400 p-2 rounded-full font-bold hover:scale-105 duration-100"
                        onClick={() => {
                          sendUpdatedDataToBackend();
                          // updateTable("aprobado");
                          setShowAssignQuantityMessage(false);
                          setAssignQuantity(0);
                        }}
                      >
                        
                        Aceptar
                      </button>
                      <button
                        className="bg-red-400 p-2 rounded-full font-bold hover:scale-105 duration-100"
                        onClick={() => {
                          setShowAssignQuantityMessage(false);
                          setAssignQuantity(0);
                        }}
                      >
                        Cancelar
                      </button>
                      {/* <button
                      className="bg-green-400 p-2 rounded-full font-bold hover:scale-105 duration-100"
                        onClick={() => {
                          // Aquí puedes agregar la lógica para manejar la cantidad asignada
                          // Por ejemplo, puedes llamar a una función para enviar la cantidad asignada al backend
                          // Luego puedes cerrar el modal y restablecer la cantidad asignada
                          console.log("Cantidad asignada:", assignQuantity);
                          setShowAssignQuantityMessage(false);
                          setAssignQuantity(0);
                        }}
                      >
                        Asignar Cantidad
                      </button> */}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-5">
              {selectDataRequest.products.map((pr_product, index) => (
                <div
                  className="flex w-full justify-center items-center gap-3"
                  key={"dataselect-" + index}
                >
                  <button>
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
                  <div className=" w-2/3 bg-blue-100 p-3 rounded-xl">
                    <p className="text-center font-semibold">
                      {
                        allDataProducts?.find(
                          (u: MessageProduct) => u._id == pr_product.product
                        )?.productName
                      }
                    </p>
                    <p className="text-base mt-2 text-slate-700 flex justify-between">
                      {
                        allDataProducts?.find(
                          (u: MessageProduct) => u._id == pr_product.product
                        )?.productDescription
                      }
                      {/* <button
                        className="bg-[#eab346] rounded-full text-black p-2 text-sm"
                        onClick={openModal}
                      >
                        Asignar cantidad
                      </button> */}
                    </p>
                    <p className="text-sm font-semibold">
                      Cantidad solicitada: {pr_product.amount}
                    </p>

                    <p className="text-right text-sm font-bold mt-3">
                      {/* {product.productPrice}  */}
                      {
                        allDataProducts?.find(
                          (u: MessageProduct) => u._id == pr_product.product
                        )?.productPrice
                      }
                      <span className="text-xs ps-1">MXN</span>
                    </p>
                  </div>

                  {/* {selectedProduct && showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-transparent opacity-100">
                      <div className="bg-white p-4 rounded-lg">
                        <h2 className="text-lg font-semibold mb-2">
                          Ingresa la cantidad:
                        </h2>
                        <input
                          type="number"
                          className="border border-gray-300 rounded-md p-2"
                          onChange={(e) =>
                            setAssignedQuantity(parseInt(e.target.value))
                          }
                        />
                        <div className="mt-2 flex justify-end">
                          <button
                            className="bg-gray-200 hover:bg-gray-300 rounded px-4 py-2 mr-2"
                            onClick={closeModal}
                          >
                            Cancelar
                          </button>
                          <button
                            className="bg-[#eab346] hover:bg-[#d99e32] rounded px-4 py-2 text-white"
                            onClick={() =>
                              asignarCantidad(convertToProduct(selectedProduct))
                            }
                          >
                            Asignar
                          </button>
                        </div>
                      </div>
                    </div>
                  )} */}

                  <div className="flex items-center gap-1 font-bold text-xl">
                    <button
                      disabled={(pr_product.amount ?? 0) === 0}
                      className="w-8 h-8 bg-red-200 rounded-md"
                      onClick={() =>
                        handleUpdateProductSelect(
                          index,
                          (pr_product.amount ?? 0) - 1
                        )
                      }
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="flex w-14 text-center"
                      min={0}
                      value={pr_product.amount}
                      onChange={(e) =>
                        handleUpdateProductSelect(
                          index,
                          parseInt(e.target.value)
                        )
                      }
                    />

                    <button
                      className="w-8 h-8 bg-green-200 rounded-md"
                      onClick={() =>
                        handleUpdateProductSelect(
                          index,
                          (pr_product.amount ?? 0) + 1
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
