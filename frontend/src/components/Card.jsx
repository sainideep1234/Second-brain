import Share from "../icons/Share";
import Delete from "../icons/Delete";
import Pagelogo from "../icons/Pagelogo";
import Input from "./Input";

export default function Card({title , link , type}){

  
  return <>
  
  <div className="border w-72 border-gray-300  rounded-md p-4 m-4 mr-16 hover:shadow-2xl bg-slate-100">
      <div className="flex justify-between">
        <div className="flex items-center gap-2 ">
          <div className="text-gray-500">
            <Pagelogo></Pagelogo>
          </div>
          <div className="font-semibold text-lg"> {title}</div>
        </div>
        <div className="flex items-center gap-1 text-gray-500 text-black">
          <Share></Share>
          <Delete></Delete>
        </div>
      </div>
      <div>
            {type ==='youtube' && <iframe className="w-full rounded-md mt-6" src={`https://www.youtube.com/embed/${link.split('=')[1]}?si=uW5-kaLSog1dp3zv`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

            {type==='twitter' &&<blockquote className="twitter-tweet">
                <a href={link}></a> 
                </blockquote> }
      </div>  
      <div className="mt-4">
          <Input placeholder={"Add comments"}></Input>
      </div>
  </div>
    
  </> 
}