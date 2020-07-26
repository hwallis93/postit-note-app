import { remoteAction, remoteCombineReducers } from "./remote";
const shared = (state = { messages: [] }, action) => {
  switch (action.type) {
    case "SAY":
      return { messages: [...state.messages, action.message] };
    default:
      return state;
  }
};

const players = (state = { names: [] }, action) => {
  switch (action.type) {
    case "ADD_PLAYER":
      return { names: [...state.names, action.name] };
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

export const reducer = remoteCombineReducers({ name }, { shared, players });

export const say = (message) =>
  remoteAction({
    type: "SAY",
    message,
  });

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
