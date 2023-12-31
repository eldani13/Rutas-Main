"use client"
import Link from "next/link";
import React, { useState } from "react"
// import Home from "./HomeSection";

interface RoutesName{
    name:String,
    description:String
} 

export default function Route() {


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
                
            </div>
        </>
    );
}
