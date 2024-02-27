import { MessageEmployees } from "@/types/employees"
import { ReactNode } from "react"

interface ButtonCrudInterfaz{
    onclickHandle: ()=>void,
    text: String,
    children: ReactNode,
    color: String,
    isHidden: boolean
}

export function ButtonCrud({onclickHandle,text ,children, color, isHidden = false}:ButtonCrudInterfaz) {
    return (
        <button onClick={onclickHandle} className={`${isHidden ? "hidden" : "visible"} group bg-[#ececec] text-black px-2 rounded-full min-h-14 w-fit md:min-w-52  flex items-center gap-10 justify-start font-bold`}>
            <div className={`rounded-full p-2 ${color} group-hover:animate-bounce`}>
                {children}
            </div>
            <span className="hidden md:visible md:flex">{text}</span>
        </button>
    )
}