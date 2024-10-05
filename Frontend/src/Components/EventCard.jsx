import React from "react";

const EventCard = ({ event }) => {
  return (
    <div className="flex-1 flex justify-center items-center m-4">
      <div className="w-full lg:flex bg-white border border-gray-400 rounded-lg overflow-hidden shadow-md">
        <div
          className="h-48 lg:h-auto lg:w-48 flex-none bg-cover"
          style={{
            backgroundImage: `url(${event.photo})`,
          }}
        ></div>
        <div className="p-4 flex flex-col justify-between leading-normal">
          <div className="mb-4">
            <div className="text-gray-900 font-bold text-xl mb-2">
              {event.name}
            </div>
            <p className="text-gray-700 text-base w-96">
              {event.description}
            </p>
          </div>
          <div className="flex items-center">
            <div className="text-sm">
              <p className="text-gray-900 leading-none">{event.place}</p>
              <p className="text-gray-600">{event.date}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
