"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react"
// import Home from "./HomeSection";
import mapboxgl from "mapbox-gl"

interface RoutesName {
    name: String,
    description: String
}

export default function Route() {

    useEffect(() => {
        mapboxgl.accessToken = "pk.eyJ1IjoibGRhbmlpMTMiLCJhIjoiY2xxemE3OXBuMDMxaDJxb2ZwbWYyeXczNSJ9.Clw9VnVZszkfexTJ1tOMUw";
        const map = new mapboxgl.Map({
            container: "mapview",
            style: "mapbox://styles/mapbox/streets-v11",
            center: [-99.1332, 19.4326],
            zoom: 9
        })
        return () => map.remove()

    }, [])

    return (
        <>
            <div className="flex flex-col items-start border-r-2 border-[#bbbcbc] pt-14 px-4 h-[100%] justify-between  overflow-hidden max-h-[100vh]">
                <div className="flex flex-col items-start justify-center">
                    <h1 className="text-[#000] text-2xl font-bold mb-1">Sistema de Corte</h1>
                    <div className="grid grid-cols-2">
                        <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 384 512" transform="rotate(90)">
                            <path d="M32 448c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c53 0 96-43 96-96l0-306.7 73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 109.3 160 416c0 17.7-14.3 32-32 32l-96 0z" />
                        </svg><span className="mr-[-40px]">Ruta Jímenez</span>
                    </div>

                    <div className="flex items-center justify-center bg-[#ccc] h-40 w-40 rounded-full m-auto mt-6">
                        <svg xmlns="http://www.w3.org/2000/svg" height="75" width="75" viewBox="0 0 448 512">
                            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                        </svg>
                    </div>

                    <div className="grid grid-rows-3 gap-5 m-auto mt-6">
                        <div>
                            <span style={{ color: '#5e5e5e', fontWeight: '900' }}>Empleado:</span>
                            <p style={{ color: '#828282' }}>Juan Ricardo Jímenez</p>
                        </div>
                        <div>
                            <span style={{ color: '#5e5e5e', fontWeight: '900' }}>Vehículo asignado:</span>
                            <p style={{ color: '#828282' }}>Vehículo numero 3</p>
                        </div>
                        <div>
                            <span style={{ color: '#5e5e5e', fontWeight: '900' }}>Estado de ruta:</span>
                            <p style={{ color: '#00c040', fontWeight: '600' }}>En curso.</p>
                        </div>

                    </div>

                </div>

                {/* Botones */}
                <div className="pb-10 flex flex-col space-y-10 items-center">

                    <button className="bg-[#ececec] text-black px-2 py-2 mb-2 rounded-[50px] h-14 w-52 flex items-center justify-between font-bold">
                        <svg className="h-[50px] w-[50px] text-blue-500 pr-2" fill="currentColor" viewBox="0 0 20 20">
                            <circle cx="10" cy="10" r="8" />
                        </svg>
                        <span className="mr-10">Editar Ruta</span>
                    </button>


                    <button className="bg-[#ececec] text-black px-2 py-2 mb-2 rounded-[50px] h-14 w-52 flex items-center justify-between font-bold">
                        <svg className="h-[50px] w-[50px] text-red-500 pr-2" fill="currentColor" viewBox="0 0 20 20">
                            <circle cx="10" cy="10" r="8" />
                        </svg>
                        <span className="mr-10 text-[14px]">Eliminar</span>
                    </button>
                </div>
            </div>


            <div className="flex flex-col  justify-between px-3  max-h-[100vh] h-full overflow-y-auto" style={{ alignSelf: 'flex-start' }}>

                <div className="">
                    <svg xmlns="http://www.w3.org/2000/svg" className="my-3" fill="#ccc" height="20" width="18" viewBox="0 0 448 512">
                        <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                    </svg>

                    <hr className="mb-10 border-[1px]" />
                </div>

                <div className="flex flex-1">
                    {/* Primer div */}
                    <div className="flex flex-1 flex-col text-black px-3" style={{ gridArea: "productSold" }}>
                        <span className="font-bold">Mapa de la Ruta.</span>
                        <div className="flex flex-1">
                            {/* Cris */}
                            <div id="mapview" className="flex-1 rounded-lg overflow-hidden max-h-[90%]"/>
                        </div>
                    </div>

                    <div className="flex flex-col p-10 gap-y-10 justify-center">
                        {/* Segundo div */}
                        <div className="flex flex-col items-center text-black gap-10">
                            <span className="font-bold">Carga en Mercancía</span>
                            {/* Card */}
                            <div className="flex flex-row p-4" style={{ boxShadow: '0px 6px 13.7px 0px rgba(0, 0, 0, 0.10)', borderRadius: '20px', cursor: 'pointer' }}>
                                <svg className="h-[170px] w-[170px] text-red-400 pr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <circle cx="10" cy="10" r="8" />
                                </svg>
                                <div className="flex flex-col justify-center gap-y-3">
                                    <span className="text-4xl relative">$ 24, 550 <span className="text-base font-bold absolute">MXN</span></span>
                                    <p className="text-xs text-[#5e5e5e] flex text-center">Haga clic para gestionar la carga del vehiculo</p>
                                </div>
                            </div>
                        </div>

                        {/* Tercer div */}
                        <div className=" flex flex-col items-center text-black gap-10">
                            <span className="font-bold">Última hora de venta.</span>
                            <div className="flex flex-row p-4" style={{ boxShadow: '0px 6px 13.7px 0px rgba(0, 0, 0, 0.10)', borderRadius: '20px', cursor: 'pointer' }}>
                                <svg className="h-[170px] w-[170px] text-yellow-600 pr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <circle cx="10" cy="10" r="8" />
                                </svg>
                                <div className="flex flex-col justify-center gap-y-3">
                                    <span className="text-4xl relative">02 : 35 <span className="text-base font-bold absolute">PM</span></span>
                                    <p className="text-xs text-[#5e5e5e] flex text-center">Haga clic para gestionar el historial de venta</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}
