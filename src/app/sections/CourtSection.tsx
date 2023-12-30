import React from "react"

export default function Court() {
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
                            <span style={{color: '#5e5e5e', fontWeight:'900'}}>Empleado:</span>
                            <p style={{color: '#828282'}}>Juan Ricardo Jímenez</p>
                        </div>
                        <div>
                            <span style={{color: '#5e5e5e', fontWeight:'900'}}>Vehículo asignado:</span>
                            <p style={{color: '#828282'}}>Vehículo numero 3</p>
                        </div>
                        <div>
                            <span style={{color: '#5e5e5e', fontWeight:'900'}}>Estado de ruta:</span>
                            <p style={{color: '#ecab0f', fontWeight:'600'}}>Lista para realizar corte.</p>
                        </div>

                    </div>

                </div>

                {/* Botones */}
                <div className="pb-10 flex flex-col space-y-10 items-center">

                    <button className="bg-[#ececec] text-black px-2 py-2 mb-2 rounded-[50px] h-14 w-52 flex items-center justify-between font-bold">
                        <svg className="h-[50px] w-[50px] text-green-500 pr-2" fill="currentColor" viewBox="0 0 20 20">
                            <circle cx="10" cy="10" r="8" />
                        </svg>
                        <span className="mr-10">Ver Historial</span>
                    </button>


                    <button className="bg-[#ececec] text-black px-2 py-2 mb-2 rounded-[50px] h-14 w-52 flex items-center justify-between font-bold">
                        <svg className="h-[50px] w-[50px] text-blue-500 pr-2" fill="currentColor" viewBox="0 0 20 20">
                            <circle cx="10" cy="10" r="8" />
                        </svg>
                        <span className="mr-10 text-[14px]">Finalizar Corte</span>
                    </button>
                </div>
            </div>

            <div className="flex justify-between p-14 max-h-[100vh] h-full" style={{ alignSelf: 'flex-start' }}>
                <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '220px' }}>

                    {/* Primer div */}
                    <div className="grid grid-cols-3 bg-[#ccc] h-[70px] items-center rounded-full " style={{ width: '40rem' }}>
                        {/* Primer elemento */}
                        <div className="text-[#000] flex flex-col items-center">
                            <span className="font-bold">Producto</span>
                        </div>

                        {/* Segundo elemento */}
                        <div className="text-[#000] flex flex-col items-center">
                            <span className="font-bold">Cantidad</span>
                        </div>

                        {/* Tercer elemento */}
                        <div className="text-[#000] flex flex-col items-center">
                            <span className="font-bold">Precio</span>
                        </div>
                    </div>


                    {/* Segundo div */}
                    <div className="grid grid-cols-1 bg-[#ccc]  h-[70px] w-[25rem] items-center rounded-full ">
                        {/* Primer elemento */}
                        <div className="text-[#000] flex flex-col items-center ">
                            <span className="font-bold text-[20px]">ESTIMADOS</span>
                        </div>
                    </div>
                    
                    {/* Tercer div */}
                    <div className="grid grid-cols-3 bg-[#ccc] h-[70px] items-center rounded-full " style={{ width: '40rem' }}>
                        {/* Primer elemento */}
                        <div className="text-[#000] flex flex-col items-center">
                            <span className="font-bold">Producto</span>
                        </div>

                        {/* Segundo elemento */}
                        <div className="text-[#000] flex flex-col items-center">
                            <span className="font-bold">Cantidad</span>
                        </div>

                        {/* Tercer elemento */}
                        <div className="text-[#000] flex flex-col items-center">
                            <span className="font-bold">Precio</span>
                        </div>
                    </div>
                </div>
            </div>




        </>

    )
}