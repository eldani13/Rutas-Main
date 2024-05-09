"use client";

import StoreForm from "@/components/forms/StoreForm";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Utils({ params }: any) {
    console.log(params);
    interface StoreData {
        _id: string;
        nombre: string;
        coordinador: string;
        direccion: string;
        coordenadas: {
            x: number;
            y: number;
        };
        productos: {
            product: string;
            price: number;
            _id: string;
        }[];
        __v: number;
    }

    const [viewForm, setViewForm] = useState(false);
    const [store, setStore] = useState<StoreData[]>([]);

    const renderStores = async () => {
        try {
            const API_URL = "http://localhost:5000/api/v1/tiendas";
            const response = await fetch(API_URL, {
                method: "GET",
            });

            if (!response.ok)
                throw new Error("No se pudo obtener la respuesta de la API");

            const data = (await response.json()) as StoreData[];

            // @ts-ignore
            setStore(data.message);
        } catch (error) {
            console.error("Error al obtener los datos de la API:", error);
        }
    };

    useEffect(() => {
        renderStores();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        console.log(store);
    }, [store]);

    return (
        <>
            <span></span>
            <div className="flex items-center justify-center gap-5 p-5 flex-wrap relative h-full">
                {store.map((storeItem) => (
                    <Link key={storeItem._id} href={`utils/${storeItem._id}`}>
                        <div
                            key={storeItem._id}
                            className="grid grid-cols-[auto_1fr] rounded-md shadow shadow-slate-800/30 p-3 gap-2 bg-white
              hover:bg-slate-100 duration-100 cursor-pointer"
                        >
                            <div className="flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    className="w-14 h-14"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M4 6V4h16v2zm0 14v-6H3v-2l1-5h16l1 5v2h-1v6h-2v-6h-4v6zm2-2h6v-4H6z"
                                    />
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-base font-semibold text-center">
                                    {storeItem.nombre}
                                </h1>
                                <h2 className="text-sm text-slate-700">
                                    Coordinador: {storeItem.coordinador}
                                </h2>
                                <h2 className="text-xs text-right mt-2">
                                    {storeItem.direccion}
                                </h2>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <button
                className="absolute z-10 right-5 bottom-5 hover:scale-105"
                onClick={() => setViewForm(true)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                    className="w-14"
                >
                    <path
                        fill="currentColor"
                        d="M208 32H48a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16m-24 104h-48v48a8 8 0 0 1-16 0v-48H72a8 8 0 0 1 0-16h48V72a8 8 0 0 1 16 0v48h48a8 8 0 0 1 0 16"
                    />
                </svg>
            </button>

            {/* Form Store*/}
            <StoreForm view={viewForm} setReturnView={setViewForm} />
        </>
    );
}
