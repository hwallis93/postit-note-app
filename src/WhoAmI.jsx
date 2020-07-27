import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateLocalName,
  addPlayer,
  advanceLifecycle,
  assignAuthor,
} from "./redux/index";
import PlayerList from "./PlayerList";

import cloneDeep from "lodash/cloneDeep";
import * as S from "./WhoAmIStyles";

const WhoAmI = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const { name } = useSelector((state) => state.name);
  const { players } = useSelector((state) => state.players);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addPlayer(text));
    dispatch(updateLocalName(text));
    setText("");
  };

  const formOrGreeting = () => {
    if (name == "no name") {
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
      return <span>Hello {name}!</span>;
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
