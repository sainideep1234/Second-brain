import axios from "axios";
import { useEffect, useState } from "react";

function useShare(url) {
  const [Sharecontent, setsharecontent] = useState([]);

  useEffect(() => {
    async function fetchdata() {
      try {
        const response = await axios.get(url);
        setsharecontent(response.data.contents);
        console.log(Sharecontent);
      } catch (error) {
        console.log("Error fetching data:", error);
        setsharecontent([]); // Error aaye toh empty array return karo
      }
    }
    fetchdata();
  }, []); // URL dependency add karni chahiye

  return Sharecontent;
}

export default useShare;
