import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setTurn,
  activePlayerSelector,
  guessedAnswer,
  advanceLifecycle,
} from "./redux/index";
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

  const endTurn = () => {
    const playerIndex = players.findIndex(
      (player) => player.id === activePlayer.id
    );
    const advanceIndex = (index) => {
      return index < players.length - 1 ? index + 1 : 0;
    };

    let nextPlayerIndex = advanceIndex(playerIndex);

    while (players[nextPlayerIndex].hasGuessed) {
      nextPlayerIndex = advanceIndex(nextPlayerIndex);
    }

    dispatch(setTurn(players[nextPlayerIndex].id));
  };

  const handleCorrectGuess = () => {
    const remainingPlayerCount = players.filter((player) => {
      return !player.hasGuessed;
    }).length;

    if (remainingPlayerCount === 1) {
      dispatch(guessedAnswer(activePlayer.id));
      dispatch(advanceLifecycle("GAME_OVER"));
    } else {
      dispatch(guessedAnswer(activePlayer.id));
      endTurn();
    }
  };

  const turnDetails = () => {
    if (localPlayerIsActive) {
      return (
        <div>
          <div>It's your turn!</div>
          <button onClick={endTurn}>I got a no</button>
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

  return <div>{turnDetails()}</div>;
};

export default Play;
