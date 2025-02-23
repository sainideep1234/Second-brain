import { useState } from "react";
import Cross from "../icons/Cross";
import axios from "axios";
import { BACKEND_URL } from "../../config";

function ShareModal({ onclick }) {
  const [link, setLink] = useState("");

  async function createLink() {
    const response = await axios.post(`${BACKEND_URL}content/share`, {
      token: localStorage.getItem("token"),
    });

    setLink(response.data.link);
  }

  return (
    <div className="absolute z-[999] w-full h-full bg-black opacity-60 flex justify-center items-center ">
      <div className=" bg-white  w-1/3 p-8 rounded-xl">
        <div className="flex justify-between text-zinc-600 px-15 border-b-1 mb-4 ">
          <h1 className="text-lg font-semibold ">Share public link to chat</h1>
          <Cross onclick={onclick}></Cross>
        </div>
        <p className="text-md font-semibold my-6">
          Your name, custom instructions, and any messages you add after sharing
          stay private. Learn more
        </p>
        <div className="flex justify-between border-2 rounded-2xl p-4">
          <div>
            {link
              ? `http://localhost:5175/share/:${link}`
              : `https://secondbrain.com/share/...`}
          </div>
          <button
            onClick={createLink}
            className="border-1 text-white  rounded-2xl px-5 bg-zinc-900 hover:bg-zinc-600"
          >
            Create link
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShareModal;
