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
        <div>
          <div>
            Please write a word for{" "}
            <span style={{ fontWeight: "bold" }}> {playerTarget.name}</span>
          </div>
          <S.FormWrapper>
            <form onSubmit={handleSubmit}>
              <S.Entry>
                <S.Box
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <span style={{ paddingLeft: "5px" }}></span>
                <S.Submit type="submit" value="Send" />
              </S.Entry>
            </form>
          </S.FormWrapper>
        </div>
      );
    } else {
      return (
        <span>
          You wrote{" "}
          <span style={{ fontWeight: "bold", color: "green" }}>
            {playerTarget.word}
          </span>{" "}
          for {playerTarget.name}. Relax while everyone else writes their words
        </span>
      );
    }
  };

  return (
    <S.Wrapper>
      <div>{writeWordOrRelax()}</div>
    </S.Wrapper>
  );
};
export default WriteWords;
