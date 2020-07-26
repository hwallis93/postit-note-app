import React from "react";
import { connect } from "react-redux";

class PlayerList extends React.Component {
  render() {
    const { players } = this.props;

    return (
      <div>
        {players.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    players: state.players.names,
  };
};

export default connect(mapStateToProps)(PlayerList);
