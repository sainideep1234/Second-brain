import Share from "../icons/Share";

export default function SecButton({  title , onclick }){
     return (
      <>
        <button onClick = {onclick} className="bg-slate-400  py-1 px-2 rounded-md text-btntext font-light flex items-center justify-center hover:bg-slate-300 hover:text-black">
            <div className="pr-1">
              <Share/>
            </div>
            {title}
        </button>
      
      </>
      );
}