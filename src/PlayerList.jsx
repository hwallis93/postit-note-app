import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { advanceLifecycle, setTurn } from "./redux/index";

const PlayerList = () => {
  const dispatch = useDispatch();
  const { localId } = useSelector((state) => state.localId);
  const { players } = useSelector((state) => state.players);
  const { lifecycle } = useSelector((state) => state.lifecycle);

  const listFromLifeCycle = () => {
    switch (lifecycle) {
      case "GET_PLAYERS": {
        return (
          <div>
            {players.map((player, index) => (
              <li key={index}>{player.name}</li>
            ))}
          </div>
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
    }
  };

  return (
    <div>
      <div> --- Players --- </div>
      {listFromLifeCycle()}
    </div>
  );
};

export default PlayerList;
