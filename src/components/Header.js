import React from "react";
import { LOGO } from "../utils/constants";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const handleClick = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  return (
    <div className="absolute flex justify-between w-screen z-10 px-8 py-2 bg-gradient-to-b from-black ">
      <img src={LOGO} alt="logo" className="w-44" />
      {user && (
        <div>
          <button
            className="text-white font-medium w-12 h-12"
            onClick={handleClick}
          >
            <img src={user?.photoURL} alt="user-logo" />
            SignOut
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
