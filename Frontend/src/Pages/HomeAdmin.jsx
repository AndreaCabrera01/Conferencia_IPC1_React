import { useEffect, useState } from "react";
import React from "react";
import { useAuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import Service from "../Service/Service";
const HomeAdmin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [eventos, setEventos] = useState([]);
  const [abrirModalEditar, setAbrirModalEditar] = useState(false);
  const [abrirModal, setAbrirModal] = useState(false);
  const [reload, setReload] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    photo: "",
    date: "",
    place: "",
  });

  const [ formDataAgregar, setFormDataAgregar ] = useState({
    name: "",
    description: "",
    photo: "",
    date: "",
    place: "",
    });


  const addEvent = async (evento) => {
    console.log(evento);
    try {
      let fD = new FormData();
      fD.append("name", evento.name);
      fD.append("description", evento.description);
      fD.append("photo", evento.photo);
      fD.append("date", evento.date);
      fD.append("place", evento.place);
    
      console.log(fD);
      const response = await Service.addEvent(fD);
      if (response.message === "Event created") {
        alert("Evento creado correctamente");
        setAbrirModal(false);
        setReload(!reload);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const patchEvent = async (id, evento) => {
    try {
      const response = await Service.patchEvent(id, evento);
      console.log(response);
      if (response.message === "Event updated") {
        alert("Evento actualizado correctamente");
        setAbrirModalEditar(false);
        setReload(!reload);
        } else {
        alert("Error al actualizar el evento");
        setReload(!reload);
        }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEvent = async (id) => {
    try {
      const response = await Service.deleteEvent(id);
      console.log(response);
      if (response.message === "Event deleted") {
        alert("Evento eliminado correctamente");
        setReload(!reload);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleModal = () => {
    setAbrirModal(!abrirModal);
  };

  const handleModalEditar = () => {
    setAbrirModalEditar(!abrirModalEditar);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleInputChangeAgregar = (e) => {
    setFormDataAgregar({ ...formDataAgregar, [e.target.name]: e.target.value });
    console.log(formDataAgregar);
    };

  useEffect(() => {
    const data_user = JSON.parse(localStorage.getItem("data_user"));
    if (!data_user) {
      navigate("/");
    }

    const getEventos = async () => {
      try {
        const response = await Service.getEvents();
        console.log(response);

        setEventos(response);

        if (response.length > 0) {
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getEventos();
  }, [loading, reload]);

  return (
    <div className="h-screen max-h-screen w-screen bg-gradient-to-t from-[#5378cf] to-[#356894] flex flex-col">
      <div className="ml-[16rem] flex-1 ">
        <div className="flex cols-2 gap-4">
          <div className="flex flex-col w-full h-screen">
            <div className="h-1/6">
              <div className="h-full p-4">
                <div className="h-full p-4">
                  <div className="grid grid-cols-2">
                    <div className="flex justify-start items-center px-2">
                      <span className="flex items-center">
                        <h1 className="text-3xl text-black font-bold text-center font-sans">
                          Gestion de Eventos
                        </h1>
                      </span>
                    </div>

                    <div className="flex justify-end items-center">
                      <div className="py-2 px-8 ">
                        <button
                          className="bg-[#fcc20d] hover:bg-[#c78a20] text-white font-bold py-2 px-4 rounded flex "
                          onClick={() => setAbrirModal(true)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                          </svg>
                          Nuevo Evento
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-screen">
                <h1 className="text-2xl font-bold italic text-gray-600">
                  No hay Eventos
                </h1>
              </div>
            ) : (
              <table className="m-8 rounded-md border-b border-neutral-200 max-w-full text-center text-sm text-surface text-black/90">
                <thead className="rounded-[12px] border-b border-neutral-200 dark:border-white/10">
                  <tr class="bg-gray-400">
                    <th class="w-1/5 py-4 px-6 text-gray-700 font-bold uppercase">
                      Nombre
                    </th>
                    <th class="w-1/5 py-4 px-6 text-gray-700 font-bold uppercase">
                      Descripción
                    </th>
                    <th class="w-1/5 py-4 px-6 text-gray-700 font-bold uppercase">
                      Fecha
                    </th>
                    <th class="w-1/5 py-4 px-6 text-gray-700 font-bold uppercase">
                      Lugar
                    </th>
                    <th class="w-1/5 py-4 px-6 text-gray-700 font-bold uppercase">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {eventos.map((evento) => (
                    <tr class="bg-gray-100 hover:bg-gray-200">
                      <td class="py-4 px-6 border-b border-neutral-200 dark:border-white/10">
                        {evento.name}
                      </td>
                      <td class="py-4 px-6 border-b border-neutral-200 dark:border-white/10">
                        {evento.description}
                      </td>
                      <td class="py-4 px-6 border-b border-neutral-200 dark:border-white/10">
                        {evento.date}
                      </td>
                      <td class="py-4 px-6 border-b border-neutral-200 dark:border-white/10">
                        {evento.place}
                      </td>
                      <td class="py-4 px-6 border-b border-neutral-200 dark:border-white/10">
                        <button
                          class="m-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => {
                            setFormData(evento);
                            handleModalEditar();
                          }}
                        >
                          Editar
                        </button>
                        <button
                          class="m-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => deleteEvent(evento.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      {abrirModal ? (
        <>
          <div className="shadow-[0_2px_15px_-3px_rgba(255,255,255.07),0_10px_20px_-2px_rgba(255,255,255,0.04)] justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className=" relative w-7/12 my-6 mx-auto">
              {/*content*/}
              <div className="border-2 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-white border-darkBlue/75">
                {/*header*/}
                <div className=" flex text-black items-start justify-between p-5 border-b border-solid border-gray-500 rounded-t">
                  <h3 className=" text-2xl font-semibold">Nuevo Evento</h3>
                  <button
                    className="text-red-500 p-1 ml-auto text-dark  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => handleModal()}
                  >
                    <span className="h-6 w-6 text-2xl block outline-none focus:outline-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 22 22"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
                {/*body*/}

                <form className="justify-center"  onSubmit={(e) => { e.preventDefault(); addEvent(formDataAgregar)}}>
                  <div className="relative p-6 flex-auto">
                    <div className="mt-4">
                      <label
                        htmlFor="photo"
                        className="block text-lg font-medium text-black"
                      >
                        {" "}
                        Foto del Evento{" "}
                      </label>
                      <input
                        type="text"
                        className="w-full border-2 rounded-lg border-black p-2"
                        placeholder="Ingrese Link de la foto representativa del evento..."
                        name="photo"
                        id="photo"
                        onChange={(e) => handleInputChangeAgregar(e)}
                      />
                    </div>

                    <div className="mt-4">
                      <label
                        htmlFor="name"
                        className="block text-lg font-medium text-black"
                      >
                        {" "}
                        Nombre{" "}
                      </label>
                      <input
                        type="text"
                        className="w-full border-2 rounded-lg border-black p-2"
                        placeholder="Nombre del Evento..."
                        name="name"
                        id="name"
                        onChange={(e) => handleInputChangeAgregar(e)}
                      />
                    </div>
                    <div className="mt-4">
                      <label
                        htmlFor="description"
                        className="block text-lg font-medium text-black"
                      >
                        {" "}
                        Descripción{" "}
                      </label>
                      <textarea
                        className="w-full border-2 rounded-lg border-black p-2"
                        placeholder="Añade la descripción..."
                        name="description"
                        id="description"
                        rows="4"
                        onChange={(e) => handleInputChangeAgregar(e)}
                      ></textarea>
                    </div>
                    <div className="mt-4">
                      <label
                        htmlFor="placce"
                        className="block text-lg font-medium text-black"
                      >
                        {" "}
                        Lugar{" "}
                      </label>
                      <input
                        type="text"
                        className="w-full border-2 rounded-lg border-black p-2"
                        placeholder="Lugar del Evento..."
                        name="place"
                        id="place"
                        onChange={(e) => handleInputChangeAgregar(e)}
                      />
                    </div>

                    <div className="mt-4">
                      <label
                        htmlFor="date"
                        className="block text-lg font-medium text-black"
                      >
                        {" "}
                        Fecha{" "}
                      </label>
                      <input
                        type="date"
                        className="w-full border-2 rounded-lg border-black p-2"
                        placeholder="Lugar del Evento..."
                        name="date"
                        id="date"
                        onChange={(e) => handleInputChangeAgregar(e)}
                      />
                    </div>

                    <div className="mt-4 text-center flex text-center justify-center">
                      <button
                        type="submit"
                        className="bg-green-600 rounded-lg flex p-3 hover:bg-green-700"
                      >
                        <p className="text-white">Guardar</p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="white"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      {abrirModalEditar ? (
        <>
          <div className="shadow-[0_2px_15px_-3px_rgba(255,255,255.07),0_10px_20px_-2px_rgba(255,255,255,0.04)] justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className=" relative w-7/12 my-6 mx-auto">
              {/*content*/}
              <div className="border-2 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-white border-darkBlue/75">
                {/*header*/}
                <div className=" flex text-black items-start justify-between p-5 border-b border-solid border-gray-500 rounded-t">
                  <h3 className=" text-2xl font-semibold">Editar Evento</h3>
                  <button
                    className="text-red-500 p-1 ml-auto text-dark  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => handleModalEditar()}
                  >
                    <span className="h-6 w-6 text-2xl block outline-none focus:outline-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 22 22"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
                {/*body*/}

                <form className="justify-center" onSubmit={(e) => { e.preventDefault(); patchEvent(formData.id, formData)}}>   
                  <div className="relative p-6 flex-auto">
                    <div className="mt-4">
                      <label
                        htmlFor="photo"
                        className="block text-lg font-medium text-black"
                      >
                        {" "}
                        Foto del Evento{" "}
                      </label>
                      <input
                        type="text"
                        className="w-full border-2 rounded-lg border-black p-2"
                        placeholder="Ingrese Link de la foto representativa del evento..."
                        name="photo"
                        id="photo"
                        defaultValue={formData.photo}
                        onChange={(e) => handleInputChange(e)}
                      />
                    </div>

                    <div className="mt-4">
                      <label
                        htmlFor="name"
                        className="block text-lg font-medium text-black"
                      >
                        {" "}
                        Nombre{" "}
                      </label>
                      <input
                        type="text"
                        className="w-full border-2 rounded-lg border-black p-2"
                        placeholder="Nombre del Evento..."
                        name="name"
                        id="name"
                        defaultValue={formData.name}
                        onChange={(e) => handleInputChange(e)}
                      />
                    </div>
                    <div className="mt-4">
                      <label
                        htmlFor="description"
                        className="block text-lg font-medium text-black"
                      >
                        {" "}
                        Descripción{" "}
                      </label>
                      <textarea
                        className="w-full border-2 rounded-lg border-black p-2"
                        placeholder="Añade la descripción..."
                        name="description"
                        id="description"
                        rows="4"
                        defaultValue={formData.description}
                        onChange={(e) => handleInputChange(e)}
                      ></textarea>
                    </div>
                    <div className="mt-4">
                      <label
                        htmlFor="placce"
                        className="block text-lg font-medium text-black"
                      >
                        {" "}
                        Lugar{" "}
                      </label>
                      <input
                        type="text"
                        className="w-full border-2 rounded-lg border-black p-2"
                        placeholder="Lugar del Evento..."
                        name="place"
                        id="place"
                        defaultValue={formData.place}
                        onChange={(e) => handleInputChange(e)}
                      />
                    </div>

                    <div className="mt-4">
                      <label
                        htmlFor="date"
                        className="block text-lg font-medium text-black"
                      >
                        {" "}
                        Fecha{" "}
                      </label>
                      <input
                        type="date"
                        className="w-full border-2 rounded-lg border-black p-2"
                        placeholder="Lugar del Evento..."
                        name="date"
                        id="date"
                        defaultValue={formData.date}
                        onChange={(e) => handleInputChange(e)}
                      />
                    </div>

                    <div className="mt-4 text-center flex text-center justify-center">
                      <button
                        type="submit"
                        className="bg-green-600 rounded-lg flex p-3 hover:bg-green-700"
                      >
                        <p className="text-white">Guardar Cambios</p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="white"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default HomeAdmin;
