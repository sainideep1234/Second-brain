import Logo from "../icons/Logo";
import Twitter from "../icons/Twitter";
import Youtube from "../icons/Youtube";
import Sidebaricon from "./Sidebaricon";

export default function Sidebar(){
    return <>
    <div className=" fixed bg-sidebarbg w-[19vw] h-screen px-4  border border-gray-300 ">
        <div className="flex gap-2 items-center mt-4 ">
            <Logo></Logo>
            <div className="font-bold text-xl">Second Brain</div>
        </div>
        <div className="mt-8 text-textcol">
            <Sidebaricon icon={<Twitter />} title={"Twitter"}></Sidebaricon>
            <Sidebaricon icon={<Youtube />} title={"YOutube"}></Sidebaricon>
        </div>
    </div>
    
    </>
}