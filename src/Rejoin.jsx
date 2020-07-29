import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateLocalId } from "./redux/index";

const Rejoin = () => {
  const dispatch = useDispatch();
  const { players } = useSelector((state) => state.players);

  const setAsPlayer = (player) => {
    dispatch(updateLocalId(player.id));
  };

  return (
    <div>
      <div>The game is already in progress! Who are you?</div>
      <div>
        {players.map((player, index) => {
          return (
            <li key={index}>
              <button onClick={() => setAsPlayer(player)}>{player.name}</button>
            </li>
          );
        })}
      </div>
    </div>
  );
};

export default Rejoin;
