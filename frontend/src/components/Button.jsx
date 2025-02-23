import Plus from "../icons/Plus";

export default function Button({ onclick , title }) {
  return (
  <>
    <button onClick={onclick} className="bg-primaryBtnbg  py-1 px-2 rounded-md text-white font-light flex items-center justify-center hover:bg-slate-200 hover:text-black">
        <div className="pr-1">
           <Plus />
        </div>
        {title}
    </button>
  
  </>
  );
}
