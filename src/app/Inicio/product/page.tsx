"use client"
import { MessageProduct, RootProduct } from "@/types/product"
import { deleteRemoveData, getAllFetchDataValues, patchEditVal, postInsertData } from "@/utils/api"
import React, { useEffect, useRef, useState, FormEvent } from "react"

export default function Product() {
    const [dataProductList, setDataProductList] = useState<null | RootProduct>(null)
    const [clickInProduct, setClickInProduct] = useState<null | MessageProduct>(null)
    const [viewAddProduct, setviewAddProduct] = useState<[boolean, string]>([false, 'insert']);
    const formRef = useRef<null | HTMLFormElement>(null);

    const input_nombre = useRef<HTMLInputElement>(null);
    const input_descripcion = useRef<HTMLInputElement>(null);
    const input_precio = useRef<HTMLInputElement>(null);
    const input_productIsSold = useRef<HTMLInputElement>(null);


    const onHandleform_addorEditProduct = async (e: FormEvent) => {
        e.preventDefault();
        if (viewAddProduct[1] == "insert") {
            await insertProductFunction()
        }
        else if (viewAddProduct[1] == "edit") {
            await editProductFunction()
        }

    }


    const insertProductFunction = async () => {
        await postInsertData(`${process.env.NEXT_PUBLIC_BACK_URL}products/new/`, {
            "productName": input_nombre.current?.value,
            "productDescription": input_descripcion.current?.value,
            "productPrice": parseFloat(input_precio.current?.value || "0"),
            "productIsSold": input_productIsSold.current?.checked

        }, () => {
            setviewAddProduct([false, 'insert']);
            updateTable();
            formRef.current?.reset();
        }, "producto"
        )

    }

    const editProductFunction = async () => {
        await patchEditVal(`${process.env.NEXT_PUBLIC_BACK_URL}products/edit/${clickInProduct?._id}`,
            {
                "productName": input_nombre.current?.value,
                "productDescription": input_descripcion.current?.value,
                "productPrice": parseFloat(input_precio.current?.value || "0"),
                "productIsSold": input_productIsSold.current?.checked
            }, () => {
                setviewAddProduct([false, 'insert']);
                updateTable();
                formRef.current?.reset();
            }, "producto"
        )
    }

    const updateTable = async () => {
        await getAllFetchDataValues(`${process.env.NEXT_PUBLIC_BACK_URL}products`)
            .then((rec) => {
                // @ts-ignore
                setDataProductList(rec)
            })
    }

    useEffect(() => { updateTable(); }, [])
    useEffect(() => {
        if (viewAddProduct[1] == "edit" && viewAddProduct != null) {
            input_nombre.current && (input_nombre.current.value = clickInProduct?.productName || "");
            input_descripcion.current && (input_descripcion.current.value = clickInProduct?.productDescription.toString() || "");
            input_precio.current && (input_precio.current.value = clickInProduct?.productPrice.toString() || "");
            input_productIsSold.current && (input_productIsSold.current.checked = clickInProduct?.productIsSold || false);
        }
    }, [viewAddProduct])


    const removeProductHandle = async () => {
        await deleteRemoveData(`${process.env.NEXT_PUBLIC_BACK_URL}products/delete/${clickInProduct?._id}`,
            () => {
                setviewAddProduct([false, 'insert']);
                updateTable();
                formRef.current?.reset();
            }, "producto", `Quieres eliminar \nNombre: ${clickInProduct?.productName} \nDescripción: ${clickInProduct?.productDescription}`)
    }

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

                    <button onClick={removeProductHandle} className={`${clickInProduct === null ? "hidden" : "visible"} bg-[#ececec] text-black px-2 py-2 mb-2 rounded-[50px] h-14 w-52 flex items-center justify-between font-bold`}>
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

            <div className="max-h-[100vh] h-full pt-14 flex flex-col overflow-y-auto p-5 relative">
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
                <div className={`bg-[#1d1b1b6e] absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center ${viewAddProduct[0] ? 'visible' : 'hidden'}`}>
                    <form ref={formRef} onSubmit={onHandleform_addorEditProduct} action="" className="relative bg-slate-50 flex p-20 flex-col rounded-xl ">
                        <div className="w-full flex absolute justify-center top-[0] -translate-y-[50%] left-0 right-0 ">
                            <div className={`${viewAddProduct[1] == 'insert' ? "bg-teal-300" : "bg-sky-400"} w-20 h-20 flex rounded-full items-center justify-center shadow-lg shadow-emerald-800`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M4 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0m10 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2zM4.862 4.276 3.906 6.19a.51.51 0 0 0 .497.731c.91-.073 2.35-.17 3.597-.17s2.688.097 3.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 10.691 4H5.309a.5.5 0 0 0-.447.276" />
                                    <path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679q.05.242.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.8.8 0 0 0 .381-.404l.792-1.848ZM4.82 3a1.5 1.5 0 0 0-1.379.91l-.792 1.847a1.8 1.8 0 0 1-.853.904.8.8 0 0 0-.43.564L1.03 8.904a1.5 1.5 0 0 0-.03.294v.413c0 .796.62 1.448 1.408 1.484 1.555.07 3.786.155 5.592.155s4.037-.084 5.592-.155A1.48 1.48 0 0 0 15 9.611v-.413q0-.148-.03-.294l-.335-1.68a.8.8 0 0 0-.43-.563 1.8 1.8 0 0 1-.853-.904l-.792-1.848A1.5 1.5 0 0 0 11.18 3z" />
                                </svg>
                            </div>
                        </div>
                        <h1 className="text-slate-900 font-semibold text-xl text-center">{viewAddProduct[1] == "insert" ? "Insertar" : "Editar"} vehículo</h1>
                        <div className="flex flex-col gap-3 mb-16">
                            <div >
                                <label htmlFor="">Nombre:</label>
                                <div className="ms-2 border-[1px] border-gray-500 flex flex-row overflow-hidden rounded-md">
                                    <div className="bg-slate-200 flex items-center justify-center color-slate-500 p-2 border-r-2 border-gray-500">
                                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L7 13.101l-4.223 2.815A.5.5 0 0 1 2 15.5z" />
                                            <path d="M4.268 1A2 2 0 0 1 6 0h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L13 13.768V2a1 1 0 0 0-1-1z" />
                                        </svg>
                                    </div>
                                    <input type="text" ref={input_nombre} className="flex w-full h-auto px-3" />
                                </div>
                            </div>
                            <div >
                                <label htmlFor="">Descripción:</label>
                                <div className="ms-2 border-[1px] border-gray-500 flex flex-row overflow-hidden rounded-md">
                                    <div className="bg-slate-200 flex items-center justify-center color-slate-500 p-2 border-r-2 border-gray-500">
                                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L7 13.101l-4.223 2.815A.5.5 0 0 1 2 15.5z" />
                                            <path d="M4.268 1A2 2 0 0 1 6 0h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L13 13.768V2a1 1 0 0 0-1-1z" />
                                        </svg>
                                    </div>
                                    <input type="text" ref={input_descripcion} className="flex w-full h-auto px-3" />
                                </div>
                            </div>
                            <div >
                                <label htmlFor="">Precio:</label>
                                <div className="ms-2 border-[1px] border-gray-500 flex flex-row overflow-hidden rounded-md">
                                    <div className="bg-slate-200 flex items-center justify-center color-slate-500 p-2 border-r-2 border-gray-500">

                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M2.873 11.297V4.142H1.699L0 5.379v1.137l1.64-1.18h.06v5.961zm3.213-5.09v-.063c0-.618.44-1.169 1.196-1.169.676 0 1.174.44 1.174 1.106 0 .624-.42 1.101-.807 1.526L4.99 10.553v.744h4.78v-.99H6.643v-.069L8.41 8.252c.65-.724 1.237-1.332 1.237-2.27C9.646 4.849 8.723 4 7.308 4c-1.573 0-2.36 1.064-2.36 2.15v.057zm6.559 1.883h.786c.823 0 1.374.481 1.379 1.179.01.707-.55 1.216-1.421 1.21-.77-.005-1.326-.419-1.379-.953h-1.095c.042 1.053.938 1.918 2.464 1.918 1.478 0 2.642-.839 2.62-2.144-.02-1.143-.922-1.651-1.551-1.714v-.063c.535-.09 1.347-.66 1.326-1.678-.026-1.053-.933-1.855-2.359-1.845-1.5.005-2.317.88-2.348 1.898h1.116c.032-.498.498-.944 1.206-.944.703 0 1.206.435 1.206 1.07.005.64-.504 1.106-1.2 1.106h-.75z" />
                                        </svg>
                                    </div>
                                    <input type="number" ref={input_precio} className="flex w-full h-auto px-3" />
                                </div>
                            </div>
                            <div >
                                <label htmlFor="">Vendido:</label>
                                <div className="ms-2 border-[1px] border-gray-500 flex flex-row overflow-hidden rounded-md">
                                    <div className="bg-slate-200 flex items-center justify-center color-slate-500 p-2 border-r-2 border-gray-500">

                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M2.873 11.297V4.142H1.699L0 5.379v1.137l1.64-1.18h.06v5.961zm3.213-5.09v-.063c0-.618.44-1.169 1.196-1.169.676 0 1.174.44 1.174 1.106 0 .624-.42 1.101-.807 1.526L4.99 10.553v.744h4.78v-.99H6.643v-.069L8.41 8.252c.65-.724 1.237-1.332 1.237-2.27C9.646 4.849 8.723 4 7.308 4c-1.573 0-2.36 1.064-2.36 2.15v.057zm6.559 1.883h.786c.823 0 1.374.481 1.379 1.179.01.707-.55 1.216-1.421 1.21-.77-.005-1.326-.419-1.379-.953h-1.095c.042 1.053.938 1.918 2.464 1.918 1.478 0 2.642-.839 2.62-2.144-.02-1.143-.922-1.651-1.551-1.714v-.063c.535-.09 1.347-.66 1.326-1.678-.026-1.053-.933-1.855-2.359-1.845-1.5.005-2.317.88-2.348 1.898h1.116c.032-.498.498-.944 1.206-.944.703 0 1.206.435 1.206 1.07.005.64-.504 1.106-1.2 1.106h-.75z" />
                                        </svg>
                                    </div>
                                    <input type="checkbox" ref={input_productIsSold} className="flex w-full h-auto px-3" />
                                </div>
                            </div>

                        </div>
                        <div className="flex justify-between w-full gap-8">
                            <button type="submit" className="bg-blue-500 text-slate-50 px-6 py-2 rounded-full hover:scale-[1.1]">Guardar</button>
                            <button type="reset" onClick={() => setviewAddProduct([false, 'insert'])} className="bg-red-500 text-slate-50 px-6 py-2 rounded-full hover:scale-[1.1]">Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>

        </>

    )
}