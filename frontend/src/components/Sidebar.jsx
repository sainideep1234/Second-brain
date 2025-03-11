import Twitter from "../icons/Twitter";
import Youtube from "../icons/Youtube";
import Sidebaricon from "./Sidebaricon";

function Sidebar({ opensidebar , setContentType }) {
  return (
    <>
      
      {opensidebar && (
        <div className= {` fixed top-15 h-screen left-0 transition-all duration-300 ${opensidebar?'w-96':'w-0'}  bg-sidebarbg p-5 border-r-1 border-gray-300`}>
            <Sidebaricon  onClick={()=>setContentType("youtube")} title={'Youtube'} icon={< Youtube/>}></Sidebaricon>
            <Sidebaricon onClick={()=>setContentType("twitter")} title={'Twitter'} icon={< Twitter/>}></Sidebaricon>
        </div>
      )}
    </>
  );
}

export default Sidebar;
