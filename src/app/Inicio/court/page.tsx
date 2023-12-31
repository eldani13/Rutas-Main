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
                            <span style={{ color: '#5e5e5e', fontWeight: '900' }}>Empleado:</span>
                            <p style={{ color: '#828282' }}>Juan Ricardo Jímenez</p>
                        </div>
                        <div>
                            <span style={{ color: '#5e5e5e', fontWeight: '900' }}>Vehículo asignado:</span>
                            <p style={{ color: '#828282' }}>Vehículo numero 3</p>
                        </div>
                        <div>
                            <span style={{ color: '#5e5e5e', fontWeight: '900' }}>Estado de ruta:</span>
                            <p style={{ color: '#ecab0f', fontWeight: '600' }}>Lista para realizar corte.</p>
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

            <div className="flex flex-col justify-between px-3  max-h-[100vh] h-full overflow-y-auto" style={{ alignSelf: 'flex-start' }}>

                <svg xmlns="http://www.w3.org/2000/svg" className="my-3" fill="#ccc" height="20" width="18" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg>

                <hr className="mb-10 border-[1px]" />
                <div className="grid w-full flex-1"
                    style={{
                        gridTemplateColumns: '1fr 1fr 1fr',
                        gridTemplateRows: '1fr 1fr',
                        gridTemplateAreas: " 'productSold productSold summary' 'productNotSold productNotSold summary' ",
                    }}>

                    {/* Primer div */}
                    <div className="flex text-black px-3" style={{ gridArea: "productSold" }}>
                        <table className="h-full w-full border-collapse">
                            <thead >
                                <tr className="bg-[#ccc] rounded-full grid grid-cols-3 py-2.5">
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Precio</th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>

                    {/* Tercer div */}
                    <div className="flex text-black px-3" style={{ gridArea: "productNotSold" }}>
                        <table className="h-full w-full border-collapse">
                            <thead >
                                <tr className="bg-[#ccc] rounded-full grid grid-cols-3 py-2">
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Precio</th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>

                    {/* Segundo div */}
                    <div className="flex flex-col text-black px-3 justify-between pb-5" style={{ gridArea: "summary" }}>
                        {/* Primer elemento */}
                        <div className="text-[#000] flex flex-col items-center w-full h-fit bg-[#ccc] py-2 rounded-full">
                            <p className="font-bold text-[20px] text-center">ESTIMADOS</p>
                        </div>
                        <div>

                            <div className="grid grid-cols-2 w-full py-5">
                                <p className="text-center">Salió con</p>
                                <div className="flex justify-between px-10">
                                    <p>$</p>
                                    <p className="relative flex-1 text-right">16,000 <span className=" ps-3 text-sm font-bold absolute top-[-3px]">MXN</span></p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 w-full py-5">
                                <p className="text-center">Vendió</p>
                                <div className="flex justify-between px-10">
                                    <p>$</p>
                                    <p className="relative flex-1 text-right">16,000 <span className=" ps-3 text-sm font-bold absolute top-[-3px]">MXN</span></p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 w-full py-5">
                                <p className="text-center">Entregó en<br /> efectivo</p>
                                <div className="flex justify-between px-10">
                                    <p>$</p>
                                    <p className="relative flex-1 text-right">100 <span className=" ps-3 text-sm font-bold absolute top-[-3px]">MXN</span></p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 w-full py-5">
                                <p className="text-center">Entregó en<br /> mercancia</p>
                                <div className="flex justify-between px-10">
                                    <p>$</p>
                                    <p className="relative flex-1 text-right">910 <span className=" ps-3 text-sm font-bold absolute top-[-3px]">MXN</span></p>
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex flex-col gap-5  rounded-xl text-center py-5" style={{boxShadow: '0px 6px 13.7px 0px rgba(0, 0, 0, 0.10)'}}>
                            <p className="font-bold text-lg">LA DIFERENCIA ES DE:</p>
                            <p className="font-normal text-xl text-red-500 relative">$ 10, 090 <span className=" ps-3 text-sm font-bold absolute top-[-3px]">MXN</span></p>
                        </div>
                    </div>

                </div>
            </div>




        </>

    )
}