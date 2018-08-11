import React from "react";
import { Route } from "react-router-dom";
import PunchLine from "./PunchLine";

const Joke = props => {
  return (
    <div>
      <p>{props.joke.setup}</p>
    </div>
  );
};

/*class Joke extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      punchline: false
    };
  }
  seePunchLine = event => {
    event.preventDefault();
    this.setState({ punchline: !this.state.punchline });
  };
  render() {
    console.log("hiiii");
    console.log(this.props);
    return (
      <div>
        <p onClick={this.seePunchLine}>{this.props.joke.setup}</p>
        {this.state.punchline ? <p>{this.props.joke.punchline}</p> : null}
      </div>
    );
  }
}*/

export default Joke;
