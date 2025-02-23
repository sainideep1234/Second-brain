import { useParams } from "react-router-dom";
import useShare from "../hooks/useShare";
import Card from "./Card";
import { BACKEND_URL } from "../../config";

function Sharecontent() {
  const { link } = useParams();

  const { contents } = useShare(`${BACKEND_URL}content/share/${link}`) || [];

  return (
    <div className="w-full">
      <div className="bg-mainbg ml-[19vw]">
        {/* Header Section */}
        <div className="flex justify-between px-20 pt-10 pb-5 border-b border-zinc-300">
          <h1 className="text-4xl font-bold uppercase tracking-tighter text-textcol">
            All Notes
          </h1>
        </div>
      </div>

      {/* Notes List */}
      <div className="ml-[19vw] flex flex-wrap  bg-gray-500 ">
        {contents?.map((item) => (
          <Card
            key={item.id}
            title={item.title}
            link={item.link}
            type="youtube"
          ></Card>
        ))}
      </div>
    </div>
  );
}

export default Sharecontent;
