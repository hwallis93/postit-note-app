import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { assignWord, activePlayerSelector } from "./redux/index";
import PlayerList from "./PlayerList";

const Play = () => {
  const dispatch = useDispatch();
  const { localId } = useSelector((state) => state.localId);
  const { players } = useSelector((state) => state.players);
  const activePlayer = useSelector(activePlayerSelector);

  let localPlayer = null;
  players.some((player) => {
    if (player.id === localId) {
      localPlayer = player;
      return true;
    }
  });

  const localPlayerIsActive = localPlayer.id === activePlayer.id;

  const turnDetails = () => {
    if (localPlayerIsActive) {
      return (
        <div>
          <div>It's your turn!</div>
          <button>I got a no</button>
          <button>I guessed the answer!</button>
        </div>
      );
    } else {
      return (
        <div>
          It's {activePlayer.name}'s turn ({activePlayer.word})
        </div>
      );
    }
  };

  return (
    <div>
      <div>{turnDetails()}</div>
      <div>
        <PlayerList />
      </div>
    </div>
  );
};

export default Play;
