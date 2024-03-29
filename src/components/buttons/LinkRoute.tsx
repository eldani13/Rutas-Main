import { MessageEmployees } from "@/types/employees";
import { MessageRoute } from "@/types/routes";
import { MessageVehicle } from "@/types/vehicles";
import Link from "next/link";

export default function LinkRoute({
  routeCurrent,
  employees,
  vehicles,
}: {
  routeCurrent: MessageRoute | null;
  employees: MessageEmployees[] | null;
  vehicles: MessageVehicle[] | null;
}) {
  return (
    routeCurrent &&
    employees &&
    vehicles && (
      <Link
        href={`/Inicio/routes/${routeCurrent._id}`}
        className="group cursor-pointer flex gap-5 justify-between items-center md:gap-x-10 px-5  py-2 hover:bg-gray-100 rounded-full w-full lg:w-auto"
      >
        <div className="flex justify-start gap-5 md:gap-3">
          <div className="flex bg-[#ccc] h-14 min-w-14 md:min-h-20 md:min-w-20 rounded-full items-center justify-center">
            <svg
              className=" overflow-visible w-full h-8 md:w-11 md:h-11 flex items-center justify-center "
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
            </svg>
          </div>
          <div className="text-[#000] flex flex-col gap-1 min-w-full sm:min-w-60">
            {(() => {
              const empl = employees.find(
                (u) => u._id === routeCurrent.empleado
              );

              return (
                <>
                  <span className="font-bold text-xl lg:text-2xl">
                    {empl?.username}
                  </span>

                  <p className="text-[#bbbcbc] text-xs lg:text-base">
                    {(() => {
                      const veh = vehicles.find(
                        (u) => u._id === routeCurrent.vehicle
                      );
                      return veh?.marca + " - " + veh?.modelo;
                    })()}
                  </p>
                  <span className="text-[#bbbcbc] text-xs lg:text-sm text-right">
                    {empl?.user} {empl?.lastnames}
                  </span>
                </>
              );
            })()}
          </div>
        </div>
        <svg
          className="group-hover:animate-bounce "
          xmlns="http://www.w3.org/2000/svg"
          width="35"
          height="35"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </Link>
    )
  );
}
