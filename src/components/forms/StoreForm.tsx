import { MessageStores } from "@/types/stores";
import { patchEditVal, postInsertData } from "@/utils/api";
import { processEnv } from "@/utils/cookies";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";

export default function StoreForm({
  view = false,
  setReturnView = null,
  handleSuccesForm,
  type = "Agregar",
  dataFormCurrentParam,
}: {
  view?: boolean;
  setReturnView?: Dispatch<SetStateAction<boolean>> | null;
  handleSuccesForm?: () => void;
  dataFormCurrentParam?: MessageStores | null;
  type?: "Agregar" | "Editar";
}) {
  const [dataFormCurrent, setDataFormCurrent] = useState({
    name: "",
    coordinator: "",
    address: "",
    coordinates: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSendForm = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (type === "Agregar") {
      await addStore();
    } else {
      await editStore();
    }
    setIsLoading(false);
  };

  const addStore = async () => {
    try {
      const coord = (dataFormCurrent.coordinates as string)
        .split(",")
        .map(Number);
      await postInsertData(
        `${processEnv.back}tienda/new`,
        {
          nombre: dataFormCurrent.name,
          coordinador: dataFormCurrent.coordinator,
          direccion: dataFormCurrent.address,
          coordenadas: {
            x: coord[0],
            y: coord[1],
          },
        },
        () => {
          setDataFormCurrent({
            name: "",
            coordinator: "",
            address: "",
            coordinates: "",
          });
          if (handleSuccesForm) {
            handleSuccesForm();
          }
        },
        "tienda"
      );
    } catch {
      alert("Upps, ocurrió un error");
    }
  };
  const editStore = async () => {
    try {
      const coord = (dataFormCurrent.coordinates as string)
        .split(",")
        .map(Number);
      await patchEditVal(
        `${processEnv.back}tienda/edit/${dataFormCurrentParam?._id}`,
        {
          nombre: dataFormCurrent.name,
          coordinador: dataFormCurrent.coordinator,
          direccion: dataFormCurrent.address,
          coordenadas: {
            x: coord[0],
            y: coord[1],
          },
        },
        () => {
          if (handleSuccesForm) {
            handleSuccesForm();
          }
        },
        "tienda"
      );
    } catch {
      alert("Upps, ocurrió un error");
    }
  };

  useEffect(() => {
    console.log(dataFormCurrentParam);
    if (!dataFormCurrentParam) return;

    setDataFormCurrent({
      name: dataFormCurrentParam.nombre,
      address: dataFormCurrentParam.direccion,
      coordinates: `${dataFormCurrentParam.coordenadas.x},${dataFormCurrentParam.coordenadas.y}`,
      coordinator: dataFormCurrentParam.coordinador,
    });
  }, [dataFormCurrentParam]);

  return (
    <div
      className={`${
        view ? "flex" : "hidden"
      } h-full w-full absolute z-20 bg-white/80  items-center justify-center`}
    >
      <form onSubmit={handleSendForm} className="max-w-sm w-full">
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
            onChange={(e) =>
              setDataFormCurrent((prev) => ({ ...prev, name: e.target.value }))
            }
            value={dataFormCurrent.name}
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
            onChange={(e) =>
              setDataFormCurrent((prev) => ({
                ...prev,
                coordinator: e.target.value,
              }))
            }
            value={dataFormCurrent.coordinator}
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
            onChange={(e) =>
              setDataFormCurrent((prev) => ({
                ...prev,
                address: e.target.value,
              }))
            }
            value={dataFormCurrent.address}
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
            onChange={(e) =>
              setDataFormCurrent((prev) => ({
                ...prev,
                coordinates: e.target.value,
              }))
            }
            value={dataFormCurrent.coordinates}
          />
        </div>
        <div className="flex justify-center gap-10 pt-10">
          {!isLoading ? (
            <>
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
                {type}
              </button>
            </>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="5em"
              height="5em"
              className="m-auto text-blue-600"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z"
                opacity="0.5"
              />
              <path
                fill="currentColor"
                d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"
              >
                <animateTransform
                  attributeName="transform"
                  dur="1s"
                  from="0 12 12"
                  repeatCount="indefinite"
                  to="360 12 12"
                  type="rotate"
                />
              </path>
            </svg>
          )}
        </div>
      </form>
    </div>
  );
}
