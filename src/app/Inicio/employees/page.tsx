"use client";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";

interface Message {
  _id: string;
  user: string;
  username: string;
  lastnames: string;
  role: string;
  password: string;
  __v: number;
}

interface Root {
  message: Message[];
  details: boolean;
}

export default function Employees() {
  const [dataEmployees, setDataEmployees] = useState<null | Root>(null);

  const [datosNuevos, setDatosNuevos] = useState<Message[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [nuevoDato, setNuevoDato] = useState<Partial<Message>>({});

  // Agregar
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setNuevoDato({}); //
  };

  const agregarDato = () => {
    if (modoEdicion) {
      setDatosNuevos((prevDatos) =>
        prevDatos.map((dato) =>
          dato._id === usuarioEditando._id
            ? { ...dato, ...usuarioEditando }
            : dato
        )
      );
      setModoEdicion(false);
      setUsuarioEditando({});
    } else {
      openModal();
    }
  };

  const guardarDato = () => {
    if (modoEdicion) {
      setDatosNuevos((prevDatos) =>
        prevDatos.map((dato) =>
          dato._id === usuarioSeleccionado._id
            ? { ...dato, ...usuarioSeleccionado }
            : dato
        )
      );
      setModoEdicion(false);
    } else {
      setDatosNuevos([...datosNuevos, usuarioSeleccionado as Message]);
    }

    setUsuarioSeleccionado({});
    closeModal();
  };

  // Editar
  const [modoEdicion, setModoEdicion] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState<Partial<Message>>({});
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<
    Partial<Message>
  >({});

  const editarUsuario = () => {
    setModoEdicion(true);
    setUsuarioSeleccionado({});
    openModal();
  };

  // // eliminar
  // const [usuarioAEliminar, setUsuarioAEliminar] = useState<string | null>(null);

  // const eliminarUsuario = (usuarioId: string) => {
  //     setUsuarioAEliminar(usuarioId);
  //     openModal();
  // };

  // const confirmarEliminacion = () => {
  //     setDatosNuevos((prevDatos) => prevDatos.filter((dato) => dato._id !== usuarioAEliminar));
  //     setUsuarioAEliminar(null);
  //     closeModal();
  // };

  useEffect(() => {
    fetch("http://localhost:3002/api/v1/employees")
      .then((env) => env.json())
      .then((rec) => {
        // @ts-ignore
        setDataEmployees(rec);
      });
  }, []);

  return (
    <>
      <div className="flex flex-col items-start border-r-2 border-[#bbbcbc] pt-14 px-4 h-[100%] justify-between">
        <div className="flex flex-col items-start justify-center min-h-min">
          <h1 className="text-[#000] text-2xl font-bold mb-1">Empleados</h1>
          <span className="">
            Listado de empleados <br /> contratados.
          </span>
        </div>

        {/* Botones */}
        <div className="pb-10 flex flex-col space-y-10 items-center">
          <button
            onClick={agregarDato}
            className="bg-[#ececec] text-black px-2 py-2 mb-2 rounded-[50px] h-14 w-52 flex items-center justify-between font-bold"
          >
            <svg
              className="h-[50px] w-[50px] text-green-500 pr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <circle cx="10" cy="10" r="8" />
            </svg>
            <span className="mr-10">Agregar</span>
          </button>

          <button
            onClick={editarUsuario}
            className="bg-[#ececec] text-black px-2 py-2 mb-2 rounded-[50px] h-14 w-52 flex items-center justify-between font-bold"
          >
            <svg
              className="h-[50px] w-[50px] text-blue-500 pr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <circle cx="10" cy="10" r="8" />
            </svg>
            <span className="mr-10">Editar</span>
          </button>

          <button className="bg-[#ececec] text-black px-2 py-2 mb-2 rounded-[50px] h-14 w-52 flex items-center justify-between font-bold">
            <svg
              className="h-[50px] w-[50px] text-red-500 pr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <circle cx="10" cy="10" r="8" />
            </svg>
            <span className="mr-10">Eliminar</span>
          </button>
        </div>
      </div>

      <div className="max-h-[100vh] h-full pt-14 flex flex-col overflow-y-auto p-5">
        {/* Informacion */}
        <hr className="mb-10 border-[1px]" />

        <table className="w-full table-auto">
          <thead className="">
            <tr className="bg-[#ccc] rounded-full  py-2">
              {/* <tr > */}
              <th className="rounded-tl-full rounded-bl-full py-5">ID</th>
              <th>Usuario</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Puesto</th>
              <th className="rounded-tr-full rounded-br-full">Contraseña</th>
            </tr>
          </thead>
          <tbody>
            {
              // @ts-ignore
              dataEmployees &&
                dataEmployees?.message.map((data: Message) => (
                  <tr className="my-4 px-5" key={data._id}>
                    <td>{data._id}</td>
                    <td>{data.user}</td>
                    <td>{data.username}</td>
                    <td>{data.lastnames}</td>
                    <td>{data.role}</td>
                    <td>{data.password}</td>
                  </tr>
                ))
            }

            {/* Agregar los nuevos datos a la tabla */}
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Agregar"
            >
              <h2 className="text-black p-10 flex justify-center text-4xl">
                Ingrese nuevo usuario
              </h2>
              <div>
                <form className="space-x-2">
                  <label className="text-black">ID:</label>
                  <input
                    className="text-black border"
                    type="text"
                    value={nuevoDato._id || ""}
                    onChange={(e) =>
                      setNuevoDato({ ...nuevoDato, _id: e.target.value })
                    }
                  />

                  <label className="text-black">User:</label>
                  <input
                    className="text-black border"
                    type="text"
                    value={nuevoDato.user || ""}
                    onChange={(e) =>
                      setNuevoDato({ ...nuevoDato, user: e.target.value })
                    }
                  />

                  <label className="text-black">Username:</label>
                  <input
                    className="text-black border"
                    type="text"
                    value={nuevoDato.username || ""}
                    onChange={(e) =>
                      setNuevoDato({ ...nuevoDato, username: e.target.value })
                    }
                  />

                  <label className="text-black">Lastnames:</label>
                  <input
                    className="text-black border"
                    type="text"
                    value={nuevoDato.lastnames || ""}
                    onChange={(e) =>
                      setNuevoDato({ ...nuevoDato, lastnames: e.target.value })
                    }
                  />

                  <label className="text-black">Role:</label>
                  <input
                    className="text-black border"
                    type="text"
                    value={nuevoDato.role || ""}
                    onChange={(e) =>
                      setNuevoDato({ ...nuevoDato, role: e.target.value })
                    }
                  />

                  <label className="text-black">Password:</label>
                  <input
                    className="text-black border"
                    type="text"
                    value={nuevoDato.password || ""}
                    onChange={(e) =>
                      setNuevoDato({ ...nuevoDato, password: e.target.value })
                    }
                  />

                  <div className="flex flex-row gap-10 justify-center p-20">
                    <button
                      type="button"
                      className="text-black border p-4 rounded-full"
                      onClick={guardarDato}
                    >
                      Guardar
                    </button>
                    <button
                      type="button"
                      className="text-black border p-4 rounded-full"
                      onClick={closeModal}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </Modal>

            {/* Editar los usuarios */}
            {/* <div>

                            <Modal
                                isOpen={modalIsOpen}
                                onRequestClose={closeModal}
                                contentLabel="Seleccionar Usuario"
                            >
                                <h2 className="text-black text-4xl flex justify-center">Editar usuario</h2>
                                <ul className="text-blue-700">
                                    {dataEmployees &&
                                        dataEmployees.message.map((usuario) => (
                                            <li key={usuario._id}>
                                                <button onClick={() => setUsuarioSeleccionado(usuario)}>
                                                    {usuario.username}
                                                </button>
                                            </li>
                                        ))}
                                </ul>
                                <div className="flex flex-row gap-10 justify-center p-20">
                                    <button type="button" className="text-black border p-4 rounded-full" onClick={guardarDato}>
                                        Guardar
                                    </button>
                                    <button type="button" className="text-black border p-4 rounded-full" onClick={closeModal}>
                                        Cancelar
                                    </button>
                                </div>
                            </Modal>
                        </div> */}

            {/* Eliminar usuario */}
            {/* <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            contentLabel="Eliminar"
                        >
                            <h2 className="text-black text-4xl flex justify-center">Confirmar eliminación</h2>
                            <p>¿Estás seguro de que deseas eliminar este usuario?</p>
                            <div className="flex flex-row gap-10 justify-center p-20">
                                <button type="button" className="text-black border p-4 rounded-full" onClick={confirmarEliminacion}>
                                    Confirmar
                                </button>
                                <button type="button" className="text-black border p-4 rounded-full" onClick={closeModal}>
                                    Cancelar
                                </button>
                            </div>
                        </Modal> */}
          </tbody>
        </table>

        {/* <div className="flex text-center gap-2  justify-around bg-[#ccc] w-[100%] py-5 px-2 items-center rounded-full mx-auto text-black font-bold">
                    <p>ID</p>
                    <p>Usuario</p>
                    <p>Nombre</p>
                    <p>Apellido</p>
                    <p>Puesto</p>
                    <p>Contraseña</p>
                </div> */}
      </div>
    </>
  );
}
