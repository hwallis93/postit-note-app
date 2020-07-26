import { remoteAction, remoteCombineReducers } from "./remote";
const shared = (state = { messages: [] }, action) => {
  switch (action.type) {
    case "SAY":
      return { messages: [...state.messages, action.message] };
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

export const reducer = remoteCombineReducers({ name }, { shared });

export const say = (message) =>
  remoteAction({
    type: "SAY",
    message,
  });

export const updateName = (name) => ({
  type: "NAME",
  name,
});
