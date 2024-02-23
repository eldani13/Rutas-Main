import Image from "next/image";
import React from "react";

export default function Error404() {

    return (
        <div className="w-full h-[100vh] flex flex-col items-center justify-center">
            <div className="flex flex-col gap-5 h-full justify-center">
                <Image src="./imgs/vooper-cat.png" className="h-[60%]" alt="" />
                <p className="text-center text-gray-900 text-2xl font-bold">Página no encontrada</p>
            </div>
            <div className="bg-slate-200 text-gray-700 text-lg font-semibold  flex py-5 absolute bottom-0 left-0 right-0 items-center justify-center">
                <p >&#169;Vooper 2024</p>
            </div>
        </div>
    );
}