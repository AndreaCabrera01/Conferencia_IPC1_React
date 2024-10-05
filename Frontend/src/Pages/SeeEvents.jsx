import React, { useEffect, useState } from "react";
import Service from "../Service/Service";
import EventCard from "../Components/EventCard";

const SeeEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hayEventos, setHayEventos] = useState(false);

  useEffect(() => {
    const data_user = JSON.parse(localStorage.getItem("data_user"));
    if (!data_user) {
      navigate("/");
    }

    const getEvents = async () => {
      try {
        const response = await Service.getEvents();
        setEvents(response);
        if (response.length > 0) {
          setHayEventos(true);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    getEvents();
  }, [loading]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-t from-[#5378cf] to-[#356894] flex flex-col items-center">
      <div className="w-full flex flex-col items-center">
        <h1 className="text-white m-5 font-bold text-4xl">Eventos</h1>

        {hayEventos ? (
          <div className="flex flex-col items-center w-full">
            {events.map((event) => (
              <div className="mb-4" key={event.id}>
                <EventCard event={event} className="hover:scale-105" />
              </div>
            ))}
          </div>
        ) : (
          <h1 className="text-white m-5 font-bold text-4xl">No hay eventos</h1>
        )}
      </div>
    </div>
  );
};

export default SeeEvents;
