import Share from "../icons/Share";
import Delete from "../icons/Delete";
import Youtube from "../icons/Youtube";
import Twitter from "../icons/Twitter";
import Pagelogo from "../icons/Pagelogo";
import axios from "axios";
import { BACKEND_URL } from "../../config";

function Card({ type, title, url, contentId , createdAt , onDelete}) {
  let logo;
  if (type === "youtube") {
    logo = <Youtube />;
  } else if (type === "twitter") {
    logo = <Twitter />;
  } else {
    logo = <Pagelogo />;
  }


    function timeSplit(){
      let date  = createdAt;
      let time = date.split('T')[0];
      return time;


    }

  function watchToembed(watchlink) {
    let contentId = watchlink.split("?v=")[1]; //sGbxmsDFVnE
    let embedlink = "http://www.youtube.com/embed/" + contentId;
    return embedlink;
  }

  function linktoTwitter(watchlink) {
    let contentId = watchlink.split("s/")[1];
    let embedlink = "https://twitter.com/x/status/" + contentId;
    return embedlink;
  }

  async function handleDelete() {

    let res = await axios.delete(`http://localhost:3002/content/delete/${contentId}`, {headers:{
      Authorization:localStorage.getItem('token')}});
      onDelete();

    if (res) {
      console.log(res);
      console.log("content  deleted successfully ");
    }

 
  }

  //
  return (
    <span className=" inline-block bg-gray-200   rounded-md m-5 px-5 text-gray-600 py-3 border-gray-300 border">
      <div className="flex items-center justify-between">
        {logo}
        <h1 className="text-xl font-semibold tracking-tighter px-4">{title}</h1>
        <div className="flex items-center justify-between gap-2">
          <Share />
          <div className="hover:shadow-sm hover:shadow-black rounded-full  " onClick={handleDelete}>
            <Delete />
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center mt-8">
        {type === "youtube" && (
          <iframe
            className="rounded-md"
            src={watchToembed(url)}
            title="YouTube vcontentIdeo player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}

        {type === "twitter" && (
          <blockquote className="twitter-tweet">
            <a href={linktoTwitter(url)}></a>
          </blockquote>
        )}
      </div>
      <div className="mt-4">tags</div>
      <div className="my-2">{timeSplit()}</div>
    </span>
  );
}

export default Card;
