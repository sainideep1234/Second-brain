import { useRef } from "react";
import Cross from "../icons/Cross";
import Inputbox from "./Inputbox";
import axios from "axios";
import { BACKEND_URL } from "../../config";

function Modal({ onclick }) {
  const titleRef = useRef();
  const linkRef = useRef();

  function postcontent() {
    axios.post(
        `${BACKEND_URL}content/post`,
        {
          // Data to be sent in the body
          title: titleRef.current.value,
          link: linkRef.current.value,
        },
        {
          // Headers (passed as the third argument)
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log("Content posted successfully:", response.data);
      })
      .catch((error) => {
        console.error(
          "Error posting content:",
          error.response?.data?.msg || error.message
        );
      });
  }

  return (
    <div className="absolute z-[999] bg-black h-screen w-screen opacity-80 flex justify-center items-center">
      <div className=" bg-mainbg rounded-xl  size-10 p-5 text-white h-1/2 w-1/4">
        <div className="flex justify-between text-black">
          <h1 className="text-xl text-semibold "> ADD</h1>
          <Cross onclick={onclick}></Cross>
        </div>
        <Inputbox
          ref={titleRef}
          placeholder={"title"}
          title={"Title"}
        ></Inputbox>
        <Inputbox
          ref={linkRef}
          placeholder={"link.."}
          title={"Link"}
        ></Inputbox>
        <div className="flex gap-4 mt-5">
          <button
            onClick={postcontent}
            className="bg-primaryBtnbg px-4 rounded-lg hover:opacity-30"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
