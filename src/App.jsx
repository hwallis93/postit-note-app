import React, { Component } from "react";
import Messages from "./Messages";
import WhoAmI from "./WhoAmI";
import PlayerList from "./PlayerList";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App--header">
          <h1 className="App--title">Mixed local and shared model</h1>
        </header>
        <div className="App--content">
          <div className="App--content-item">
            <p className="App--content-item-header">Messages</p>
            <Messages />
          </div>
          <div>
            <WhoAmI />
          </div>
          <div>
            <PlayerList />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
