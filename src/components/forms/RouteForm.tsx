import { MessageEmployees, RootEmployees } from "@/types/employees";
import { MessageRoute } from "@/types/routes";
import { MessageStores, RootStores } from "@/types/stores";
import { MessageVehicle, RootVehicle } from "@/types/vehicles";
import { getAllFetchDataValues, postInsertData } from "@/utils/api";
import { processEnv } from "@/utils/cookies";
import { SyntheticEvent, useEffect, useState } from "react";

export default function RouteForm({
  viewForm,
  employees,
  vehicles,
  setViewForm,
  formSucces,
  stores,
}: {
  viewForm: boolean;
  setViewForm: React.Dispatch<React.SetStateAction<boolean>>;
  employees?: MessageEmployees[] | null;
  vehicles?: MessageVehicle[] | null;
  formSucces?: (() => void) | null;
  stores?: MessageStores[] | null;
}) {
  const [dataForm, setDataForm] = useState<null | MessageRoute>({
    _id: "",
    empleado: "",
    vehicle: "",
    tiendas: [],
    status: true,
    amountOfMerchandise: 0,
    LastMinuteSale: "",
    __v: 0,
  });
  const [allDataEmployees, setAllDataEmployees] = useState<
    null | MessageEmployees[]
  >(null);
  const [allDataVehicles, setAllDataVehicles] = useState<
    null | MessageVehicle[]
  >(null);
  const [allDataStores, setAllDataStores] = useState<null | MessageStores[]>(
    null
  );

  const onHandleform_EditRoute = async (e: SyntheticEvent) => {
    e.preventDefault;
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const employee = formData.get("employee") as string;
    const vehicle = formData.get("vehicle") as string;
    const start = (formData.get("routeStart") as string).split(",").map(Number);
    const end = (formData.get("routeEnd") as string).split(",").map(Number);
    const state = (formData.get("state") as string) === "a" ? true : false;
    // console.log(employee + vehicle + start + )

    await postInsertData(
      `${processEnv.back}rutas/new`,
      {
        empleado: employee,
        vehicle: vehicle,
        start: start,
        end: end,
        status: state,
        amountOfMerchandise: 0,
        LastMinuteSale: new Date().toISOString(),
      },
      () => {
        if (!formSucces) return;
        formSucces();
      },
      "ruta"
    );
  };

  const getAllEmployess = async () => {
    if (employees) {
      setAllDataEmployees(employees);
    } else {
      await getAllFetchDataValues(`${processEnv.back}employees`).then(
        (rec: RootEmployees) => {
          setAllDataEmployees(rec.message);
        }
      );
    }
  };
  const getAllVehicles = async () => {
    if (vehicles) {
      setAllDataVehicles(vehicles);
    } else {
      await getAllFetchDataValues(`${processEnv.back}cars-units`).then(
        (rec: RootVehicle) => {
          setAllDataVehicles(rec.message);
        }
      );
    }
  };
  const getAllStores = async () => {
    if (stores) {
      setAllDataStores(stores);
    } else {
      await getAllFetchDataValues(`${processEnv.back}tiendas`).then(
        (rec: RootStores) => {
          setAllDataStores(rec.message);
        }
      );
    }
  };

  const selectedStore = (value: string) => {
    setDataForm((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        tiendas: [...prev.tiendas, value],
      };
    });
  };

  useEffect(() => {
    getAllEmployess();
    getAllVehicles();
    getAllStores();
  }, []);

  console.log(dataForm);
  console.log(allDataStores);

  return (
    <div
      className={`bg-[#1d1b1b6e] absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center ${
        viewForm ? "visible" : "hidden"
      }`}
    >
      <form
        onSubmit={onHandleform_EditRoute}
        action=""
        className="relative bg-slate-50 flex p-20 flex-col rounded-xl"
      >
        <div className="w-full flex absolute justify-center top-[0] -translate-y-[50%] left-0 right-0 ">
          <div className="bg-sky-400 w-20 h-20 flex rounded-full items-center justify-center shadow-lg shadow-emerald-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M4 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0m10 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2zM4.862 4.276 3.906 6.19a.51.51 0 0 0 .497.731c.91-.073 2.35-.17 3.597-.17s2.688.097 3.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 10.691 4H5.309a.5.5 0 0 0-.447.276" />
              <path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679q.05.242.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.8.8 0 0 0 .381-.404l.792-1.848ZM4.82 3a1.5 1.5 0 0 0-1.379.91l-.792 1.847a1.8 1.8 0 0 1-.853.904.8.8 0 0 0-.43.564L1.03 8.904a1.5 1.5 0 0 0-.03.294v.413c0 .796.62 1.448 1.408 1.484 1.555.07 3.786.155 5.592.155s4.037-.084 5.592-.155A1.48 1.48 0 0 0 15 9.611v-.413q0-.148-.03-.294l-.335-1.68a.8.8 0 0 0-.43-.563 1.8 1.8 0 0 1-.853-.904l-.792-1.848A1.5 1.5 0 0 0 11.18 3z" />
            </svg>
          </div>
        </div>
        <h1 className="text-slate-900 font-semibold text-xl text-center">
          {/* {viewAddProduct[1] == "insert" ? "Insertar" : "Editar"}  */}
          Agregar Ruta
        </h1>
        <div className="flex flex-col gap-3 mb-16">
          <div>
            <label htmlFor="">Empleado</label>
            <div className="ms-2 border-[1px] border-gray-500 flex flex-row overflow-hidden rounded-md">
              <div className="bg-slate-200 flex items-center justify-center color-slate-500 p-2 border-r-2 border-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.873 11.297V4.142H1.699L0 5.379v1.137l1.64-1.18h.06v5.961zm3.213-5.09v-.063c0-.618.44-1.169 1.196-1.169.676 0 1.174.44 1.174 1.106 0 .624-.42 1.101-.807 1.526L4.99 10.553v.744h4.78v-.99H6.643v-.069L8.41 8.252c.65-.724 1.237-1.332 1.237-2.27C9.646 4.849 8.723 4 7.308 4c-1.573 0-2.36 1.064-2.36 2.15v.057zm6.559 1.883h.786c.823 0 1.374.481 1.379 1.179.01.707-.55 1.216-1.421 1.21-.77-.005-1.326-.419-1.379-.953h-1.095c.042 1.053.938 1.918 2.464 1.918 1.478 0 2.642-.839 2.62-2.144-.02-1.143-.922-1.651-1.551-1.714v-.063c.535-.09 1.347-.66 1.326-1.678-.026-1.053-.933-1.855-2.359-1.845-1.5.005-2.317.88-2.348 1.898h1.116c.032-.498.498-.944 1.206-.944.703 0 1.206.435 1.206 1.07.005.64-.504 1.106-1.2 1.106h-.75z" />
                </svg>
              </div>

              <select
                className="w-full"
                name="employee"
                onChange={(e) => {
                  setDataForm((prev) => {
                    if (!prev) return null;
                    return {
                      ...prev,
                      empleado: e.target.value,
                    };
                  });
                }}
                value={dataForm?.empleado}
              >
                {allDataEmployees &&
                  allDataEmployees.map((emp) => (
                    <option value={emp._id} key={"mapping-" + emp._id}>
                      Usuario: {emp.username} | Apellidos: {emp.lastnames}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="">Vehículo</label>
            <div className="ms-2 border-[1px] border-gray-500 flex flex-row overflow-hidden rounded-md">
              <div className="bg-slate-200 flex items-center justify-center color-slate-500 p-2 border-r-2 border-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.873 11.297V4.142H1.699L0 5.379v1.137l1.64-1.18h.06v5.961zm3.213-5.09v-.063c0-.618.44-1.169 1.196-1.169.676 0 1.174.44 1.174 1.106 0 .624-.42 1.101-.807 1.526L4.99 10.553v.744h4.78v-.99H6.643v-.069L8.41 8.252c.65-.724 1.237-1.332 1.237-2.27C9.646 4.849 8.723 4 7.308 4c-1.573 0-2.36 1.064-2.36 2.15v.057zm6.559 1.883h.786c.823 0 1.374.481 1.379 1.179.01.707-.55 1.216-1.421 1.21-.77-.005-1.326-.419-1.379-.953h-1.095c.042 1.053.938 1.918 2.464 1.918 1.478 0 2.642-.839 2.62-2.144-.02-1.143-.922-1.651-1.551-1.714v-.063c.535-.09 1.347-.66 1.326-1.678-.026-1.053-.933-1.855-2.359-1.845-1.5.005-2.317.88-2.348 1.898h1.116c.032-.498.498-.944 1.206-.944.703 0 1.206.435 1.206 1.07.005.64-.504 1.106-1.2 1.106h-.75z" />
                </svg>
              </div>

              <select
                className="w-full"
                name="vehicle"
                onChange={(e) => {
                  setDataForm((prev) => {
                    if (!prev) return null;
                    return {
                      ...prev,
                      vehicle: e.target.value,
                    };
                  });
                }}
                value={dataForm?.vehicle}
              >
                {allDataVehicles &&
                  allDataVehicles.map((veh) => (
                    <option value={veh._id} key={"mappOption2-" + veh._id}>
                      Marca:{veh.marca} | Modelo:{veh.modelo}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {allDataStores && (
            <>
              <div>
                <label htmlFor="">Tiendas</label>
                <div className="ms-2 border-[1px] border-gray-500 flex flex-row overflow-hidden rounded-md">
                  <div className="bg-slate-200 flex items-center justify-center color-slate-500 p-2 border-r-2 border-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.873 11.297V4.142H1.699L0 5.379v1.137l1.64-1.18h.06v5.961zm3.213-5.09v-.063c0-.618.44-1.169 1.196-1.169.676 0 1.174.44 1.174 1.106 0 .624-.42 1.101-.807 1.526L4.99 10.553v.744h4.78v-.99H6.643v-.069L8.41 8.252c.65-.724 1.237-1.332 1.237-2.27C9.646 4.849 8.723 4 7.308 4c-1.573 0-2.36 1.064-2.36 2.15v.057zm6.559 1.883h.786c.823 0 1.374.481 1.379 1.179.01.707-.55 1.216-1.421 1.21-.77-.005-1.326-.419-1.379-.953h-1.095c.042 1.053.938 1.918 2.464 1.918 1.478 0 2.642-.839 2.62-2.144-.02-1.143-.922-1.651-1.551-1.714v-.063c.535-.09 1.347-.66 1.326-1.678-.026-1.053-.933-1.855-2.359-1.845-1.5.005-2.317.88-2.348 1.898h1.116c.032-.498.498-.944 1.206-.944.703 0 1.206.435 1.206 1.07.005.64-.504 1.106-1.2 1.106h-.75z" />
                    </svg>
                  </div>

                  <select
                    className="w-full"
                    onChange={(e) => {
                      if (e.target.value === "-1") return;
                      else {
                        selectedStore(e.target.value);
                        e.target.selectedIndex = 0; // Restablecer select después de seleccionar tienda
                      }
                    }}
                    // value={dataForm?.vehicle}
                  >
                    <option value="-1">Seleccionar tienda</option>
                    {allDataStores &&
                      allDataStores.map((store) => (
                        <option
                          value={store._id}
                          key={"mappOption2-" + store._id}
                        >
                          Tienda:{store.nombre} | coordinador:
                          {store.coordinador}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="w-full max-h-52 overflow-auto flex flex-col ps-4">
                {dataForm &&
                  allDataStores &&
                  dataForm.tiendas.map((store) => (
                    <div className="flex items-center gap-3">
                      <button className="hover:scale-110">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1.2em"
                          height="1.2em"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="none"
                            stroke="#e60000"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 7h16M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3m-5 5l4 4m0-4l-4 4"
                          />
                        </svg>
                      </button>
                      <p>
                        Tienda:{" "}
                        {allDataStores.find((e) => e._id === store)?.nombre}
                      </p>
                      <span>|</span>
                      <p>
                        Coordinador:{" "}
                        {
                          allDataStores.find((e) => e._id === store)
                            ?.coordinador
                        }
                      </p>
                    </div>
                  ))}
              </div>
            </>
          )}

          {/* <div>
            <label htmlFor="">Inicio:</label>
            <div className="ms-2 border-[1px] border-gray-500 flex flex-row overflow-hidden rounded-md">
              <div className="bg-slate-200 flex items-center justify-center color-slate-500 p-2 border-r-2 border-gray-500">
                <svg
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L7 13.101l-4.223 2.815A.5.5 0 0 1 2 15.5z" />
                  <path d="M4.268 1A2 2 0 0 1 6 0h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L13 13.768V2a1 1 0 0 0-1-1z" />
                </svg>
              </div>
              <input
                type="text"
                className="flex w-full h-auto px-3"
                name="routeStart"
                pattern="-?\d+(\.\d+)?,\s?-?\d+(\.\d+)?"
              />
            </div>
          </div>
          <div>
            <label htmlFor="">Fin:</label>
            <div className="ms-2 border-[1px] border-gray-500 flex flex-row overflow-hidden rounded-md">
              <div className="bg-slate-200 flex items-center justify-center color-slate-500 p-2 border-r-2 border-gray-500">
                <svg
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L7 13.101l-4.223 2.815A.5.5 0 0 1 2 15.5z" />
                  <path d="M4.268 1A2 2 0 0 1 6 0h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L13 13.768V2a1 1 0 0 0-1-1z" />
                </svg>
              </div>
              <input
                type="text"
                className="flex w-full h-auto px-3"
                name="routeEnd"
                pattern="-?\d+(\.\d+)?,\s?-?\d+(\.\d+)?"
              />
            </div>
          </div> */}

          <div>
            <label htmlFor="">Estado:</label>
            <div className="ms-2 border-[1px] border-gray-500 flex flex-row overflow-hidden rounded-md">
              <div className="bg-slate-200 flex items-center justify-center color-slate-500 p-2 border-r-2 border-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.873 11.297V4.142H1.699L0 5.379v1.137l1.64-1.18h.06v5.961zm3.213-5.09v-.063c0-.618.44-1.169 1.196-1.169.676 0 1.174.44 1.174 1.106 0 .624-.42 1.101-.807 1.526L4.99 10.553v.744h4.78v-.99H6.643v-.069L8.41 8.252c.65-.724 1.237-1.332 1.237-2.27C9.646 4.849 8.723 4 7.308 4c-1.573 0-2.36 1.064-2.36 2.15v.057zm6.559 1.883h.786c.823 0 1.374.481 1.379 1.179.01.707-.55 1.216-1.421 1.21-.77-.005-1.326-.419-1.379-.953h-1.095c.042 1.053.938 1.918 2.464 1.918 1.478 0 2.642-.839 2.62-2.144-.02-1.143-.922-1.651-1.551-1.714v-.063c.535-.09 1.347-.66 1.326-1.678-.026-1.053-.933-1.855-2.359-1.845-1.5.005-2.317.88-2.348 1.898h1.116c.032-.498.498-.944 1.206-.944.703 0 1.206.435 1.206 1.07.005.64-.504 1.106-1.2 1.106h-.75z" />
                </svg>
              </div>

              <select
                className="w-full"
                name="state"
                onChange={(e) => {
                  setDataForm((prev) => {
                    if (!prev) return null;
                    return {
                      ...prev,
                      status: e.target.value === "a" ?? false,
                    };
                  });
                }}
                value={dataForm?.status ? "a" : "i"}
              >
                <option value="a">Activo</option>
                <option value="i">Inactivo</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex justify-between w-full gap-8">
          <button
            type="submit"
            className="bg-blue-500 text-slate-50 px-6 py-2 rounded-full hover:scale-[1.1]"
          >
            Guardar
          </button>
          <button
            type="reset"
            onClick={() => setViewForm(false)}
            className="bg-red-500 text-slate-50 px-6 py-2 rounded-full hover:scale-[1.1]"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
