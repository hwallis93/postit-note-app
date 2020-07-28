import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateLocalId,
  addPlayer,
  advanceLifecycle,
  assignAuthor,
  playerFromId,
} from "./redux/index";
import PlayerList from "./PlayerList";

import cloneDeep from "lodash/cloneDeep";
import * as S from "./WhoAmIStyles";

const WhoAmI = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const { localId } = useSelector((state) => state.localId);
  const { players } = useSelector((state) => state.players);

  let localPlayer = null;
  players.some((player) => {
    if (player.id === localId) {
      localPlayer = player;
      return true;
    }
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const id = `${Math.random()}`;

    dispatch(addPlayer(text, id));
    dispatch(updateLocalId(id));
    setText("");
  };

  const formOrGreeting = () => {
    if (localId === null) {
      return (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    } else {
      return <span>Hello {localPlayer?.name}!</span>;
    }
  };

  const allPlayersIn = () => {
    const allPlayers = cloneDeep(players);
    allPlayers.sort(() => Math.random() - 0.5);

    for (let i = 0; i < allPlayers.length; i++) {
      const target = allPlayers[i];
      const author =
        i === allPlayers.length - 1 ? allPlayers[0] : allPlayers[i + 1];
      dispatch(assignAuthor(target.id, author.name));
    }
    dispatch(advanceLifecycle("WRITE_WORDS"));
  };

  return (
    <S.Wrapper>
      <div>{formOrGreeting()}</div>
      <div>
        <button onClick={allPlayersIn}>All players in</button>
      </div>
      <div>
        <PlayerList />
      </div>
    </S.Wrapper>
  );
};
export default WhoAmI;
