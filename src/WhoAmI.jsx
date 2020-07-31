import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateLocalId,
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
  const { localId } = useSelector((state) => state.localId);
  const { players } = useSelector((state) => state.players);

  useEffect(() => {
    dispatch(updateLocalId(""));
  }, []);

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
    if (localId === "") {
      return (
        <S.FormWrapper>
          <form onSubmit={handleSubmit}>
            <S.Entry>
              <S.Box
                type="text"
                value={text}
                placeholder="Your name here"
                onChange={(e) => setText(e.target.value)}
              />
              <span style={{ paddingLeft: "5px" }}></span>
              <S.Submit type="submit" value="Join" />
            </S.Entry>
          </form>
        </S.FormWrapper>
      );
    } else {
      return (
        <div>
          <span>Hello {localPlayer?.name}!</span>{" "}
          <div
            style={{
              paddingLeft: "5px",
              paddingTop: "55px",
              paddingBottom: "5px",
            }}
          >
            <button
              style={{ backgroundColor: "#a1eb42" }}
              onClick={allPlayersIn}
            >
              Start game with these players
            </button>
          </div>
        </div>
      );
    }
  };

  const allPlayersIn = () => {
    const allPlayers = cloneDeep(players);
    allPlayers.sort(() => Math.random() - 0.5);

    for (let i = 0; i < allPlayers.length; i++) {
      const target = allPlayers[i];
      const author =
        i === allPlayers.length - 1 ? allPlayers[0] : allPlayers[i + 1];
      dispatch(assignAuthor(target.id, author.name, author.id));
    }
    dispatch(advanceLifecycle("WRITE_WORDS"));
  };

  return (
    <S.Wrapper>
      <div style={{ height: "40px" }}>{formOrGreeting()}</div>
    </S.Wrapper>
  );
};
export default WhoAmI;
