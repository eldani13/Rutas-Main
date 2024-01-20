"use client"

import { RootEmployees } from "@/types/employees"
import { MessageProduct, RootProduct } from "@/types/product"
import { RootRoute } from "@/types/routes"
import { getAllFetchDataValues } from "@/utils/api"
import Link from "next/link"
import React, { useEffect, useState } from "react"


export default function Home() {
    const [countEmployees, setCountEmployees] = useState(0)
    const [countProducts, setCountProducts] = useState(0)
    const [countRoute, setCountRoute] = useState(0)

    const countEmployeesHandle = async () => {
        await getAllFetchDataValues(`${process.env.NEXT_PUBLIC_BACK_URL}employees`)
            .then((rec: RootEmployees) => {
                setCountEmployees(rec.message.length)
            })
    }
    const countProductsHandle = async () => {
        await getAllFetchDataValues(`${process.env.NEXT_PUBLIC_BACK_URL}products`)
            .then((rec: RootProduct) => {
                setCountProducts(rec.message.length)
            })
    }
    const countRoutesHandle = async () => {
        await getAllFetchDataValues(`${process.env.NEXT_PUBLIC_BACK_URL}rutas`)
            .then((rec: RootRoute) => {
                setCountRoute(rec.message.length)
            })
    }
    useEffect(() => {
        countEmployeesHandle()
        countProductsHandle()
        countRoutesHandle()
    }, [])

    return (

        <>
            <div className="flex flex-col items-start border-r-2 border-[#bbbcbc] pt-14 px-4 h-[100%]">
                <div className="flex flex-col items-start justify-center">
                    <h1 className="text-[#000] text-2xl font-bold mb-1">Pagina Principal</h1>
                </div>
                <div className="flex flex-col text-[#000] items-start">
                    <span className="">Pagina principal</span>
                </div>
            </div>
            <div className="text-[#000] flex flex-col items-center gap-20">
                <h1 className="text-7xl font-semibold">¡Bienvenido!</h1>
                <span className="text-xl">¿Qué deseas revisar el día de hoy?</span>



                <div className="flex flex-col ">
                    <div className="grid px-4 gap-x-20" style={{ gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr" }}>

                        {/* Administrador */}
                        <div className="group cursor-pointer h-36 w-100 flex justify-between items-center  gap-5">
                            <div className="flex justify-start gap-5">
                                <div className="flex bg-[#ccc] h-20 w-20 rounded-full items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="45" width="45" viewBox="0 0 448 512">
                                        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                                    </svg>
                                </div>
                                <div className="text-[#000] flex flex-col gap-3">
                                    <span className="font-bold text-[25px]">Administrador</span>
                                    <p className="text-[#bbbcbc] text-[15px]">Sesión iniciada como Victor</p>
                                </div>
                            </div>

                            <span style={{ width: "35px", height: "35px" }}></span>
                        </div>

                        {/* Empleados */}
                        <Link href="/Inicio/employees">
                            <div className="group cursor-pointer h-36 w-100 flex justify-between items-center  gap-5">
                                <div className="flex justify-start gap-5">
                                    <div className="flex bg-[#ccc] h-20 w-20 overflow-hidden rounded-full items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="45" width="45" viewBox="0 0 640 512">
                                            <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z" />
                                        </svg>
                                    </div>
                                    <div className="text-[#000] flex flex-col gap-3">
                                        <span className="font-bold text-[25px]">Empleados</span>
                                        <p className="text-[#bbbcbc] text-[15px]">Cuenta actualmente con {countEmployees} Empleados</p>
                                    </div>
                                </div>
                                <svg className="group-hover:animate-bounce" xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                                </svg>
                            </div>
                        </Link>

                        {/* Rutas */}
                        <Link href="/Inicio/routes">
                            <div className="group cursor-pointer h-36 w-100 flex justify-between items-center gap-5">
                                <div className="flex justify-start gap-5">
                                    <div className="flex bg-[#ccc] h-20 w-20 rounded-full items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="45" width="45" viewBox="0 0 576 512">
                                            <path d="M408 120c0 54.6-73.1 151.9-105.2 192c-7.7 9.6-22 9.6-29.6 0C241.1 271.9 168 174.6 168 120C168 53.7 221.7 0 288 0s120 53.7 120 120zm8 80.4c3.5-6.9 6.7-13.8 9.6-20.6c.5-1.2 1-2.5 1.5-3.7l116-46.4C558.9 123.4 576 135 576 152V422.8c0 9.8-6 18.6-15.1 22.3L416 503V200.4zM137.6 138.3c2.4 14.1 7.2 28.3 12.8 41.5c2.9 6.8 6.1 13.7 9.6 20.6V451.8L32.9 502.7C17.1 509 0 497.4 0 480.4V209.6c0-9.8 6-18.6 15.1-22.3l122.6-49zM327.8 332c13.9-17.4 35.7-45.7 56.2-77V504.3L192 449.4V255c20.5 31.3 42.3 59.6 56.2 77c20.5 25.6 59.1 25.6 79.6 0zM288 152a40 40 0 1 0 0-80 40 40 0 1 0 0 80z" />
                                        </svg>
                                    </div>
                                    <div className="text-[#000] flex flex-col gap-3">
                                        <span className="font-bold text-[25px]">Rutas</span>
                                        <p className="text-[#bbbcbc] text-[15px]">Cuentas con {countRoute} Rutas</p>
                                    </div>
                                </div>
                                <svg className="group-hover:animate-bounce" xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                                </svg>
                            </div>
                        </Link>

                        {/* Productos */}
                        <Link href="/Inicio/product">

                            <div className="group cursor-pointer h-36 w-100 flex justify-between items-center gap-5">
                                <div className="flex justify-start gap-5">
                                    <div className="flex bg-[#ccc] h-20 w-20 rounded-full items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 16 16" fill="none">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M15.5285 2.97293C15.8133 3.08683 16 3.36261 16 3.66929V12.3308C16 12.6374 15.8133 12.9132 15.5285 13.0271L8.27854 15.9271C8.09974 15.9987 7.90026 15.9987 7.72146 15.9271L0.471457 13.0271C0.186713 12.9132 0 12.6374 0 12.3308V3.66929C0 3.36261 0.186713 3.08683 0.471457 2.97293L7.44291 0.18434L7.44691 0.18275L7.72146 0.0729296C7.90026 0.00140642 8.09974 0.00140615 8.27854 0.0729295L8.55315 0.182774L8.55709 0.18434L15.5285 2.97293ZM14.1537 3.50003L8 5.96151L1.84629 3.50003L1 3.83855V4.23855L7.5 6.83854V14.7615L8 14.9615L8.5 14.7615V6.83854L15 4.23854V3.83855L14.1537 3.50003Z" fill="#000" />
                                        </svg>
                                    </div>
                                    <div className="text-[#000] flex flex-col gap-3 w-9/12">
                                        <span className="font-bold text-[25px]">Productos</span>
                                        <p className="text-[#bbbcbc] text-[13px]">Actualmente tienes {countProducts} productos registrados</p>
                                    </div>
                                </div>
                                <svg className="group-hover:animate-bounce" xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                                </svg>
                            </div>
                        </Link>
                    </div>

                </div>
            </div>
        </>
    )
}