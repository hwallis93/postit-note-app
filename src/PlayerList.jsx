import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as S from "./PlayerListStyles";
import { advanceLifecycle, setTurn, activePlayerSelector } from "./redux/index";

const PlayerList = () => {
  const dispatch = useDispatch();
  const { players } = useSelector((state) => state.players);
  const { lifecycle } = useSelector((state) => state.lifecycle);
  const activePlayer = useSelector(activePlayerSelector);
  const { localId } = useSelector((state) => state.localId);

  const playerDetails = (player, hideWord = true) => {
    if (player.id === localId && hideWord) {
      return `${player.name} (*****)`;
    } else {
      return `${player.name} (${player.word})`;
    }
  };

  const listFromLifeCycle = () => {
    switch (lifecycle) {
      case "GET_PLAYERS": {
        return (
          <S.GetPlayers>
            {players.map((player, index) => (
              <li key={index}>{player.name}</li>
            ))}
          </S.GetPlayers>
        );
      }
      case "WRITE_WORDS": {
        const allWritten = players.every((player) => {
          return player.word !== "";
        });

        if (allWritten) {
          dispatch(setTurn(players[0].id));
          dispatch(advanceLifecycle("PLAY"));
        }

        return (
          <div>
            {players.map((player, index) => {
              let emoji;
              for (const p of players) {
                if (player.id === p.author.id) {
                  if (p.word === "") {
                    emoji = "✏️";
                  } else {
                    emoji = "✅";
                  }
                  break;
                }
              }
              return (
                <li key={index}>
                  {emoji} {player.name}
                </li>
              );
            })}
          </div>
        );
      }
      case "PLAY": {
        return (
          <div>
            {players.map((player, index) => {
              let status;
              if (player.hasGuessed) {
                return (
                  <li key={index}>
                    <S.Guessed>
                      {playerDetails(player, false)} {"✔️"}
                    </S.Guessed>
                  </li>
                );
              } else if (player.id === activePlayer.id) {
                return (
                  <li key={index}>
                    <S.ActivePlayer>
                      {playerDetails(player)} {"👈"}
                    </S.ActivePlayer>
                  </li>
                );
              } else {
                return <li key={index}>{playerDetails(player)}</li>;
              }
            })}
          </div>
        );
      }
    }
  };

  return (
    <div>
      <div style={{ paddingLeft: "5px", paddingBottom: "5px" }}>PLAYERS</div>
      {listFromLifeCycle()}
    </div>
  );
};

export default PlayerList;
