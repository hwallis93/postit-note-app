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
    case "ADD_PLAYER": {
      const { name, id } = action;
      return {
        players: [...state.players, { name, id, word: "", author: "" }],
      };
    }
    case "ASSIGN_AUTHOR": {
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
    }
    case "ASSIGN_WORD": {
      const { targetId, word } = action;

      const players = cloneDeep(state.players);
      const newPlayers = players.map((player) => {
        if (player.id === targetId) {
          player.word = word;
        }
        return player;
      });

      return {
        players: newPlayers,
      };
    }

    default:
      return state;
  }
};

const localId = (state = { localId: null }, action) => {
  switch (action.type) {
    case "LOCAL_ID":
      const { id } = action;
      return { localId: id };
    default:
      return state;
  }
};

export const reducer = remoteCombineReducers(
  { localId },
  { players, lifecycle }
);

// Set player's local ID
export const updateLocalId = (id) => ({
  type: "LOCAL_ID",
  id,
});

// Add a player name to global list of players
export const addPlayer = (name, id) =>
  remoteAction({
    type: "ADD_PLAYER",
    name,
    id,
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

/**
 * payload = {targetId, author}
 * @param {string} targetId // ID of player being given an author
 * @param {string} word // Word to be guessed
 */
export const assignWord = (targetId, word) =>
  remoteAction({
    type: "ASSIGN_WORD",
    targetId,
    author,
  });

// Selectors
export const playerFromId = (state) => (id) => {
  let targetPlayer;
  console.log(id);
  console.log(state);
  state.players.players.some((player) => {
    if (player.id === id) {
      targetPlayer = player;
      return true;
    }
  });
  return targetPlayer;
};
