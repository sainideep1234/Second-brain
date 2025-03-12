import Sidebar from "../components/Sidebar";
import AppBar from "../components/AppBar";
import Card from "../components/Card";
import { useState } from "react";
import CreateModal from "../components/CreateModal";
import ShareModal from "../components/ShareModal";
import useContent from "../hooks/useContent";
import Chatwindow from "../components/Chatwindow";
import Message from "../icons/Message";

function Dashboard() {
  const [open, setopen] = useState(false);
  const [openshare, setopenshare] = useState(false);
  const [opensidebar, setopensidebar] = useState(false);
  const [contentType, setContentType] = useState(null);
  const { contents, responseMsg, fetchdata } = useContent(contentType);
  const [openChatWindow, setChatWindow] = useState(false);

  return (
    <>
      <CreateModal open={open} setopen={setopen}></CreateModal>
      <ShareModal
        openshare={openshare}
        setopenshare={setopenshare}
      ></ShareModal>

      <div  onClick={()=>setChatWindow(e=>!e)} className=" transition-all delay-10 duration-100 fixed bottom-20 right-20 bg-[#C599B9] text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg text-lg font-bold hover:w-14 hover:h-14">
      <Message></Message>
      </div>
{/* 
      <div className= {`p-5  fixed bottom-19 right-19 bg-[#C599B9] text-white  flex items-center justify-center rounded-full shadow-lg text-lg font-bold hover`}>
       
      </div> */}

      <div className={`w-screen h-screen  `} >
        <AppBar
          open={open}
          setopen={setopen}
          openshare={openshare}
          setopenshare={setopenshare}
          setopensidebar={setopensidebar}
          opensidebar={opensidebar}
        ></AppBar>

        <div className=" w-full bg-bgcolor flex">
          <Sidebar
            setContentType={setContentType}
            opensidebar={opensidebar}
            setopensidebar={setopensidebar}
          ></Sidebar>

          <div
            className={` mt-20 px-10 w-full  flex-1 
              ${opensidebar ? "ml-96" : "ml-0"}
              ${openChatWindow ? "mr-96" : "mr-0"} `}
          >
            <h1 className=" text-4xl text-gray-500 font-bold border-b-1 border-gray-300 mt-5 pb-1">
              All Notes
            </h1>
            {contents?.map(({ type, _id, title, link, createdAt }) => (
              <Card
                onDelete={fetchdata}
                createdAt={createdAt}
                contentId={_id}
                title={title}
                type={type}
                key={_id}
                url={link}
              ></Card>
            ))}
          </div>

          <Chatwindow openChatWindow={openChatWindow} setChatWindow={setChatWindow}></Chatwindow>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
