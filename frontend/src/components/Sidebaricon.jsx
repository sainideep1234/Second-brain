import React from "react";

function Sidebaricon({title , icon , onClick}) {
  return (
    <>
      <div onClick={onClick} className=" transition-all delay-30 duration-300 flex items-center gap-2 bg-white w-full h-[5vh] px-5 py-3 mb-2 rounded-lg hover:py-5 hover:cursor-pointer hover:bg-newbtn hover:shadow-sm hover:shadow-purple-500">
        {icon}
        <h1 className="font-medium text-md">{title}</h1>
      </div>
    </>
  );
}

export default Sidebaricon;
