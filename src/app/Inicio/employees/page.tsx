"use client"
import { ButtonCrud } from "@/components/buttons/ButtonCrud";
import { MessageEmployees, RootEmployees } from "@/types/employees";
import { deleteRemoveData, getAllFetchDataValues, patchEditVal, postInsertData } from "@/utils/api";
import Link from "next/link";
import React, { FormEvent, useEffect, useRef, useState } from "react";


export default function Employees() {

    const [dataEmployees, setDataEmployees] = useState<null | RootEmployees>(null);
    const [clickInEmployees, setclickEmployees] = useState<null | MessageEmployees>(null);
    const [viewAddEmployees, setviewAddEmployees] = useState<[boolean, string]>([false, 'insert']);

    const formRef = useRef<HTMLFormElement>(null);
    const input_user = useRef<HTMLInputElement>(null);
    const input_username = useRef<HTMLInputElement>(null);
    const input_lastnames = useRef<HTMLInputElement>(null);
    const select_role = useRef<HTMLSelectElement>(null);
    const input_password = useRef<HTMLInputElement>(null);

    const updateTable = async () => {
        await getAllFetchDataValues(`${process.env.BACK_URL}employees`)
            .then((rec: RootEmployees) => {
                // @ts-ignore
                setDataEmployees(rec)
                console.log(rec)

            })
    }

    const [passwordVisibility, setPasswordVisibility] = useState<{ [key: string]: boolean }>({});
    const handleTogglePassword = (id: string) => {
        setPasswordVisibility(prevState => ({
            ...prevState,
            [id]: !prevState[id] || false,
        }));
    };;

    useEffect(() => {
        fetch(`${process.env.BACK_URL}employees`)
            .then((env) => env.json())
            .then((rec) => {
                // @ts-ignore
                setDataEmployees(rec)
            })
    }, [])


    useEffect(() => {
        if (viewAddEmployees[1] == "edit" && clickInEmployees != null) {
            input_user.current && (input_user.current.value = clickInEmployees?.user || "");
            input_username.current && (input_username.current.value = clickInEmployees?.username.toString() || "");
            input_lastnames.current && (input_lastnames.current.value = clickInEmployees?.lastnames.toString() || "");
            select_role.current && (select_role.current.value = clickInEmployees?.role.toString() || "");
            input_password.current && (input_password.current.value = clickInEmployees?.password.toString() || "");
        }
    }, [viewAddEmployees])


    const onHandleform_addEmployees = async (e: FormEvent) => {
        e.preventDefault();
        if (viewAddEmployees[1] == "insert") {
            await insertEmployeesFunction()
        }
        else if (viewAddEmployees[1] == "edit") {
            await editEmployeesFunction()
        }

    }
    const editEmployeesFunction = async () => {
        await patchEditVal(`${process.env.BACK_URL}employee/edit/${clickInEmployees?._id}`,
            {
                "user": input_user.current?.value,
                "username": input_username.current?.value,
                "lastnames": input_lastnames.current?.value,
                "role": select_role.current?.value,
                "password": input_password.current?.value
            }, () => {
                setviewAddEmployees([false, 'insert']);
                updateTable();
                formRef.current?.reset();
            }, "empleado"
        )
    }
    const insertEmployeesFunction = async () => {
        await postInsertData(`${process.env.BACK_URL}employee/new/`, {
            "user": input_user.current?.value,
            "username": input_username.current?.value,
            "lastnames": input_lastnames.current?.value,
            "role": select_role.current?.value,
            "password": input_password.current?.value
        }, () => {
            setviewAddEmployees([false, 'insert']);
            updateTable();
            formRef.current?.reset();
        }, "empleado"
        )

    }
    const removeEmployeesHandle = async () => {
        await deleteRemoveData(`${process.env.BACK_URL}employee/delete/${clickInEmployees?._id}`,
            () => {
                setviewAddEmployees([false, 'insert']);
                updateTable();
                formRef.current?.reset();
            }, "empleado", `Quieres eliminar a: \n ${clickInEmployees?.username} \n ${clickInEmployees?.lastnames}`)

    }
    return (
        <>
            <div className="h-[100%] ">
                <div className="z-10 rigth-0 bottom-0 h-fit absolute xl:static xl:flex flex-col items-start xl:border-r-2 xl:border-[#bbbcbc] md:pt-14 px-4 xl:h-[100%] justify-between">
                    <div className="hidden xl:visible xl:flex flex-col items-start justify-center">
                        <h1 className="text-[#000] text-2xl font-bold mb-1">Empleados</h1>
                        <span className="">Listado de empleados <br /> contratados</span>
                    </div>

                    {/* Botones */}
                    <div className="pb-10 flex gap-2 gap-y-5 flex-row-reverse xl:flex-col items-baseline justify-center">
                        <ButtonCrud isHidden={clickInEmployees === null} text="Editar" color="bg-blue-500" onclickHandle={() => setviewAddEmployees([true, 'edit'])} >
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path fill="#bcbdbf" d="M8.807 52.42c1.607-2.01 3.654-.324 5.996 1.545c2.34 1.863 4.085 3.192 2.479 5.208c-1.607 2.02-8.01 6.161-10.349 4.299c-2.339-1.866.263-9.03 1.874-11.05" /><path fill="#a7a8ac" d="M16.834 55.701c1.089 1.093 1.517 2.129.447 3.472c-1.607 2.02-8.01 6.161-10.349 4.299c-.354-.283-.583-.7-.731-1.187c4.28-1.2 9.48-2.942 10.633-6.584" /><path fill="#59595c" d="m9.409 50.685l9.808 7.815l35.681-40.166L40.56 6.917z" /><g fill="#424143"><path d="m16.195 56.09l3.02 2.41l35.681-40.17l-5.28-4.204zm-3.771-3l-3.01-2.405l31.15-43.768l5.286 4.211z" /><path d="M40.706 4.875c-1.639 2.053-1.237 5.106.897 6.803l8.418 6.708c2.135 1.697 5.198 1.407 6.842-.649c1.637-2.057 1.231-5.106-.901-6.803l-8.424-6.708c-2.133-1.703-5.192-1.414-6.832.649" /><path d="M47.13 13.384c2.318 1.844 5.21 2.076 6.455.516l4.913-6.171c1.245-1.566.373-4.328-1.943-6.177c-2.314-1.85-5.212-2.076-6.457-.512l-4.913 6.17c-1.244 1.561-.375 4.325 1.945 6.174" /></g><path fill="#bcbdbf" d="M33.99 33.29c1.117 1 2.821.903 3.824-.213L51.682 17.59a2.699 2.699 0 0 0-.203-3.824a2.708 2.708 0 0 0-3.824.217l-13.87 15.485c-1 1.113-.91 2.824.205 3.822" /></svg>
                        </ButtonCrud>
                        <ButtonCrud isHidden={clickInEmployees === null} text="Eliminar" color="bg-red-400" onclickHandle={removeEmployeesHandle} >
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path fill="black" d="M1086 91L281 896h999v960q0 40-15 75t-41 61t-61 41t-75 15H320q-40 0-75-15t-61-41t-41-61t-15-75v-807l-37 37l-91-90l272-272l-91-90q-18-18-27-41t-10-50q0-51 37-90l271-272q18-18 41-27t50-10q26 0 49 9t42 28l90 91L996 0zm66 1765v-832H256v832q0 26 19 45t45 19h768q26 0 45-19t19-45M543 272L272 543l90 91l272-272zm1377-16h128v512h-512V640h292q-77-60-167-91t-188-31q-115 0-219 43t-185 124l-90-90q100-100 226-152t268-53q123 0 238 41t209 119zm-896 896v640H896v-640zm-256 0v640H640v-640zm-256 0v640H384v-640z" /></svg>
                        </ButtonCrud>
                        <ButtonCrud isHidden={false} text="Agregar" color="bg-green-500" onclickHandle={() => setviewAddEmployees([true, 'insert'])} >
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="black" d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 0 1 1-1" /></svg>
                        </ButtonCrud>

                    </div>
                </div>
            </div>

            <div className=" max-h-[100vh] h-full  ">
                <div className="z-20 max-h-[100vh] h-full pt-14 flex flex-col overflow-y-auto p-5 ">
                    {/* Informacion */}
                    <hr className="mb-10 border-[1px]" />


                    <div className="pb-28" >
                        <div className="hidden md:grid bg-neutral-300 py-3 font-bold px-3 mb-2 rounded-full" style={{ gridTemplateColumns: "50px 1fr 1fr 1fr 1fr 1fr" }}>
                            <p className="text-center">ID</p>
                            <p className="text-center">Usuario</p>
                            <p className="text-center">Nombre</p>
                            <p className="text-center">Apellidos</p>
                            <p className="text-center">Puesto</p>
                            <p className="text-center">Contraseña</p>
                        </div>

                        {
                            // @ts-ignore
                            dataEmployees && dataEmployees?.message.map((data: Message, index: number) => (
                                <div key={data._id} onClick={() => setclickEmployees(clickInEmployees != null ? null : data)}
                                    className={`bg-[linear-gradient(225deg,_#a1c4fd_10%,_#c2e9fb_90%)] 
                                        relative my-2 py-6 md:py-2 rounded-xl flex flex-col px-3 gap-2 font-semibold hover:bg-slate-200 cursor-pointer ${clickInEmployees?._id == data._id ? "bg-[linear-gradient(225deg,_#acfca2_10%,_#c0faea_90%)]" : " md:bg-none"}
                                        md:grid  justify-items-center md:rounded-full overflow-hidden text-center`} 
                                        style={{ gridTemplateColumns: "50px 1fr 1fr 1fr 1fr 1fr"}}>
                                    <td className="text-center hidden md:block">{index}</td>
                                    <td className="text-center flex gap-2"><span className="block md:hidden">Usuario: </span> {data.user}</td>
                                    <td className="text-center flex gap-2"><span className="block md:hidden">Nombres: </span> {data.username}</td>
                                    <td className="text-center flex gap-2"><span className="block md:hidden">Apellidos: </span> {data.lastnames}</td>
                                    <td className="text-center flex absolute md:static top-0 w-full"><p className="w-full uppercase font-bold md:font-normal">{data.role}</p></td>
                                    <td className="text-center max-w-52 md:max-w-7xl overflow-hidden flex flex-col justify-center ">
                                        <button className="m-auto" onClick={() => handleTogglePassword(data._id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512">
                                                <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                                            </svg>
                                        </button>
                                        {passwordVisibility[data._id] && (
                                            <span className="pl-4 contents break-words ">{data.password}</span>
                                        )}
                                    </td>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className={`z-20 bg-[#1d1b1b6e] absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center ${viewAddEmployees[0] ? 'visible' : 'hidden'}`}>
                    <form ref={formRef} onSubmit={onHandleform_addEmployees} action="" className="relative bg-slate-50 flex p-8 pt-16 md:p-20 flex-col rounded-xl ">
                        <div className="w-full flex absolute justify-center top-[0] -translate-y-[50%] left-0 right-0 ">
                            <div className={`${viewAddEmployees[1] == 'insert' ? "bg-teal-300" : "bg-sky-400"} w-20 h-20 flex rounded-full items-center justify-center shadow-lg shadow-emerald-800`}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 640 512" >
                                    <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z" />
                                </svg>
                            </div>
                        </div>
                        <h1 className="text-slate-900 font-semibold text-xl text-center">{viewAddEmployees[1] == "insert" ? "Insertar" : "Editar"} Empleado</h1>
                        <div className="flex flex-col gap-3 mb-16 ">

                            {/* user */}
                            <div >
                                <label htmlFor="">Usuario:</label>
                                <div className="ms-2 border-[1px] border-gray-500 flex flex-row overflow-hidden rounded-md">
                                    <div className="bg-slate-200 flex items-center justify-center color-slate-500 p-2 border-r-2 border-gray-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 320 512">
                                            <path d="M112 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm40 304V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V256.9L59.4 304.5c-9.1 15.1-28.8 20-43.9 10.9s-20-28.8-10.9-43.9l58.3-97c17.4-28.9 48.6-46.6 82.3-46.6h29.7c33.7 0 64.9 17.7 82.3 46.6l58.3 97c9.1 15.1 4.2 34.8-10.9 43.9s-34.8 4.2-43.9-10.9L232 256.9V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V352H152z" />
                                        </svg>
                                    </div>
                                    <input type="text" ref={input_user} className="flex w-full h-auto px-3" />
                                </div>
                            </div>

                            {/* username */}
                            <div >
                                <label htmlFor="">Nombre:</label>
                                <div className="ms-2 border-[1px] border-gray-500 flex flex-row overflow-hidden rounded-md">
                                    <div className="bg-slate-200 flex items-center justify-center color-slate-500 p-2 border-r-2 border-gray-500">

                                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512">
                                            <path d="M192 128c0-17.7 14.3-32 32-32s32 14.3 32 32v7.8c0 27.7-2.4 55.3-7.1 82.5l-84.4 25.3c-40.6 12.2-68.4 49.6-68.4 92v71.9c0 40 32.5 72.5 72.5 72.5c26 0 50-13.9 62.9-36.5l13.9-24.3c26.8-47 46.5-97.7 58.4-150.5l94.4-28.3-12.5 37.5c-3.3 9.8-1.6 20.5 4.4 28.8s15.7 13.3 26 13.3H544c17.7 0 32-14.3 32-32s-14.3-32-32-32H460.4l18-53.9c3.8-11.3 .9-23.8-7.4-32.4s-20.7-11.8-32.2-8.4L316.4 198.1c2.4-20.7 3.6-41.4 3.6-62.3V128c0-53-43-96-96-96s-96 43-96 96v32c0 17.7 14.3 32 32 32s32-14.3 32-32V128zm-9.2 177l49-14.7c-10.4 33.8-24.5 66.4-42.1 97.2l-13.9 24.3c-1.5 2.6-4.3 4.3-7.4 4.3c-4.7 0-8.5-3.8-8.5-8.5V335.6c0-14.1 9.3-26.6 22.8-30.7zM24 368c-13.3 0-24 10.7-24 24s10.7 24 24 24H64.3c-.2-2.8-.3-5.6-.3-8.5V368H24zm592 48c13.3 0 24-10.7 24-24s-10.7-24-24-24H305.9c-6.7 16.3-14.2 32.3-22.3 48H616z" />
                                        </svg>
                                    </div>
                                    <input type="text" ref={input_username} className="flex w-full h-auto px-3" />
                                </div>
                            </div>

                            {/* lastnames */}
                            <div >
                                <label htmlFor="">Apellidos:</label>
                                <div className="ms-2 border-[1px] border-gray-500 flex flex-row overflow-hidden rounded-md">
                                    <div className="bg-slate-200 flex items-center justify-center color-slate-500 p-2 border-r-2 border-gray-500">

                                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512">
                                            <path d="M192 128c0-17.7 14.3-32 32-32s32 14.3 32 32v7.8c0 27.7-2.4 55.3-7.1 82.5l-84.4 25.3c-40.6 12.2-68.4 49.6-68.4 92v71.9c0 40 32.5 72.5 72.5 72.5c26 0 50-13.9 62.9-36.5l13.9-24.3c26.8-47 46.5-97.7 58.4-150.5l94.4-28.3-12.5 37.5c-3.3 9.8-1.6 20.5 4.4 28.8s15.7 13.3 26 13.3H544c17.7 0 32-14.3 32-32s-14.3-32-32-32H460.4l18-53.9c3.8-11.3 .9-23.8-7.4-32.4s-20.7-11.8-32.2-8.4L316.4 198.1c2.4-20.7 3.6-41.4 3.6-62.3V128c0-53-43-96-96-96s-96 43-96 96v32c0 17.7 14.3 32 32 32s32-14.3 32-32V128zm-9.2 177l49-14.7c-10.4 33.8-24.5 66.4-42.1 97.2l-13.9 24.3c-1.5 2.6-4.3 4.3-7.4 4.3c-4.7 0-8.5-3.8-8.5-8.5V335.6c0-14.1 9.3-26.6 22.8-30.7zM24 368c-13.3 0-24 10.7-24 24s10.7 24 24 24H64.3c-.2-2.8-.3-5.6-.3-8.5V368H24zm592 48c13.3 0 24-10.7 24-24s-10.7-24-24-24H305.9c-6.7 16.3-14.2 32.3-22.3 48H616z" />
                                        </svg>
                                    </div>
                                    <input type="text" ref={input_lastnames} className="flex w-full h-auto px-3" />
                                </div>
                            </div>

                            {/* role */}
                            <div >
                                <label htmlFor="">Puesto:</label>
                                <div className="ms-2 border-[1px] border-gray-500 flex flex-row overflow-hidden rounded-md">
                                    <div className="bg-slate-200 flex items-center justify-center color-slate-500 p-2 border-r-2 border-gray-500">

                                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 576 512"><path d="M0 80v48c0 17.7 14.3 32 32 32H48 96V80c0-26.5-21.5-48-48-48S0 53.5 0 80zM112 32c10 13.4 16 30 16 48V384c0 35.3 28.7 64 64 64s64-28.7 64-64v-5.3c0-32.4 26.3-58.7 58.7-58.7H480V128c0-53-43-96-96-96H112zM464 480c61.9 0 112-50.1 112-112c0-8.8-7.2-16-16-16H314.7c-14.7 0-26.7 11.9-26.7 26.7V384c0 53-43 96-96 96H368h96z" />
                                        </svg>
                                    </div>
                                    <select ref={select_role} className="flex w-full h-auto px-3">
                                        <option value="administrador">Administrador</option>
                                        <option value="empleado">Empleado</option>
                                    </select>
                                </div>
                            </div>

                            {/* password */}
                            <div >
                                <label htmlFor="">Contraseña:</label>
                                <div className="ms-2 border-[1px] border-gray-500 flex flex-row overflow-hidden rounded-md">
                                    <div className="bg-slate-200 flex items-center justify-center color-slate-500 p-2 border-r-2 border-gray-500">

                                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 448 512">
                                            <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
                                        </svg>
                                    </div>
                                    <input type="password" ref={input_password} className="flex w-full h-auto px-3" />
                                </div>
                            </div>
                        </div>

                        {/* Botones */}
                        <div className="flex justify-between w-full gap-8">
                            <button type="submit" className="bg-blue-500 text-slate-50 px-6 py-2 rounded-full hover:scale-[1.1]">Guardar</button>
                            <button type="reset" onClick={() => setviewAddEmployees([false, 'insert'])} className="bg-red-500 text-slate-50 px-6 py-2 rounded-full hover:scale-[1.1]">Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>

        </>

    );
}