"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MessageRoute } from "@/types/routes";
import { MessageEmployees } from "@/types/employees";
import { ButtonCrud } from "@/components/buttons/ButtonCrud";
import { processEnv } from "@/utils/cookies";

// @ts-ignore
export default function Route({ params }) {
    const { usernameId } = params;
    console.log(usernameId);

    const [esEmpleado, setEsEmpleado] = useState(true);
    const [modifyRoute, setModifyRoute] = useState<{
        state: boolean;
        route: MessageRoute | null;
    }>({
        state: false,
        route: null,
    });

    const [employeCurrent, setEmployeCurrent] = useState<null | MessageEmployees>(
        null
    );

    const infoUser = async () => {
        const api = await fetch(`${processEnv.back}employee/${usernameId}`, {
            method: "GET",
        });

        const username = await api.json();
        setEmployeCurrent(username);
    };

    useEffect(() => {
        infoUser();
    }, [usernameId]);

    useEffect(() => {
        console.log(employeCurrent);

        console.log(
            `current employee ${employeCurrent?.username} ${employeCurrent?.lastnames}`
        );
    }, [employeCurrent]);

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            <div
                className={` ${menuOpen ? "sm:ml-0" : "hidden"
                    } hidden xl:flex flex-col items-start border-r-2 border-[#bbbcbc] pt-14 ml:px-4 h-[100%] justify-between  overflow-hidden max-h-[100vh] p-4`}
            >
                <div className="hidden  xl:flex flex-col items-start justify-center">
                    <h1 className="text-[#000] text-2xl font-bold mb-1">
                        Sistema de corte
                    </h1>
                    <div className="grid grid-cols-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="30"
                            width="30"
                            viewBox="0 0 384 512"
                            transform="rotate(90)"
                        >
                            <path d="M32 448c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c53 0 96-43 96-96l0-306.7 73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 109.3 160 416c0 17.7-14.3 32-32 32l-96 0z" />
                        </svg>
                        <span className="mr-[-40px]">Ruta {employeCurrent?.lastnames}</span>
                    </div>

                    <div className="flex items-center justify-center bg-[#ccc] h-32 w-32 rounded-full m-auto mt-6">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="75"
                            width="75"
                            viewBox="0 0 448 512"
                        >
                            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                        </svg>
                    </div>

                    <div className="grid grid-rows-3 gap-3 m-auto mt-6">
                        <div>
                            <span style={{ color: "#5e5e5e", fontWeight: "900" }}>
                                Empleado:
                            </span>
                            <p style={{ color: "#828282" }}>{employeCurrent?.username}</p>
                        </div>
                    </div>
                </div>

                {/* Botones */}
                <div className="z-20 absolute bottom-0 ms-3 ps-3 xl:ps-0 gap-3 xl:gap-0 xl:static pb-10 flex  xl:flex-col xl:space-y-5 items-center">
                    {!esEmpleado ? null : (
                        <ButtonCrud
                            isHidden={false}
                            text="Editar Ruta"
                            color="bg-[#ececec] text-blue-500"
                            onclickHandle={() =>
                                setModifyRoute((prev) => ({ ...prev, state: true }))
                            }
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="currentColor"
                                    d="m14.06 9.02l.92.92L5.92 19H5v-.92zM17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83l3.75 3.75l1.83-1.83a.996.996 0 0 0 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29m-3.6 3.19L3 17.25V21h3.75L17.81 9.94z"
                                />
                            </svg>
                        </ButtonCrud>
                    )}
                </div>
            </div>
            <div
                className="z-10 flex flex-col  justify-between px-3  max-h-[100vh] h-full overflow-y-auto"
                style={{ alignSelf: "flex-start" }}
            >
                <div className="">
                    <Link href="/Inicio/routes">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="my-3"
                            fill="#ccc"
                            height="20"
                            width="18"
                            viewBox="0 0 448 512"
                        >
                            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                        </svg>
                    </Link>

                    <hr className="mb-10 border-[1px]" />
                </div>
                {modifyRoute.route && (
                    <div
                        className={`bg-[#1d1b1b6e] z-20 absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center ${modifyRoute.state ? "visible" : "hidden"
                            }`}
                    ></div>
                )}
            </div>
        </>
    );
}
