import { useRef, useState } from "react";
import Cross from "../icons/Cross";
import axios from "axios";

function CreateModal({ open, setopen }) {
  const titleref = useRef();
  const linkref = useRef();
  const [info, setInfo] = useState("");
  const [contentType, setContentType] = useState("");

  async function handleSubmit() {
    const title = titleref.current.value;
    const link = linkref.current.value;
    

    try {
      let response = await axios.post(
        "http://localhost:3002/content/post",
        {
          title,
          type:contentType,
          link,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setInfo(response.data.msg);
      titleref.current.value="";
      linkref.current.value="";
    } catch (error) {
      console.log(error);
      setInfo(error.response.data);
    }
  }

  return (
    <>
      {open && (
        <div className=" absolute z-[999] w-screen h-screen flex items-center justify-center bg-black/60  ">
          <div className="relative   w-1/2 bg-bgcolor opacity-100 p-5 rounded-lg ">
            <div
              className="absolute top-1 right-0 -translate-x-5 translate-y-2 hover:shadow-lg hover:shadow-black"
              onClick={() => {
                setopen(!open);
                setInfo("");
              }}
            >
              <Cross></Cross>
            </div>
            <h1 className="text-4xl font-bold border-b-1 border-gray-500 text-center my-5 pb-4">
              Create content{" "}
            </h1>
            <label className="text-lg font-semibold " to="username">
              Title
              <input
                ref={titleref}
                className="border-gray-400 border w-full rounded-md px-4 py-1 my-2"
                type="text"
                id="username"
                placeholder="new video etc.."
              />
            </label>
            <label className="text-lg font-semibold " to="password">
              Link
              <input
                ref={linkref}
                className=" border-gray-400 border w-full rounded-md px-4 py-1 my-2"
                type="text"
                id="password"
                placeholder="youtube, twitter post link"
              />
            </label>
            {/* <label className="text-lg font-semibold " to="password">
              Type
              <input
                ref={typeref}
                className="border-gray-400 border w-full rounded-md px-4 py-1 my-2"
                type="text"
                id="password"
                placeholder="either youtube or twitter (in lowercase)"
              />
            </label> */}
            <div className="flex gap-5">
              <button
                onClick={() => setContentType("youtube")}
                className=" py-2 text-lg font-semibold my-4  cursor-pointer rounded-lg bg-btncolor2 hover:bg-newbtn px-4 hover:shadow-lg border-gray-500 border-2 border hover:shadow-lg hover:text-white transition-all delay-30 duration-300 hover:px-6"
              >
                Youtube
              </button>
              <button
                onClick={() => setContentType("twitter")}
                className=" py-2 text-lg font-semibold my-4  cursor-pointer rounded-lg bg-btncolor2 hover:bg-newbtn px-4 hover:shadow-lg border-gray-500 border-2 border hover:shadow-lg hover:text-white transition-all delay-30 duration-300 hover:px-6"
              >
                Twitter
              </button>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full py-2 text-lg font-semibold my-4  cursor-pointer rounded-lg hover:bg-newbtn bg-btncolor px-4 hover:shadow-lg border-gray-500 border-2 border hover:shadow-lg hover:text-white transition-all delay-30 duration-300 hover:px-6"
            >
              Submit
            </button>

            {info && (
              <span className="py-1 border-black-1 text-center font-semibold border inline-block px-3 w-full">
                {info}
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default CreateModal;
