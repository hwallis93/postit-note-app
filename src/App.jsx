import React, { Component } from "react";
import WhoAmI from "./WhoAmI";
import WriteWords from "./WriteWords";
import Play from "./Play";

import "./App.css";
import { useSelector } from "react-redux";

const App = () => {
  const { lifecycle } = useSelector((state) => state.lifecycle);

  const activeComponent = () => {
    switch (lifecycle) {
      case "GET_PLAYERS":
        return <WhoAmI />;
      case "WRITE_WORDS":
        return <WriteWords />;
      case "PLAY":
        return <Play />;
      default:
        return <span>No lifecycle set!</span>;
    }
  };

  return (
    <div>
      <header>The posit note game</header>
      <div>{activeComponent()}</div>
    </div>
  );
};

export default App;
