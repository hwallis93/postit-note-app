import React from "react";
import { connect } from "react-redux";
import { updateLocalName, addPlayer } from "./redux/index";

class WhoAmI extends React.Component {
  render() {
    const { name, updateLocalName, addPlayer } = this.props;

    return (
      <div>
        <span>Your name is {name}!</span>
        <form
          onSubmit={(e) => {
            const name = this.numberInput.value;
            e.preventDefault();
            updateLocalName(name);
            addPlayer(name);
            this.numberInput.value = "";
          }}
        >
          <input ref={(ref) => (this.numberInput = ref)} />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    name: state.name.name,
  };
};

const mapDispatchToProps = {
  updateLocalName,
  addPlayer,
};

export default connect(mapStateToProps, mapDispatchToProps)(WhoAmI);
