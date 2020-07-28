import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { assignWord } from "./redux/index";
import PlayerList from "./PlayerList";

import * as S from "./WriteWordsStyles";

const WriteWords = () => {
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
  let playerTarget = null;
  players.some((player) => {
    if (player.author.id === localId) {
      playerTarget = player;
      return true;
    }
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(assignWord(playerTarget.id, text));
    setText("");
  };

  const writeWordOrRelax = () => {
    if (playerTarget.word === "") {
      return (
        <form onSubmit={handleSubmit}>
          <label>
            Word:
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
      return (
        <span>
          You wrote {playerTarget.word} for {playerTarget.name}. Relax while
          everyone else writes their words
        </span>
      );
    }
  };

  return (
    <S.Wrapper>
      <div>{writeWordOrRelax()}</div>
      <div>
        <PlayerList />
      </div>
    </S.Wrapper>
  );
};
export default WriteWords;
