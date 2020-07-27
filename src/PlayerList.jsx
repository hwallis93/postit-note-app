import React from "react";
import { useSelector } from "react-redux";

const PlayerList = () => {
  const { players } = useSelector((state) => state.players);

  return (
    <div>
      <div> --- Players --- </div>
      <div>
        {players.map((player, index) => (
          <li key={index}>{player.name}</li>
        ))}
      </div>
    </div>
  );
};

export default PlayerList;
