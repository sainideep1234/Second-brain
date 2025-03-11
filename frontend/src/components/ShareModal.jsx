import { useState } from "react";
import Cross from "../icons/Cross";
import axios from "axios";
import PropTypes from "prop-types";

function ShareModal({ openshare, setopenshare }) {

  const [shareLink, setShareLink] = useState("");


  async function handleShare() {
    try {
      const response = await axios.post("http://localhost:3002/content/share" , {} ,  {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setShareLink("http://localhost:5173/share/" + response.data.link);
      console.log(shareLink);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {openshare && (
        <div className=" absolute z-[999] w-screen h-screen flex items-center justify-center bg-black/60  ">
          <div className="relative   w-1/3 bg-bgcolor opacity-100 p-5 rounded-lg ">
            <div
              className="absolute top-1 right-0 -translate-x-5 translate-y-2 hover:shadow-lg hover:shadow-black"
              onClick={() => setopenshare(!openshare)}
            >
              <Cross></Cross>
            </div>
            <h1 className="text-4xl font-bold border-b-1 border-gray-500 text-center my-5 pb-4">
              Share Link
            </h1>
            <p className="my-5 text-lg tracking-tight">
              Your name, custom instructions, and any messages you add after
              sharing stay private. Learn more
            </p>
            <div className="flex rounded-lg  border border-gray-400 justify-between py-2 px-4">
              <div> {shareLink ? shareLink : "http://localhost:5173"}</div>

              <button
                onClick={handleShare}
                className=" cursor-pointer rounded-lg  text-white hover:bg-newbtn bg-btncolor px-4 border-2 border-gray-500  hover:shadow-lg  border hover:shadow-lg hover:text-white transition-all delay-30 duration-300 hover:px-6"
              >
                Create link
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}



ShareModal.propTypes = {
  openshare: PropTypes.bool.isRequired, // `openshare` should be a boolean
  setopenshare: PropTypes.func.isRequired, // `setopenshare` should be a function
};




export default ShareModal;
