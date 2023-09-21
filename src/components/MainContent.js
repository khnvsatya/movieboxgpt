import React from "react";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";

import { useSelector } from "react-redux";
import GptSearch from "./GptSearch";

const MainContent = () => {
  const showGpt = useSelector((store) => store.gpt.showGptSearch);
  const user = useSelector((store) => store.user);

  return (
    <div>
      <Header />

      {showGpt ? (
        <GptSearch />
      ) : (
        user && (
          <>
            <MainContainer />
            <SecondaryContainer />
          </>
        )
      )}
    </div>
  );
};

export default MainContent;
