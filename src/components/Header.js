import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { LOGO, SUPPORT_LANGUAGES } from "../utils/constants";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGpt = useSelector((store) => store.gpt.showGptSearch);
  const defaultLang = useSelector((store) => store.config.lang);

  const handleClick = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  const handleShowGpt = () => {
    dispatch(toggleGptSearchView());
  };

  const handleSelect = (e) => {
    dispatch(changeLanguage(e.target.value));
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
    <div className="absolute flex justify-between w-[100%] z-10 px-8 py-1 bg-gradient-to-b from-black ">
      <img src={LOGO} alt="logo" className="w-44" />
      {user && (
        <div className="flex ">
          {showGpt && (
            <div className="px-2 my-3 ">
              <select
                name="language"
                id="language"
                className=" focus:outline-none rounded bg-black text-white py-1 px-2"
                onChange={(e) => handleSelect(e)}
                defaultValue={defaultLang}
              >
                {SUPPORT_LANGUAGES.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="pt-3 px-3" onClick={handleShowGpt}>
            <button className="text-white bg-purple-700 p-1 rounded">
              {showGpt ? "Home Page" : "Gpt Search"}
            </button>
          </div>
          <div>
            <img src={user?.photoURL} className="w-12 h-12" alt="user-logo" />
            <button className="text-white font-medium" onClick={handleClick}>
              SignOut
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
