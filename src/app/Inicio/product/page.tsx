"use client"
import { MessageProduct, RootProduct } from "@/types/product"
import { getAllFetchDataValues } from "@/utils/api"
import React, { useEffect, useState } from "react"

export default function Product() {
    const [dataProductList, setDataProductList] = useState<null | RootProduct>(null)
    const [clickInProduct, setClickInProduct] = useState<null | MessageProduct>(null)
    const [viewAddProduct, setviewAddProduct] = useState<[boolean, string]>([false, 'insert']);


    const updateTable = async () => {
        await getAllFetchDataValues(`${process.env.NEXT_PUBLIC_BACK_URL}products`)
            .then((rec) => {
                // @ts-ignore
                setDataVehicle(rec)
            })
    }

    useEffect(()=>{updateTable}, [])


    return (
        <>
            <div className="flex flex-col items-start border-r-2 border-[#bbbcbc] pt-14 px-4 h-[100%] justify-between">
                <div className="flex flex-col items-start justify-center">
                    <h1 className="text-[#000] text-2xl font-bold mb-1">Productos</h1>
                    <span className="">Listado de productos <br />registrados.</span>
                </div>

                {/* Botones */}
                <div className="pb-10 flex flex-col space-y-10 items-center">

                    <button onClick={() => setviewAddProduct([true, 'edit'])} className={`${clickInProduct === null ? "hidden" : "visible"} bg-[#ececec] text-black px-2 py-2 mb-2 rounded-[50px] h-14 w-52 flex items-center justify-between font-bold`}>
                        <svg className="h-[50px] w-[50px] text-blue-500 pr-2" fill="currentColor" viewBox="0 0 20 20">
                            <circle cx="10" cy="10" r="8" />
                        </svg>
                        <span className="mr-10">Editar</span>
                    </button>
                    {/* <button onClick={removeVechicleHandle} className={`${clickInProduct === null ? "hidden" : "visible"} bg-[#ececec] text-black px-2 py-2 mb-2 rounded-[50px] h-14 w-52 flex items-center justify-between font-bold`}> */}
                    <button>
                        <svg className="h-[50px] w-[50px] text-red-500 pr-2" fill="currentColor" viewBox="0 0 20 20">
                            <circle cx="10" cy="10" r="8" />
                        </svg>
                        <span className="mr-10" >Eliminar</span>
                    </button>
                    <button onClick={() => setviewAddProduct([true, 'insert'])} className="bg-[#ececec] text-black px-2 py-2 mb-2 rounded-[50px] h-14 w-52 flex items-center justify-between font-bold">
                        <svg className="h-[50px] w-[50px] text-green-500 pr-2" fill="currentColor" viewBox="0 0 20 20">
                            <circle cx="10" cy="10" r="8" />
                        </svg>
                        <span className="mr-10" >Agregar</span>
                    </button>

                </div>
            </div>

            <div className="max-h-[100vh] h-full pt-14 flex flex-col overflow-y-auto p-5">
                {/* Informacion */}
                <hr className="mb-10 border-[1px]" />

                <div className="" >
                    <div className="grid bg-neutral-300 py-3 font-bold px-3 mb-2 rounded-full" style={{ gridTemplateColumns: "50px 1fr 1fr 1fr" }}>
                        <p>ID</p>
                        <p>Nombre</p>
                        <p>Descripcion</p>
                        <p>Precio</p>
                    </div>
                    {
                        // @ts-ignore
                        dataProductList && dataProductList?.message.map((data: MessageProduct, index: number) => (
                            <div onClick={() => setClickInProduct(clickInProduct != null ? null : data)} className={`grid items-center py-2 px-3 gap-2 font-semibold hover:bg-slate-200 rounded-full cursor-pointer ${clickInProduct?._id == data._id ? "bg-sky-200" : ""}`} style={{ gridTemplateColumns: "50px 1fr 1fr 1fr 1fr" }}>
                                <td className="">{index}</td>
                                <td className="">{data.productName}</td>
                                <td className="">{data.productDescription}</td>
                                <td className="text-center">{data.productPrice}</td>
                                <td className="text-center">{data.productIsSold}</td>
                            </div>
                        ))
                    }
                </div>
            </div>

        </>

    )
}