import React, { useState } from "react"
// import Home from "./HomeSection";

export default function Route() {


    // const sections = [<Home />];
    // const [sectionactual, setSectionActual] = useState(1)
    // const styleselectbuttom = {
    //     display: 'flex',
    //     width: '47px',
    //     height: '48px',
    //     padding: '9px 8px 9px 9px',
    //     flexShrink: '0',
    //     borderRadius: '5px',
    //     background: '#acacac',
    //     fill: '#fff',
    // };

    return (
        <>
            <div className="flex flex-col items-start border-r-2 border-[#bbbcbc] pt-14 px-4 h-[100%]">
                <div className="flex flex-col items-start justify-center">
                    <h1 className="text-[#000] text-2xl font-bold mb-1">Rutas</h1>
                </div>
                <div className="flex flex-col text-[#000] items-start">
                    <span className="">Gestiona tus rutas.</span>
                </div>
            </div>


            <div className="text-[#000] flex flex-col items-center gap-20">
                <div className="flex flex-col">


                    <div className="flex flex-row gap-60">

                        <div className=" h-36 w-80 flex justify-center items-center gap-5" style={{ cursor: 'pointer'}}>
                            <div className="flex bg-[#ccc] h-20 w-20 rounded-full items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 16 16" fill="none">
                                    <path d="M6.5 14.5V10.9947C6.5 10.75 6.75 10.5 7 10.5H9C9.25 10.5 9.5 10.75 9.5 11V14.5C9.5 14.7761 9.72386 15 10 15H14C14.2761 15 14.5 14.7761 14.5 14.5V7.5C14.5 7.36739 14.4473 7.24021 14.3536 7.14645L13 5.79289V2.5C13 2.22386 12.7761 2 12.5 2H11.5C11.2239 2 11 2.22386 11 2.5V3.79289L8.35355 1.14645C8.15829 0.951184 7.84171 0.951184 7.64645 1.14645L1.64645 7.14645C1.55268 7.24021 1.5 7.36739 1.5 7.5V14.5C1.5 14.7761 1.72386 15 2 15H6C6.27614 15 6.5 14.7761 6.5 14.5Z" fill="#9c9c9c " />
                                </svg>
                            </div>
                            <div className="text-[#000] flex flex-col gap-3">
                                <span>Ruta Jímenez</span>
                                <p>Descripción pequeña de la ruta</p>
                            </div>
                        </div>

                        <div className=" h-36 w-80 flex justify-center items-center gap-5  ">
                            <div className="flex bg-[#ccc] h-20 w-20 rounded-full items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 16 16" fill="none">
                                    <path d="M6.5 14.5V10.9947C6.5 10.75 6.75 10.5 7 10.5H9C9.25 10.5 9.5 10.75 9.5 11V14.5C9.5 14.7761 9.72386 15 10 15H14C14.2761 15 14.5 14.7761 14.5 14.5V7.5C14.5 7.36739 14.4473 7.24021 14.3536 7.14645L13 5.79289V2.5C13 2.22386 12.7761 2 12.5 2H11.5C11.2239 2 11 2.22386 11 2.5V3.79289L8.35355 1.14645C8.15829 0.951184 7.84171 0.951184 7.64645 1.14645L1.64645 7.14645C1.55268 7.24021 1.5 7.36739 1.5 7.5V14.5C1.5 14.7761 1.72386 15 2 15H6C6.27614 15 6.5 14.7761 6.5 14.5Z" fill="#9c9c9c " />
                                </svg>
                            </div>
                            <div className="text-[#000] flex flex-col gap-3">
                                <span>Administrador</span>
                                <p>Sesión iniciada como Victor</p>
                            </div>
                        </div>
                        

                    </div>
                    

                    <div className="flex flex-row gap-60">

                        <div className=" h-36 w-80 flex justify-center items-center gap-5  ">
                            <div className="flex bg-[#ccc] h-20 w-20 rounded-full items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 16 16" fill="none">
                                    <path d="M6.5 14.5V10.9947C6.5 10.75 6.75 10.5 7 10.5H9C9.25 10.5 9.5 10.75 9.5 11V14.5C9.5 14.7761 9.72386 15 10 15H14C14.2761 15 14.5 14.7761 14.5 14.5V7.5C14.5 7.36739 14.4473 7.24021 14.3536 7.14645L13 5.79289V2.5C13 2.22386 12.7761 2 12.5 2H11.5C11.2239 2 11 2.22386 11 2.5V3.79289L8.35355 1.14645C8.15829 0.951184 7.84171 0.951184 7.64645 1.14645L1.64645 7.14645C1.55268 7.24021 1.5 7.36739 1.5 7.5V14.5C1.5 14.7761 1.72386 15 2 15H6C6.27614 15 6.5 14.7761 6.5 14.5Z" fill="#9c9c9c " />
                                </svg>
                            </div>
                            <div className="text-[#000] flex flex-col gap-3">
                                <span>Administrador</span>
                                <p>Sesión iniciada como Victor</p>
                            </div>
                        </div>

                        <div className=" h-36 w-80 flex justify-center items-center gap-5  ">
                            <div className="flex bg-[#ccc] h-20 w-20 rounded-full items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 16 16" fill="none">
                                    <path d="M6.5 14.5V10.9947C6.5 10.75 6.75 10.5 7 10.5H9C9.25 10.5 9.5 10.75 9.5 11V14.5C9.5 14.7761 9.72386 15 10 15H14C14.2761 15 14.5 14.7761 14.5 14.5V7.5C14.5 7.36739 14.4473 7.24021 14.3536 7.14645L13 5.79289V2.5C13 2.22386 12.7761 2 12.5 2H11.5C11.2239 2 11 2.22386 11 2.5V3.79289L8.35355 1.14645C8.15829 0.951184 7.84171 0.951184 7.64645 1.14645L1.64645 7.14645C1.55268 7.24021 1.5 7.36739 1.5 7.5V14.5C1.5 14.7761 1.72386 15 2 15H6C6.27614 15 6.5 14.7761 6.5 14.5Z" fill="#9c9c9c " />
                                </svg>
                            </div>
                            <div className="text-[#000] flex flex-col gap-3">
                                <span>Administrador</span>
                                <p>Sesión iniciada como Victor</p>
                            </div>
                        </div>

                    </div>

                    <div className="flex flex-row gap-60">

                        <div className=" h-36 w-80 flex justify-center items-center gap-5  ">
                            <div className="flex bg-[#ccc] h-20 w-20 rounded-full items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 16 16" fill="none">
                                    <path d="M6.5 14.5V10.9947C6.5 10.75 6.75 10.5 7 10.5H9C9.25 10.5 9.5 10.75 9.5 11V14.5C9.5 14.7761 9.72386 15 10 15H14C14.2761 15 14.5 14.7761 14.5 14.5V7.5C14.5 7.36739 14.4473 7.24021 14.3536 7.14645L13 5.79289V2.5C13 2.22386 12.7761 2 12.5 2H11.5C11.2239 2 11 2.22386 11 2.5V3.79289L8.35355 1.14645C8.15829 0.951184 7.84171 0.951184 7.64645 1.14645L1.64645 7.14645C1.55268 7.24021 1.5 7.36739 1.5 7.5V14.5C1.5 14.7761 1.72386 15 2 15H6C6.27614 15 6.5 14.7761 6.5 14.5Z" fill="#9c9c9c " />
                                </svg>
                            </div>
                            <div className="text-[#000] flex flex-col gap-3">
                                <span>Administrador</span>
                                <p>Sesión iniciada como Victor</p>
                            </div>
                        </div>

                        <div className=" h-36 w-80 flex justify-center items-center gap-5  ">
                            <div className="flex bg-[#ccc] h-20 w-20 rounded-full items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 16 16" fill="none">
                                    <path d="M6.5 14.5V10.9947C6.5 10.75 6.75 10.5 7 10.5H9C9.25 10.5 9.5 10.75 9.5 11V14.5C9.5 14.7761 9.72386 15 10 15H14C14.2761 15 14.5 14.7761 14.5 14.5V7.5C14.5 7.36739 14.4473 7.24021 14.3536 7.14645L13 5.79289V2.5C13 2.22386 12.7761 2 12.5 2H11.5C11.2239 2 11 2.22386 11 2.5V3.79289L8.35355 1.14645C8.15829 0.951184 7.84171 0.951184 7.64645 1.14645L1.64645 7.14645C1.55268 7.24021 1.5 7.36739 1.5 7.5V14.5C1.5 14.7761 1.72386 15 2 15H6C6.27614 15 6.5 14.7761 6.5 14.5Z" fill="#9c9c9c " />
                                </svg>
                            </div>
                            <div className="text-[#000] flex flex-col gap-3">
                                <span>Administrador</span>
                                <p>Sesión iniciada como Victor</p>
                            </div>
                        </div>

                    </div>

                    <div className="flex flex-row gap-60">

                        <div className=" h-36 w-80 flex justify-center items-center gap-5  ">
                            <div className="flex bg-[#ccc] h-20 w-20 rounded-full items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 16 16" fill="none">
                                    <path d="M6.5 14.5V10.9947C6.5 10.75 6.75 10.5 7 10.5H9C9.25 10.5 9.5 10.75 9.5 11V14.5C9.5 14.7761 9.72386 15 10 15H14C14.2761 15 14.5 14.7761 14.5 14.5V7.5C14.5 7.36739 14.4473 7.24021 14.3536 7.14645L13 5.79289V2.5C13 2.22386 12.7761 2 12.5 2H11.5C11.2239 2 11 2.22386 11 2.5V3.79289L8.35355 1.14645C8.15829 0.951184 7.84171 0.951184 7.64645 1.14645L1.64645 7.14645C1.55268 7.24021 1.5 7.36739 1.5 7.5V14.5C1.5 14.7761 1.72386 15 2 15H6C6.27614 15 6.5 14.7761 6.5 14.5Z" fill="#9c9c9c " />
                                </svg>
                            </div>
                            <div className="text-[#000] flex flex-col gap-3">
                                <span>Administrador</span>
                                <p>Sesión iniciada como Victor</p>
                            </div>
                        </div>

                        <div className=" h-36 w-80 flex justify-center items-center gap-5  ">
                            <div className="flex bg-[#ccc] h-20 w-20 rounded-full items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 16 16" fill="none">
                                    <path d="M6.5 14.5V10.9947C6.5 10.75 6.75 10.5 7 10.5H9C9.25 10.5 9.5 10.75 9.5 11V14.5C9.5 14.7761 9.72386 15 10 15H14C14.2761 15 14.5 14.7761 14.5 14.5V7.5C14.5 7.36739 14.4473 7.24021 14.3536 7.14645L13 5.79289V2.5C13 2.22386 12.7761 2 12.5 2H11.5C11.2239 2 11 2.22386 11 2.5V3.79289L8.35355 1.14645C8.15829 0.951184 7.84171 0.951184 7.64645 1.14645L1.64645 7.14645C1.55268 7.24021 1.5 7.36739 1.5 7.5V14.5C1.5 14.7761 1.72386 15 2 15H6C6.27614 15 6.5 14.7761 6.5 14.5Z" fill="#9c9c9c " />
                                </svg>
                            </div>
                            <div className="text-[#000] flex flex-col gap-3">
                                <span>Administrador</span>
                                <p>Sesión iniciada como Victor</p>
                            </div>
                        </div>

                    </div>

                    <div className="flex flex-row gap-60">

                        <div className=" h-36 w-80 flex justify-center items-center gap-5  ">
                            <div className="flex bg-[#ccc] h-20 w-20 rounded-full items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 16 16" fill="none">
                                    <path d="M6.5 14.5V10.9947C6.5 10.75 6.75 10.5 7 10.5H9C9.25 10.5 9.5 10.75 9.5 11V14.5C9.5 14.7761 9.72386 15 10 15H14C14.2761 15 14.5 14.7761 14.5 14.5V7.5C14.5 7.36739 14.4473 7.24021 14.3536 7.14645L13 5.79289V2.5C13 2.22386 12.7761 2 12.5 2H11.5C11.2239 2 11 2.22386 11 2.5V3.79289L8.35355 1.14645C8.15829 0.951184 7.84171 0.951184 7.64645 1.14645L1.64645 7.14645C1.55268 7.24021 1.5 7.36739 1.5 7.5V14.5C1.5 14.7761 1.72386 15 2 15H6C6.27614 15 6.5 14.7761 6.5 14.5Z" fill="#9c9c9c " />
                                </svg>
                            </div>
                            <div className="text-[#000] flex flex-col gap-3">
                                <span>Administrador</span>
                                <p>Sesión iniciada como Victor</p>
                            </div>
                        </div>

                        <div className=" h-36 w-80 flex justify-center items-center gap-5  ">
                            <div className="flex bg-[#ccc] h-20 w-20 rounded-full items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 16 16" fill="none">
                                    <path d="M6.5 14.5V10.9947C6.5 10.75 6.75 10.5 7 10.5H9C9.25 10.5 9.5 10.75 9.5 11V14.5C9.5 14.7761 9.72386 15 10 15H14C14.2761 15 14.5 14.7761 14.5 14.5V7.5C14.5 7.36739 14.4473 7.24021 14.3536 7.14645L13 5.79289V2.5C13 2.22386 12.7761 2 12.5 2H11.5C11.2239 2 11 2.22386 11 2.5V3.79289L8.35355 1.14645C8.15829 0.951184 7.84171 0.951184 7.64645 1.14645L1.64645 7.14645C1.55268 7.24021 1.5 7.36739 1.5 7.5V14.5C1.5 14.7761 1.72386 15 2 15H6C6.27614 15 6.5 14.7761 6.5 14.5Z" fill="#9c9c9c " />
                                </svg>
                            </div>
                            <div className="text-[#000] flex flex-col gap-3">
                                <span>Administrador</span>
                                <p>Sesión iniciada como Victor</p>
                            </div>
                        </div>

                    </div>

                    <div className="flex flex-row gap-60">

                        <div className=" h-36 w-80 flex justify-center items-center gap-5  ">
                            <div className="flex bg-[#ccc] h-20 w-20 rounded-full items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 16 16" fill="none">
                                    <path d="M6.5 14.5V10.9947C6.5 10.75 6.75 10.5 7 10.5H9C9.25 10.5 9.5 10.75 9.5 11V14.5C9.5 14.7761 9.72386 15 10 15H14C14.2761 15 14.5 14.7761 14.5 14.5V7.5C14.5 7.36739 14.4473 7.24021 14.3536 7.14645L13 5.79289V2.5C13 2.22386 12.7761 2 12.5 2H11.5C11.2239 2 11 2.22386 11 2.5V3.79289L8.35355 1.14645C8.15829 0.951184 7.84171 0.951184 7.64645 1.14645L1.64645 7.14645C1.55268 7.24021 1.5 7.36739 1.5 7.5V14.5C1.5 14.7761 1.72386 15 2 15H6C6.27614 15 6.5 14.7761 6.5 14.5Z" fill="#9c9c9c " />
                                </svg>
                            </div>
                            <div className="text-[#000] flex flex-col gap-3">
                                <span>Administrador</span>
                                <p>Sesión iniciada como Victor</p>
                            </div>
                        </div>

                        <div className=" h-36 w-80 flex justify-center items-center gap-5  ">
                            <div className="flex bg-[#ccc] h-20 w-20 rounded-full items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 16 16" fill="none">
                                    <path d="M6.5 14.5V10.9947C6.5 10.75 6.75 10.5 7 10.5H9C9.25 10.5 9.5 10.75 9.5 11V14.5C9.5 14.7761 9.72386 15 10 15H14C14.2761 15 14.5 14.7761 14.5 14.5V7.5C14.5 7.36739 14.4473 7.24021 14.3536 7.14645L13 5.79289V2.5C13 2.22386 12.7761 2 12.5 2H11.5C11.2239 2 11 2.22386 11 2.5V3.79289L8.35355 1.14645C8.15829 0.951184 7.84171 0.951184 7.64645 1.14645L1.64645 7.14645C1.55268 7.24021 1.5 7.36739 1.5 7.5V14.5C1.5 14.7761 1.72386 15 2 15H6C6.27614 15 6.5 14.7761 6.5 14.5Z" fill="#9c9c9c " />
                                </svg>
                            </div>
                            <div className="text-[#000] flex flex-col gap-3">
                                <span>Administrador</span>
                                <p>Sesión iniciada como Victor</p>
                            </div>
                        </div>

                    </div>


                </div>
                
            </div>
            
        </>
    );
}
