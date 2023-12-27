import React from "react";

export default function Vehicle() {
    return (
        <>
            <div className="flex flex-col items-start border-r-2 border-[#bbbcbc] pt-14 px-4 h-[100%] justify-between">
                <div className="flex flex-col items-start justify-center">
                    <h1 className="text-[#000] text-2xl font-bold mb-1">Unidades/ <br />Vehículos</h1>
                    <span className="">Listado de Vehículos</span>
                </div>

                {/* Botones */}
                <div className="pb-10 flex flex-col space-y-10 items-center">

                    <button className="bg-[#ececec] text-black px-2 py-2 mb-2 rounded-[50px] h-14 w-52 flex items-center justify-between font-bold">
                        <svg className="h-[50px] w-[50px] text-green-500 pr-2" fill="currentColor" viewBox="0 0 20 20">
                            <circle cx="10" cy="10" r="8" />
                        </svg>
                        <span className="mr-10">Agregar</span>
                    </button>


                    <button className="bg-[#ececec] text-black px-2 py-2 mb-2 rounded-[50px] h-14 w-52 flex items-center justify-between font-bold">
                        <svg className="h-[50px] w-[50px] text-blue-500 pr-2" fill="currentColor" viewBox="0 0 20 20">
                            <circle cx="10" cy="10" r="8" />
                        </svg>
                        <span className="mr-10">Editar</span>
                    </button>

                    <button className="bg-[#ececec] text-black px-2 py-2 mb-2 rounded-[50px] h-14 w-52 flex items-center justify-between font-bold">
                        <svg className="h-[50px] w-[50px] text-red-500 pr-2" fill="currentColor" viewBox="0 0 20 20">
                            <circle cx="10" cy="10" r="8" />
                        </svg>
                        <span className="mr-10">Eliminar</span>
                    </button>

                </div>
            </div>


            {/* Informacion */}
            <div className="grid grid-cols-5  bg-[#ccc] w-[1500px] h-[70px] items-center rounded-full mt-[-700px] ml-[50px] ">
                {/* Primer elemento */}
                <div className="text-[#000] flex flex-col items-center">
                    <span className="font-bold">ID</span>
                </div>

                {/* Segundo elemento */}
                <div className="text-[#000] flex flex-col items-center">
                    <span className="font-bold">Marca</span>
                </div>

                {/* Tercer elemento */}
                <div className="text-[#000] flex flex-col items-center">
                    <span className="font-bold">Modelo</span>
                </div>

                {/* Cuarto elemento */}
                <div className="text-[#000] flex flex-col items-center">
                    <span className="font-bold">Último cambio de aceite</span>
                </div>

                {/* Quinto elemento */}
                <div className="text-[#000] flex flex-col items-center">
                    <span className="font-bold">Próximo cambio de aceite</span>
                </div>
            </div>


        </>

    );
}
