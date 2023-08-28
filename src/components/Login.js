import React, { useState } from "react";
import Header from "./Header";
import { BG_URL } from "../utils/constants";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="relative">
      <Header />
      <div className="absolute">
        <img src={BG_URL} alt="banner" />
      </div>
      <div
        className="absolute bg-black bg-opacity-75 w-4/12 my-[4rem]
       mx-auto left-0 right-0  rounded-lg h-[100vh] shadow-lg"
      >
        <form className="text-white px-[68px] ">
          <h1 className="font-bold text-3xl p-2 mt-8 mb-6">
            {isSignIn ? "Sign in" : "Sign up"}
          </h1>
          {!isSignIn && (
            <input
              className="p-3 my-2 mx-2 w-full rounded bg-[#333]"
              type="text"
              placeholder="Full Name"
            />
          )}
          <input
            className="p-3 my-2 mx-2 w-full rounded bg-[#333]"
            type="text"
            placeholder="Email or Phone number "
          />
          <input
            className="p-3 my-2 w-full mx-2 rounded bg-[#333]"
            type="password"
            placeholder="password"
          />
          <button
            className=" bg-[#e50914] p-3 font-bold  mx-2 my-6 w-full rounded"
            type="submit"
          >
            {isSignIn ? "Sign in" : "Sign up"}
          </button>
        </form>
        <p
          className=" text-white px-16 mt-8 cursor-pointer"
          onClick={() => setIsSignIn(!isSignIn)}
        >
          {isSignIn ? "New User? Sign up" : " Already have an Account? Sign In"}
        </p>
      </div>
    </div>
  );
};

export default Login;
