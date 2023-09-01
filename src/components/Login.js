import React, { useRef, useState } from "react";
import Header from "./Header";
import { BG_URL } from "../utils/constants";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [showPassword, SetShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const handleButtonClick = () => {
    //validate form data
    const message = checkValidData(email.current.value, password.current.value);
    setError(message);
    if (message) return;

    if (!isSignIn) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          updateProfile(user, {
            displayName: name.current.value,
            photoURL:
              "https://media.licdn.com/dms/image/D5603AQEWKjl0Cb5Rvw/profile-displayphoto-shrink_200_200/0/1672116335784?e=1698883200&v=beta&t=11ehJ4JRuM3ZpIDrl3Yzl4C205aE45yOnkCiYtSJO1s",
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              navigate("/browse");
              // ...
            })
            .catch((error) => {
              // An error occurred
              setError(error);
              // ...
            });

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorCode + "_" + errorMessage);
          // ..
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("logged in", user);
          navigate("/browse");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorCode + "_" + errorMessage);
        });
    }
  };

  return (
    <div className="relative">
      <Header />
      <div className="absolute">
        <img src={BG_URL} alt="banner" />
      </div>
      <div
        className="absolute bg-black bg-opacity-75 w-4/12 my-[4rem]
       mx-auto left-0 right-0  rounded-lg h-[660px] shadow-lg"
      >
        <form
          className="text-white px-[68px]"
          onSubmit={(e) => e.preventDefault()}
        >
          <h1 className={`font-bold text-3xl p-2 mt-8 mb-6`}>
            {isSignIn ? "Sign in" : "Sign up"}
          </h1>
          {!isSignIn && (
            <input
              ref={name}
              className="p-3 my-2 mx-2 w-full rounded bg-[#333]"
              type="text"
              placeholder="Full Name"
            />
          )}
          <input
            ref={email}
            className={`p-3  mx-2 w-full rounded bg-[#333] ${
              isSignIn ? " mt-[72px] mb-2" : "my-2"
            }`}
            type="text"
            placeholder="Email or Phone number "
          />
          <div className="relative">
            <input
              ref={password}
              className="p-3 my-2 w-full mx-2 rounded bg-[#333] "
              type={`${showPassword ? "text" : "password"}`}
              placeholder="password"
            />
            {showPassword ? (
              <span
                className="absolute top-5 right-0 text-slate-400 cursor-pointer"
                onClick={() => {
                  SetShowPassword(false);
                }}
              >
                Hide
              </span>
            ) : (
              <span
                className="absolute top-5 right-0 text-slate-400 cursor-pointer"
                onClick={() => {
                  SetShowPassword(true);
                }}
              >
                Show
              </span>
            )}
          </div>
          <p className="text-red-500 font-bold tex py-2">{error}</p>
          <button
            className=" bg-[#e50914] p-3 font-bold  mx-2 my-6 w-full rounded"
            type="submit"
            onClick={handleButtonClick}
          >
            {isSignIn ? "Sign in" : "Sign up"}
          </button>
        </form>
        <p
          className=" text-white px-16 mt-8 cursor-pointer"
          onClick={() => setIsSignIn(!isSignIn)}
        >
          {isSignIn
            ? "New to MovieBoxGPT? Sign up now"
            : " Already have an Account? Sign In"}
        </p>
      </div>
    </div>
  );
};

export default Login;
