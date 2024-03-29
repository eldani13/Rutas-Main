import { Dispatch, SetStateAction } from "react";

export default function StoreForm({
  view = false,
  setReturnView = null,
}: {
  view?: boolean;
  setReturnView?: Dispatch<SetStateAction<boolean>> | null;
}) {
  return (
    <div
      className={`${
        view ? "flex" : "hidden"
      } h-full w-full absolute z-20 bg-white/80  items-center justify-center`}
    >
      <form action="" className="max-w-sm w-full">
        <div className="flex justify-center mb-3">
          <div className="p-3 bg-slate-200 rounded-full ">
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
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Nombre de la tienda
          </label>
          <input
            type="text"
            id="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Slate"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Coordinador o dueño
          </label>
          <input
            type="text"
            id="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Hir..."
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Dirección
          </label>
          <input
            type="text"
            id="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Jr. al..."
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Coordenadas
          </label>
          <input
            type="text"
            id="text"
            name="routeStart"
            pattern="-?\d+(\.\d+)?,\s?-?\d+(\.\d+)?"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Jr. al..."
          />
        </div>
        <div className="flex justify-center gap-10 pt-10">
          <button
            onClick={() => setReturnView && setReturnView(false)}
            type="button"
            className={`text-white px-5 py-2.5 text-center rounded-lg text-sm w-full sm:w-auto focus:ring-4 focus:outline-none focus:ring-blue-300 bg-red-400 hover:bg-red-700`}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className={`text-white px-5 py-2.5 text-center rounded-lg text-sm w-full sm:w-auto focus:ring-4 focus:outline-none focus:ring-blue-300 bg-blue-700 hover:bg-blue-800`}
          >
            Actualizar
          </button>
        </div>
      </form>
    </div>
  );
}
