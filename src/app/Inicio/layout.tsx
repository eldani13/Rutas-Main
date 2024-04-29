"use client";
import { deleteCookie, getCookie, processEnv } from "@/utils/cookies";
import { Inter } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import hugging from "../../../public/hugging_face.svg";
import jwt from "jsonwebtoken";

const inter = Inter({ subsets: ["latin"] });

interface PathInterface { }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathNameActual = usePathname();
  const [roleUser, setRoleUser] = useState<string | null>(null);

  const getUserType = async () => {
    const ck = await getCookie(processEnv.jtIdentity);
    // @ts-ignore
    const { role } = jwt.decode(ck) as {
      username: string;
      role: string;
      exp: number;
      iat: number;
    } | null;
    setRoleUser(role || null);
  };

  useEffect(() => {
    getUserType();
  }, []);

  const styleselectbuttom = {
    display: "flex",
    width: "47px",
    height: "48px",
    padding: "9px 8px 9px 9px",
    flexShrink: "0",
    borderRadius: "5px",
    background: "#acacac",
  };

  const pathNameSpliteado = () => {
    //@ts-ignore
    const splitPath = pathNameActual.split("/");
    return `/${splitPath[1]}${splitPath[2] ? `/${splitPath[2]}` : ""}`;
  };
  const pathBusqueda = pathNameSpliteado();
  const sectionactual = [
    "/Inicio",
    "/Inicio/routes",
    "/Inicio/employees",
    "/Inicio/vehicle",
    "/Inicio/store",
    "/Inicio/product",
    "/Inicio/request",
    "/Inicio/prequest",
    // "/Inicio/sales",
  ].indexOf(pathBusqueda);

  const handleSessionClose = () => {
    deleteCookie(processEnv.jtIdentity);
    window.location.href = "/";
  };
  // useEffect(() => {
  //   getCookie(processEnv.name)
  //     .catch(() => {
  //       window.location.href = '/';
  //     })
  // }, [])

  return (
    roleUser && (
      <div
        className={`${inter.className} grid min-h-screen items-center justify-between text-[#000] `}
        style={{ gridTemplateColumns: "auto auto 1fr" }}
      >
        <div className="bg-[#bbbcbc] flex flex-col items-center pt-16 space-y-14 h-screen w-fit px-4">
          {/* Home */}

          <Link href="/Inicio">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30"
                width="30"
                viewBox="0 0 576 512"
                style={sectionactual === 0 ? styleselectbuttom : {}}
              >
                <path
                  d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"
                  fill={sectionactual === 0 ? "#000" : "#9c9c9c"}
                />
              </svg>
            </div>
          </Link>

          {/* Rutas */}
          <Link href="/Inicio/routes">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30"
                width="30"
                viewBox="0 0 576 512"
                style={sectionactual === 1 ? styleselectbuttom : {}}
              >
                <path
                  d="M408 120c0 54.6-73.1 151.9-105.2 192c-7.7 9.6-22 9.6-29.6 0C241.1 271.9 168 174.6 168 120C168 53.7 221.7 0 288 0s120 53.7 120 120zm8 80.4c3.5-6.9 6.7-13.8 9.6-20.6c.5-1.2 1-2.5 1.5-3.7l116-46.4C558.9 123.4 576 135 576 152V422.8c0 9.8-6 18.6-15.1 22.3L416 503V200.4zM137.6 138.3c2.4 14.1 7.2 28.3 12.8 41.5c2.9 6.8 6.1 13.7 9.6 20.6V451.8L32.9 502.7C17.1 509 0 497.4 0 480.4V209.6c0-9.8 6-18.6 15.1-22.3l122.6-49zM327.8 332c13.9-17.4 35.7-45.7 56.2-77V504.3L192 449.4V255c20.5 31.3 42.3 59.6 56.2 77c20.5 25.6 59.1 25.6 79.6 0zM288 152a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"
                  fill={sectionactual === 1 ? "#000" : "#9c9c9c"}
                />
              </svg>
            </div>
          </Link>

          {/* Empleados */}
          {roleUser === "administrador" && (
            <Link href="/Inicio/employees">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="30"
                  width="30"
                  viewBox="0 0 640 512"
                  style={sectionactual === 2 ? styleselectbuttom : {}}
                >
                  <path
                    d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"
                    fill={sectionactual === 2 ? "#000" : "#9c9c9c"}
                  />
                </svg>
              </div>
            </Link>
          )}

          {/* Unidades/Vehículos */}
          {roleUser === "administrador" && (
            <Link href="/Inicio/vehicle">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="30"
                  width="30"
                  viewBox="0 0 640 512"
                  style={sectionactual === 3 ? styleselectbuttom : {}}
                >
                  <path
                    d="M48 0C21.5 0 0 21.5 0 48V368c0 26.5 21.5 48 48 48H64c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V288 256 237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H48zM416 160h50.7L544 237.3V256H416V160zM112 416a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm368-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
                    fill={sectionactual === 3 ? "#000" : "#9c9c9c"}
                  />
                </svg>
              </div>
            </Link>
          )}

          {/* Sistema de Corte */}
          {roleUser === "administrador" && (
            <Link href="/Inicio/store">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  style={sectionactual === 4 ? styleselectbuttom : {}}
                >
                  <path
                    d="M4 6V4h16v2zm0 14v-6H3v-2l1-5h16l1 5v2h-1v6h-2v-6h-4v6zm2-2h6v-4H6z"
                    fill={sectionactual === 4 ? "#000" : "#9c9c9c"}
                  />
                </svg>
              </div>
            </Link>
          )}

          {/* Productos */}
          {roleUser === "administrador" && (
            <Link href="/Inicio/product">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 16 16"
                  fill="none"
                  style={sectionactual === 5 ? styleselectbuttom : {}}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.5285 2.97293C15.8133 3.08683 16 3.36261 16 3.66929V12.3308C16 12.6374 15.8133 12.9132 15.5285 13.0271L8.27854 15.9271C8.09974 15.9987 7.90026 15.9987 7.72146 15.9271L0.471457 13.0271C0.186713 12.9132 0 12.6374 0 12.3308V3.66929C0 3.36261 0.186713 3.08683 0.471457 2.97293L7.44291 0.18434L7.44691 0.18275L7.72146 0.0729296C7.90026 0.00140642 8.09974 0.00140615 8.27854 0.0729295L8.55315 0.182774L8.55709 0.18434L15.5285 2.97293ZM14.1537 3.50003L8 5.96151L1.84629 3.50003L1 3.83855V4.23855L7.5 6.83854V14.7615L8 14.9615L8.5 14.7615V6.83854L15 4.23854V3.83855L14.1537 3.50003Z"
                    fill={sectionactual === 5 ? "#000" : "#9c9c9c"}
                  />
                </svg>
              </div>
            </Link>
          )}

          {roleUser === "empleado" && (
            <Link href="/Inicio/request">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`text-[${sectionactual === 6 ? "#000" : "#9c9c9c"
                    }]`}
                  style={sectionactual === 6 ? styleselectbuttom : {}}
                  width="30"
                  height="30"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <g
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  >
                    <circle cx="12.5" cy="12.5" r="1.75" />
                    <circle cx="3.5" cy="12.5" r="1.75" />
                    <circle cx="3.5" cy="3.5" r="1.75" />
                    <path d="m9.25 1.75l-1.5 2l1.5 2m3 4.5v-5c0-1-.5-1.5-1.5-1.5h-2m-5 2v4.5" />
                  </g>
                </svg>
              </div>
            </Link>
          )}
          {roleUser === "administrador" && (
            <Link href="/Inicio/prequest">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`text-[${sectionactual === 7 ? "#000" : "#9c9c9c"
                    }]`}
                  style={sectionactual === 7 ? styleselectbuttom : {}}
                  width="30"
                  height="30"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <g
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  >
                    <circle cx="12.5" cy="12.5" r="1.75" />
                    <circle cx="3.5" cy="12.5" r="1.75" />
                    <circle cx="3.5" cy="3.5" r="1.75" />
                    <path d="m9.25 1.75l-1.5 2l1.5 2m3 4.5v-5c0-1-.5-1.5-1.5-1.5h-2m-5 2v4.5" />
                  </g>
                </svg>
              </div>
            </Link>
          )}

          {/* creditos */}

          {roleUser === "administrador" && (
            <Link href="/Inicio/creditos">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  style={sectionactual === 7 ? styleselectbuttom : {}}
                >
                  <path
                    fill={sectionactual === 7 ? "#000" : "#9c9c9c"}
                    fill-rule="evenodd"
                    d="M9.592 3.2a5.574 5.574 0 0 1-.495.399c-.298.2-.633.338-.985.408c-.153.03-.313.043-.632.068c-.801.064-1.202.096-1.536.214a2.713 2.713 0 0 0-1.655 1.655c-.118.334-.15.735-.214 1.536a5.707 5.707 0 0 1-.068.632c-.07.352-.208.687-.408.985c-.087.13-.191.252-.399.495c-.521.612-.782.918-.935 1.238c-.353.74-.353 1.6 0 2.34c.153.32.414.626.935 1.238c.208.243.312.365.399.495c.2.298.338.633.408.985c.03.153.043.313.068.632c.064.801.096 1.202.214 1.536a2.713 2.713 0 0 0 1.655 1.655c.334.118.735.15 1.536.214c.319.025.479.038.632.068c.352.07.687.209.985.408c.13.087.252.191.495.399c.612.521.918.782 1.238.935c.74.353 1.6.353 2.34 0c.32-.153.626-.414 1.238-.935c.243-.208.365-.312.495-.399c.298-.2.633-.338.985-.408c.153-.03.313-.043.632-.068c.801-.064 1.202-.096 1.536-.214a2.713 2.713 0 0 0 1.655-1.655c.118-.334.15-.735.214-1.536c.025-.319.038-.479.068-.632c.07-.352.209-.687.408-.985c.087-.13.191-.252.399-.495c.521-.612.782-.918.935-1.238c.353-.74.353-1.6 0-2.34c-.153-.32-.414-.626-.935-1.238a5.574 5.574 0 0 1-.399-.495a2.713 2.713 0 0 1-.408-.985a5.72 5.72 0 0 1-.068-.632c-.064-.801-.096-1.202-.214-1.536a2.713 2.713 0 0 0-1.655-1.655c-.334-.118-.735-.15-1.536-.214a5.707 5.707 0 0 1-.632-.068a2.713 2.713 0 0 1-.985-.408a5.73 5.73 0 0 1-.495-.399c-.612-.521-.918-.782-1.238-.935a2.713 2.713 0 0 0-2.34 0c-.32.153-.626.414-1.238.935m6.239 4.97a.814.814 0 0 1 0 1.15L9.32 15.832a.814.814 0 1 1-1.15-1.15l6.51-6.511a.814.814 0 0 1 1.15 0m-.033 6.543a1.085 1.085 0 1 1-2.17 0a1.085 1.085 0 0 1 2.17 0m-6.51-4.34a1.085 1.085 0 1 0 0-2.17a1.085 1.085 0 0 0 0 2.17"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </Link>
          )}

          <div className="cursor-pointer" onClick={handleSessionClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30"
              width="30"
              fill="none"
              viewBox="0 0 512 512"
            >
              <path
                d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
                fill={"#9c9c9c"}
              />
            </svg>
          </div>
        </div>
        {children}
      </div>
    )
  );
}
