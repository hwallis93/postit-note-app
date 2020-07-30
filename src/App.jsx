import React, { Component } from "react";
import { useSelector, useDispatch } from "react-redux";

import * as S from "./AppStyles";
import WhoAmI from "./WhoAmI";
import WriteWords from "./WriteWords";
import Play from "./Play";
import Rejoin from "./Rejoin";
import PlayerList from "./PlayerList";

import { resetRemote } from "./redux/index";

const App = () => {
  const dispatch = useDispatch();
  const { lifecycle } = useSelector((state) => state.lifecycle);
  const { localId } = useSelector((state) => state.localId);

  const resetGame = () => {
    dispatch(resetRemote());
  };

  const activeComponent = () => {
    if (lifecycle !== "GET_PLAYERS" && localId === "") {
      return <Rejoin />;
    }
    switch (lifecycle) {
      case "GET_PLAYERS":
        return <WhoAmI />;
      case "WRITE_WORDS":
        return <WriteWords />;
      case "PLAY":
        return <Play />;
      case "GAME_OVER":
        return (
          <div>
            Game over! <button onClick={resetGame}>Play again</button>
          </div>
        );
      default:
        return <span>No lifecycle set!</span>;
    }
  };

  const showPlayers = () => {
    if (lifecycle !== "GET_PLAYERS" && localId === "") {
      return <span></span>;
    } else {
      return (
        <S.Players>
          <PlayerList />
        </S.Players>
      );
    }
  };

  return (
    <S.Global>
      <div>
        <S.Title>THE POST-IT NOTE GAME</S.Title>
      </div>
      <div>
        <S.Body>{activeComponent()}</S.Body>
      </div>
      <div>{showPlayers()}</div>
    </S.Global>
  );
};

export default App;
