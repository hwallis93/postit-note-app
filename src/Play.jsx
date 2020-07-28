import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTurn, activePlayerSelector } from "./redux/index";
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

  const handleNo = () => {
    const playerIndex = players.findIndex(
      (player) => player.id === activePlayer.id
    );
    let nextPlayerIndex;
    if (playerIndex < players.length - 1) {
      nextPlayerIndex = playerIndex + 1;
    } else {
      nextPlayerIndex = 0;
    }

    dispatch(setTurn(players[nextPlayerIndex].id));
  };

  const handleCorrectGuess = () => {};

  const turnDetails = () => {
    if (localPlayerIsActive) {
      return (
        <div>
          <div>It's your turn!</div>
          <button onClick={handleNo}>I got a no</button>
          <button onClick={handleCorrectGuess}>I guessed the answer!</button>
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
