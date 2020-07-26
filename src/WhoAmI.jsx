import React from "react";
import { connect } from "react-redux";
import { updateName } from "./redux/index";

class WhoAmI extends React.Component {
  render() {
    const { name, updateName } = this.props;

    return (
      <div>
        <span>Your name is {name}!</span>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateName(parseInt(this.numberInput.value));
            this.numberInput.value = "";
          }}
        >
          <input
            className="Adder-input"
            type="number"
            ref={(ref) => (this.numberInput = ref)}
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    name: state.name.name,
  };
};

const mapDispatchToProps = {
  updateName,
};

export default connect(mapStateToProps, mapDispatchToProps)(WhoAmI);
