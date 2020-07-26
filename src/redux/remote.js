import { combineReducers } from "redux";
import { isServer } from "../utils/environment";

export const remoteAction = (action) => {
  action.remote = true;
  return action;
};

const remoteReducer = (reducer, name) => {
  return (state, action) => {
    if (action.type === "REMOTE_UPDATE") {
      return action.state[name];
    } else {
      return reducer(state, action);
    }
  };
};

export const remoteCombineReducers = (localReducers, remoteReducers) => {
  if (isServer) {
    return combineReducers(remoteReducers);
  } else {
    Object.keys(remoteReducers).forEach((key) => {
      remoteReducers[key] = remoteReducer(remoteReducers[key], key);
    });
    return combineReducers({ ...localReducers, ...remoteReducers });
  }
};

export const remoteMiddleware = (url) => (store) => {
  const dispatch = remoteDispatch(url, store.dispatch);
  return (next) => (action) => {
    if (action.remote) {
      dispatch(action);
    } else {
      next(action);
    }
  };
};

const remoteDispatch = (url, localDispatch) => {
  const ws = new WebSocket(url);
  ws.onmessage = (message) => {
    console.log(message);
    localDispatch(JSON.parse(message.data));
  };

  return (action) => ws.send(JSON.stringify(action));
};

export const remoteUpdate = (state) => ({
  type: "REMOTE_UPDATE",
  state,
});
