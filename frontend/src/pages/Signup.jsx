import { useRef, useState } from 'react';
import Inputbox from '../components/Inputbox';
import { BACKEND_URL } from '../../config';
import axios from 'axios';


function Signup() {
  const [responsemsg, setResponseMsg] = useState(""); // Fixed casing for clarity
  const emailRef = useRef();
  const passwordRef = useRef();


  async function signup() {
    try {
      const name = emailRef.current.value;
      const password = passwordRef.current.value;

      // Send POST request to the backend
      const response = await axios.post(`${BACKEND_URL}user/signup`, {
        userName: name,
        password: password,
      });

      // Set response message from backend
      setResponseMsg(response.data.msg || "Signup successful!");

  

    } catch (error) {
      // Handle error responses
      if (error.response) {
        // Server responded with a status other than 2xx
        setResponseMsg(error.response.data.msg || "An error occurred.");
      } else if (error.request) {
        // Request was made but no response received
        setResponseMsg("No response from the server. Please try again.");
      } else {
        // Something else happened
        setResponseMsg("Something went wrong. Please try again later.");
      }
    }
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="w-1/3 bg-mainbg rounded-lg p-10">
        <h1 className="font-bold uppercase text-5xl text-center border-b pb-3">
          Sign Up
        </h1>

        {/* Input Fields */}
        <Inputbox ref={emailRef} placeholder={"deep@gmail.com"} id={"email"} title={"Email"} />
        <Inputbox ref={passwordRef} placeholder={"1234567"} id={"password"} title={"Password"} />

        {/* Submit Button */}
        <button
          onClick={signup}
          className="bg-black text-white w-full mt-10 py-1 rounded-xl text-2xl hover:bg-zinc-800 hover:cursor-pointer mb-2"
        >
          Submit
        </button>

        {/* Response Message */}
        {responsemsg && (
          <div className="text-red-800 w-full py-2 text-center border border-red-800 rounded-lg mt-4">
            {responsemsg}
          </div>
        )}

        {/* Sign-In Link */}
        <div className="flex gap-1 mt-4">
          <span className="text-gray-600">If already have an account?</span>
          <a className="border-b hover:border-none" href="/signin">
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
}

export default Signup;
