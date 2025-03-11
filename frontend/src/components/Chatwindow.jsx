import React, { useEffect, useRef, useState } from "react";
import Cross from "../icons/Cross";
import Plane from "../icons/Plane";
import axios from "axios";
import { BACKEND_URL } from "../../config";

function Chatwindow({ setChatWindow, openChatWindow }) {
  const [inputMsg, setInputMsg] = useState([]); // Store messages as an array
  const [res, setRes] = useState([]);
  const chatref = useRef();


  return (
    <div
      className={`flex flex-col py-4 px-5 h-screen fixed top-15 right-0 bg-sidebarbg text-gray-500 ${
        openChatWindow ? "w-96" : "hidden"
      }`}
    >
      <span className="font-bold text-lg tracking-tight inline-block border-b border-gray-500">
        Chat window
      </span>

      <span
        onClick={() => setChatWindow((e) => !e)}
        className="inline-flex items-center justify-center w-8 h-8 hover:shadow-sm hover:shadow-black rounded-full relative ml-80 mb-2"
      >
        <Cross className="w-4 h-4"></Cross>
      </span>
      <div className="flex-1 h-screen p-4 bg-pink-200 mb-3 rounded-xl">
        <div className="flex flex-col gap-2 h-full overflow-y-auto">
          {res?.map((index ) => (
            <span
              key={index}
              className="self-start px-3 py-2 bg-white rounded-xl shadow"
            >
              
            </span>
          ))}

          {inputMsg?.map((inputMsg, index) => (
            <span
              key={index}
              className="self-end px-3 py-2 bg-blue-500 text-white rounded-xl shadow"
            >
              {inputMsg}
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center w-full border border-gray-800 rounded-xl mb-15 p-1 ">
        <input
          ref={chatref}
          type="text"
          placeholder="Chat with your chat.. "
          className="py-1 outline-none text-black  grow-1 px-2 placeholder-gray-500 tracking-tight text-lg "
        />
        <div
         
          className="hover:shadow-lg  px-1 hover:px-2 hover:shadow:xl  hover:text-white"
        >
          <Plane></Plane>
        </div>
      </div>
    </div>
  );
}

export default Chatwindow;
