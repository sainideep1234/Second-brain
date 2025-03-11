import { useEffect, useState } from "react";
import axios from "axios";

function useContent(contentType) {
  const [contents, setcontent] = useState();
  const [responseMsg, setResponseMsg] = useState();

  let url = null;

  if (contentType === "youtube") {
    url = "http://localhost:3002/content/youtube";
  } else if (contentType === "twitter") {
    url = "http://localhost:3002/content/twitter";
  } else {
    url = "http://localhost:3002/content/get";
  }

  async function fetchdata() {
    const response = await axios.get(url, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    setResponseMsg(response.data.msg);
    setcontent(response.data.content);
    setTimeout(() => {
      setResponseMsg("");
    }, 2000);
  }


  try {
    useEffect(() => {
      fetchdata();
    }, [contentType]);

    console.log(contents); 

  } catch (error) {
    console.log(error);
  }

  return {contents , responseMsg , fetchdata}  ;
}

export default useContent;
