const functions = require("firebase-functions");
const express = require("express");
const http = require("http");
const path = require("path");
const WebSocket = require("ws");
const { createStore } = require("redux");
const { reducer } = require("../src/redux");
const { remoteUpdate } = require("../src/redux/remote");
const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client/index.html"));
});

app.use(express.static(path.join(__dirname, "client")));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const store = createStore(reducer);

store.subscribe(() => {
  // Something has changed in the state, let every client know by sending an update action
  const action = remoteUpdate(store.getState());

  wss.clients.forEach((ws) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(action));
    }
  });
});

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    console.log(message);
    store.dispatch(JSON.parse(message));
  });
  ws.on("error", (err) => {
    console.log("ws error", err);
  });
  ws.send(JSON.stringify(remoteUpdate(store.getState())));
});

server.listen(3000, function listening() {
  console.log("Listening on %d", server.address().port);
});

exports.app = functions.https.onRequest(app);
