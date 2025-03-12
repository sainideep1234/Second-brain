import { useParams } from "react-router-dom";
import Card from "../components/Card";
import Collapse from "../icons/Collapse";
import Logo from "../icons/Logo";
import useShare from "../hooks/useShare";

function Sharepage() {
  const { link } = useParams();
  const url = "http://localhost:3002/content/share/" + link;
  const contents = useShare(url);
  return (
    <>
      <div className=" w-screen h-screen">
        <div className="relative z-[999]  bg-white flex items-center w-full border-b-2 border-gray-200 pt-5 pb-2 px-10 w-full ">
          <div className="hover:shadow-lg transition-all delay-30 duration-300 hover:px-1 hover:shadow-black"></div>
          <div className="flex items-center px-5">
            <Logo></Logo>
            <h2 className="text-2xl font-bold px-2">Brainly</h2>
          </div>
        </div>
        <div className=" w-full bg-bgcolor flex p-5">
          <h1 className=" text-4xl text-gray-500 font-bold border-b-1 border-gray-300 mt-5 pb-1">
            All Notes
          </h1>
          <div className={`  px-10 flex-1 `}>
            {contents.map(({ title, type, link, _id }) => (
              <Card title={title} type={type} key={_id} url={link} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Sharepage;
