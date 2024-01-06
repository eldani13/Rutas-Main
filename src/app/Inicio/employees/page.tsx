"use client"
import React, { useEffect, useState } from "react"



interface Message {
    _id: string
    user: string
    username: string
    lastnames: string
    role: string
    password: string
    __v: number
}
interface Root {
    message: Message[]
    details: boolean
}

export default function Employees() {
    const [dataEmployees, setDataEmployees] = useState<null |Root >(null);

    useEffect(() => {
        fetch("http://localhost:3002/api/v1/employees")
            .then((env) => env.json())
            .then((rec) => {
                // @ts-ignore
                setDataEmployees(rec)
            })
    }, [])

    return (

        <>
            <div className="flex flex-col items-start border-r-2 border-[#bbbcbc] pt-14 px-4 h-[100%] justify-between">
                <div className="flex flex-col items-start justify-center min-h-min">
                    <h1 className="text-[#000] text-2xl font-bold mb-1">Empleados</h1>
                    <span className="">Listado de empleados <br /> contratados.</span>
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



            <div className="max-h-[100vh] h-full pt-14 flex flex-col overflow-y-auto p-5">
                {/* Informacion */}
                <hr className="mb-10 border-[1px]" />
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-[#ccc] rounded-full  py-2"> 
                        {/* <tr > */}
                            <th>ID</th>
                            <th>Usuario</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Puesto</th>
                            <th>Contraseña</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // @ts-ignore
                            dataEmployees && dataEmployees?.message.map((data:Message)=>(
                                <tr className="my-4 px-5">
                                    <td>{data._id}</td>
                                    <td>{data.user}</td>
                                    <td>{data.username}</td>
                                    <td>{data.lastnames}</td>
                                    <td>{data.role}</td>
                                    <td>{data.password}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                {/* <div className="flex text-center gap-2  justify-around bg-[#ccc] w-[100%] py-5 px-2 items-center rounded-full mx-auto text-black font-bold">
                    <p>ID</p>
                    <p>Usuario</p>
                    <p>Nombre</p>
                    <p>Apellido</p>
                    <p>Puesto</p>
                    <p>Contraseña</p>
                </div> */}
            </div>
        </>
    )
}