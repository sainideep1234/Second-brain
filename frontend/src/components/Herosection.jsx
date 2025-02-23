import Button from "./Button";
import SecButton from "./SecButton";
import Card from "./Card";
import { useNavigate } from "react-router-dom";
import useContent from "../hooks/useContent";
import { BACKEND_URL } from "../../config";

function Herosection({ onclick , sharelink}) {
  const navigate = useNavigate();
  const contents = useContent(`${BACKEND_URL}content/get`); // Fetch content with the custom hook

  function logout() {
    localStorage.removeItem("token"); // Clear the token from localStorage
    navigate("/signin"); // Redirect to the Signin page
  }

  console.log(contents);

  return (
    <div className="bg-mainbg  w-full">
      {/* Header Section */}
      <div className="flex justify-between px-20 pt-10 pb-5 border-b border-zinc-300">
        <h1 className="text-4xl font-bold uppercase tracking-tighter text-textcol">
          All Notes
        </h1>
        <div className="flex gap-4">
          <Button onclick={onclick} title={"Create Content"} />
          <SecButton title={"Share Content"} onclick={sharelink} />
          <button
            onClick={logout}
            className="bg-purple-800 text-white px-4 rounded-xl hover:bg-zinc-800 hover:cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-wrap w-full">
        {contents?.map(({ id, title, link }) => (
          <Card key={id} title={title} link={link} type={"Youtube"} />
        ))}
      </div>
    </div>
  );
}

export default Herosection;
