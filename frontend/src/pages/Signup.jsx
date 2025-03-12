import axios from "axios";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";


function Signup() {
  const passwordref = useRef(null);
  const usernameref = useRef(null);
  const [info , setInfo ] = useState('');


  async function handleSubmit(){
    
    let name = usernameref.current.value;
    let password = passwordref.current.value;
    
    try {
      let response = await axios.post("http://localhost:3002/user/signup", {
        userName: name,
        password: password,
      });

      setInfo(response.data.msg); // ✅ Display success message
    } catch (error) {
      console.error(error);
      setInfo(error.response?.data?.msg || "Signup failed. Try again."); // ✅ Show error from server
      usernameref.current.value="";
      passwordref.current.value="";
    }
    
 
  }


  return (
    <div className="flex justify-center items-center w-screen h-screen bg-bgcolor ">
      <div className="bg-sidebarbg w-1/3 p-5 rounded-lg">
        <h1 className="text-4xl font-bold border-b-1 border-gray-700 text-center my-5 pb-4 border-gray-500">Signup</h1>
        <label className='text-lg font-semibold ' to='username'>Email
          <input ref={usernameref} className='border border-gray-400 w-full rounded-md px-4 py-1 my-2' type="text" id="username" placeholder="deep@gmail.com" />
        </label>
        <label className='text-lg font-semibold ' to='password'>Password
          <input ref={passwordref} className='border  border-gray-400 w-full rounded-md px-4 py-1 my-2' type="password" id="password" placeholder="122456" />
        </label>
        {info && (
          <div className=" mt-4 py-2 font-semibold text-center border rounded-md">
            {info}
          </div>
        )}
        <button onClick={handleSubmit} className="w-full py-2 hover:bg-newbtn hover:text-white rounded-md border border-gray-300 rounded-md bg-[#f26b8a] text-lg font-semibold mt-6 mb-2">Submit</button>
        <span className="mt-1 inline-block ">If you already have account / <Link to='/signin' className="underline font-bold hover:font-semibold hover:font-gray-600">SignIn</Link></span>
      </div>
    </div>
  )
}

export default Signup