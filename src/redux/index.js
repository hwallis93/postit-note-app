import { remoteAction, remoteCombineReducers } from "./remote";
import cloneDeep from "lodash/cloneDeep";

// Player {
//   name: "a_name",
//   id: number  // 1 - 1,000,000,000
//   word: "a_word",
//   author: "another_name",
// };

const lifecycle = (state = { lifecycle: "GET_PLAYERS" }, action) => {
  switch (action.type) {
    case "LIFECYCLE":
      return { lifecycle: action.stage };
    default:
      return state;
  }
};

const players = (state = { players: [] }, action) => {
  switch (action.type) {
    case "ADD_PLAYER":
      const { name } = action;
      return {
        players: [
          ...state.players,
          { name, id: `${Math.random()}`, word: "", author: "" },
        ],
      };
    case "ASSIGN_AUTHOR":
      const { targetId, author } = action;
      const players = cloneDeep(state.players);

      const newPlayers = players.map((player) => {
        if (player.id === targetId) {
          player.author = author;
        }
        return player;
      });

      return {
        players: newPlayers,
      };
    case "WRITE_WORD":
      return state;

    default:
      return state;
  }
};

const name = (state = { name: "no name" }, action) => {
  switch (action.type) {
    case "NAME":
      return { name: action.name };
    default:
      return state;
  }
};

export const reducer = remoteCombineReducers({ name }, { players, lifecycle });

// Set player's local name
export const updateLocalName = (name) => ({
  type: "NAME",
  name,
});

// Add a player name to global list of players
export const addPlayer = (name) =>
  remoteAction({
    type: "ADD_PLAYER",
    name,
  });

// Add a player name to global list of players
export const advanceLifecycle = (stage) =>
  remoteAction({
    type: "LIFECYCLE",
    stage, // "GET_PLAYERS", "WRITE_WORDS"
  });

/**
 * payload = {targetId, author}
 * @param {string} targetId // ID of player being given an author
 * @param {string} author // Name of author
 */
export const assignAuthor = (targetId, author) =>
  remoteAction({
    type: "ASSIGN_AUTHOR",
    targetId,
    author,
  });
