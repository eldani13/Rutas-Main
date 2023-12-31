import React, { useState } from "react"
// import Home from "./HomeSection";

interface RoutesName {
    name: String,
    description: String
}

export default function Route() {

    const [isHover, setIsHover] = useState(false);

    type RoutesName = {
        key: string;
        name: string;
        description: string;
    };

    const namesRoutes: RoutesName[] = [
        {
            key: '1',
            name: 'Cristhian',
            description: 'Ruta de mensajeria',
        },
        {
            key: '2',
            name: 'Luis',
            description: 'Rutas de mensajerias',
        },
        {
            key: '3',
            name: 'cristhian',
            description: 'Rutal de mensajeria',
        },
        {
            key: '4',
            name: 'cristhian',
            description: 'Rutadsa de mensajeria',
        },
        {
            key: '5',
            name: 'cristhian',
            description: 'Rutads de mensajeria',
        },
        {
            key: '6',
            name: 'cristhian',
            description: 'Rutads de mensajeria',
        },
    ];


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


            <div className="text-[#000] flex flex-col items-center gap-20 overflow-y-auto max-h-[100vh]">
                <div className="flex flex-col ">
                    <div className="flex flex-wrap max-w-full justify-around px-4 gap-x-10 gap-y-5 py-4">

                        {namesRoutes.map((routeName: RoutesName) => (
                            <div className="group cursor-pointer flex  justify-between items-center gap-10 px-5  py-2 hover:bg-gray-100 rounded-full">
                                <div className="flex justify-start gap-5">
                                    <div className="flex bg-[#ccc] h-20 w-20 overflow-hidden rounded-full items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="45" width="45" viewBox="0 0 448 512">
                                            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                                        </svg>
                                    </div>
                                    <div className="text-[#000] flex flex-col gap-3 min-w-60">
                                        <span className="font-bold text-xl lg:text-2xl">{routeName.name}</span>
                                        <p className="text-[#bbbcbc] text-sm lg:text-base">{routeName.description}</p>
                                    </div>
                                </div>
                                <svg className="group-hover:animate-bounce" xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                                </svg>
                            </div>
                        ))
                        }

                    </div>
                </div>
            </div>
        </>
    );
}
