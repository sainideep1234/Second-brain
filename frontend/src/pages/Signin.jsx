import { useRef } from "react";
import Inputbox from "../components/Inputbox";
import { BACKEND_URL } from "../../config";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Signin() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  async function signin() {
    const name = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await axios.post(`${BACKEND_URL}user/signin`, {
        userName: name,
        password: password,
      });

      // Store the token in localStorage
      localStorage.setItem("token", response.data.token);

      // Navigate to dashboard
      navigate("/");
    } catch (error) {
      // Handle errors gracefully
      console.error(error.response?.data?.msg || "Something went wrong");
      alert(error.response?.data?.msg || "Login failed");
    }
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="w-1/3 bg-mainbg rounded-lg p-10">
        <h1 className="font-bold uppercase text-5xl text-center border-b pb-3">
          Sign in
        </h1>

        {/* Input Fields */}
        <Inputbox
          ref={emailRef}
          placeholder={"deep@gmail.com"}
          id={"email"}
          title={"Email"}
        />
        <Inputbox
          ref={passwordRef}
          placeholder={"1234567"}
          id={"password"}
          title={"Password"}
        />

        {/* Submit Button */}
        <button
          onClick={signin}
          className="bg-black text-white w-full mt-6 py-1 rounded-xl text-2xl hover:bg-zinc-800 hover:cursor-pointer mb-2"
        >
          Submit
        </button>

        {/* Sign-Up Link */}
        <div className="flex gap-1 mt-1">
          <span className="text-gray-600">If Not have Account?</span>
          <Link className="border-b hover:border-none" to="/signup">
            SignUp
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signin;
