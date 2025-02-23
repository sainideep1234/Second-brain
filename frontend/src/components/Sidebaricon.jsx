export default function Sidebaricon({icon , title}){
    return <>
      <div className="flex gap-2 hover:bg-gray-400 items-center h-10 text-gray-500 rounded-md">
            <div className="pl-4 ">
            {icon}
            </div>
            {title}
        </div>
    </>
}