import { useEffect, useState } from "react";
import axios from "axios";


function useContent(url) {
  const [contents, setcontent] = useState();

  try {
    useEffect(() => {
      async function fetchdata() {
        const response = await axios.get(url, {
          headers: localStorage.getItem("token")
        });

        setcontent(response.data.content);
      }
      fetchdata();
    }, []);
    
    console.log(contents);
   
  
  } catch (error) {
    console.log(error);
    
  }

  return contents;
}

export default useContent;
