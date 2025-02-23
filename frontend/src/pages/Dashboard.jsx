import Sidebar from "../components/Sidebar";
import Herosection from "../components/Herosection";
import Modal from "../components/Modal";
import { useState } from "react";
import ShareModal from "../components/ShareModal";

export default function Dashboard() {
  const [isclosed, setclosed] = useState(false);
  const [isShareclosed, setshareclosed] = useState(false);
  return (
    <>
      <div className=" w-screen  h-screen  ">
        {isclosed && <Modal onclick={() => setclosed(false)} />}
        {isShareclosed && <ShareModal onclick={() => setshareclosed(false)} />}

        <div className=" grid-col-4">
          <div className="col-span-3">
            <Sidebar></Sidebar>
          </div>
          <div className="col-span-3">
            <Herosection
              onclick={() => setclosed(true)}
              sharelink={() => setshareclosed(true)}
            ></Herosection>
          </div>
        </div>
      </div>
    </>
  );
}
