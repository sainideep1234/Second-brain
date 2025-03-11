import { useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // ✅ Import for redirection

function Signin() {
  const passwordref = useRef(null);
  const usernameref = useRef(null);
  const [info, setInfo] = useState(""); // ✅ State to show messages
  const navigate = useNavigate(); // ✅ Use for redirection

  async function handleSubmit() {
    let name = usernameref.current?.value;
    let password = passwordref.current?.value;

    if (!name || !password) {
      setInfo("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3002/user/signin", {
        userName: name,
        password: password,
      });

      let token = response.data.token;
      if (token) {
        localStorage.setItem("token", token);
        setInfo("Login successful! Redirecting..."); // ✅ Show success message
        setTimeout(() => navigate("/"), 2000); // ✅ Redirect after 2 sec
      }
    } catch (error) {
      console.error(error);
      setInfo(error.response?.data?.msg || "Login failed. Try again.");
       usernameref.current.value="";
       passwordref.current.value="";
    }
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-bgcolor ">
      <div className="bg-sidebarbg w-1/3 p-5 rounded-lg border border-gray-300 shadow-md">
        <h1 className="text-4xl font-bold border-b border-gray-500 border-gray-700 text-center my-5 pb-4">
          Sign In
        </h1>
        <label className="text-lg font-semibold" htmlFor="username">
          Email
          <input
            ref={usernameref}
            className="border border-gray-400 w-full rounded-md px-4 py-1 my-2"
            type="text"
            id="username"
            placeholder="deep@gmail.com"
          />
        </label>
        <label className="text-lg  font-semibold" htmlFor="password">
          Password
          <input
            ref={passwordref}
            className="border border-gray-400 w-full rounded-md px-4 py-1 my-2"
            type="password"
            id="password"
            placeholder="******"
          />
        </label>

        {/* ✅ Show error or success message */}
        {info && (
          <div
            className={`px-5 py-2 border-white-1 border   font-semibold text-center rounded-md mt-2 ${
              info.includes("failed") ? "bg-red-200" : "bg-white-500"
            }`}
          >
            {info}
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="w-full py-2 hover:bg-newbtn hover:text-white border border-gray-300 rounded-md bg-[#f26b8a] text-lg font-semibold mt-6 mb-2"
        >
          Submit
        </button>
        <span className="mt-1 inline-block ">If you already have account / <Link to='/signup' className="underline font-bold hover:font-semibold hover:font-gray-600">SignUp</Link></span>
      </div>
    </div>
  );
}

export default Signin;
