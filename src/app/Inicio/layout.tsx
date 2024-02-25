"use client";
import { deleteCookie, getCookie, processEnv } from "@/utils/cookies";
import { Inter } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

interface PathInterface {}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathNameActual = usePathname();

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
    "/Inicio/court",
    "/Inicio/product",
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

        {/* Unidades/Vehículos */}
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

        {/* Sistema de Corte */}
        <Link href="/Inicio/court">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 16 16"
              fill="none"
              style={sectionactual === 4 ? styleselectbuttom : {}}
            >
              <path
                d="M7.9643 1.52734C4.98668 1.52734 2.39271 3.23104 1.64353 5.65234H1.09451C0.473712 5.65234 0.00292572 6.21207 0.109293 6.82368L0.363323 8.28436C0.488276 9.00284 1.11187 9.52734 1.84114 9.52734H2.10387C2.40323 10.0403 2.79178 10.5053 3.24942 10.9092L2.52039 13.3862C2.47589 13.5374 2.50527 13.7007 2.59968 13.8269C2.69408 13.953 2.84245 14.0273 3.00004 14.0273H5.00004C5.21145 14.0273 5.40001 13.8944 5.47101 13.6953L5.95286 12.3437C6.58751 12.5173 7.26366 12.6107 7.9643 12.6107C8.67078 12.6107 9.35235 12.5157 9.99159 12.3394L10.5352 13.7115C10.6107 13.9021 10.795 14.0273 11 14.0273H13C13.1584 14.0273 13.3074 13.9523 13.4017 13.8251C13.496 13.6979 13.5245 13.5335 13.4784 13.3819L12.7167 10.8757C13.8099 9.89461 14.5 8.55873 14.5 7.06901C14.5 6.92359 14.4935 6.77976 14.4809 6.63767C14.7414 6.52776 14.9878 6.37196 15.185 6.19376C15.5 6.5 16 6.5 16 5.77739C16 6 15.5 6 15.5388 5.75071C15.5804 5.66935 15.6117 5.58403 15.6284 5.49586C15.6718 5.267 15.6126 5.03653 15.4267 4.85061C15.21 4.63386 14.9287 4.63943 14.7201 4.75324C14.5236 4.86041 14.3693 5.07111 14.3449 5.31503C14.3207 5.55771 14.4273 5.79535 14.6651 5.96871C14.5841 6.02492 14.4968 6.07662 14.4064 6.1218C13.8723 3.45792 11.1223 1.52734 7.9643 1.52734ZM15.1371 5.40269C15.1259 5.462 15.0944 5.53377 15.0388 5.6132C15.023 5.60495 15.0083 5.59659 14.9947 5.58819C14.8494 5.49838 14.8376 5.41297 14.8425 5.36478C14.8493 5.29619 14.8982 5.22564 14.9595 5.19218C15.0087 5.16536 15.0399 5.17093 15.0732 5.20417C15.1373 5.26826 15.151 5.32947 15.1371 5.40269ZM6.13809 4.75355C5.87269 4.82982 5.59571 4.67649 5.51945 4.41109C5.44319 4.14568 5.59652 3.86871 5.86192 3.79245C6.52273 3.60257 7.23002 3.5 7.96425 3.5C8.72698 3.5 9.46065 3.61068 10.1433 3.81496C10.4079 3.89411 10.5582 4.17275 10.479 4.4373C10.3999 4.70186 10.1212 4.85215 9.85668 4.77299C9.26734 4.59665 8.63026 4.5 7.96425 4.5C7.32314 4.5 6.70882 4.58956 6.13809 4.75355ZM5 6.25C5 6.66421 4.66421 7 4.25 7C3.83579 7 3.5 6.66421 3.5 6.25C3.5 5.83579 3.83579 5.5 4.25 5.5C4.66421 5.5 5 5.83579 5 6.25Z"
                fill={sectionactual === 4 ? "#000" : "#9c9c9c"}
              />
            </svg>
          </div>
        </Link>

        {/* Productos */}
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
  );
}
