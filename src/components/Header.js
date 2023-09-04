import React, { useEffect } from "react";
import { LOGO } from "../utils/constants";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const handleClick = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        // console.log("inside", user);
        navigate("/browse");
        // ...,
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="absolute flex justify-between w-[100%] z-10 px-8 py-2 bg-gradient-to-b from-black ">
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
