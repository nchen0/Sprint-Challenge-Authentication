import React from "react";
import Joke from "./Joke";
import axios from "axios";

class Jokes extends React.Component {
  constructor() {
    super();
    this.state = {
      jokes: []
    };
  }
  componentDidMount() {
    let token = localStorage.getItem("jwt");
    const authHeader = {
      headers: {
        authorization: token
      }
    };
    if (token) {
      axios
        .get("http://localhost:5000/api/jokes", authHeader)
        .then(response => {
          this.setState({ jokes: response.data });
        })
        .catch(err => {
          console.log(err.response.data);
        });
    } else {
      setTimeout(() => this.props.history.push("/"), 2000);
    }
  }
  Logout = event => {
    event.preventDefault();
    localStorage.removeItem("jwt");
    this.props.history.push("/");
  };
  render() {
    return (
      <div>
        <button onClick={this.Logout}>Log Out</button>
        {localStorage.getItem("jwt") ? (
          <div>
            {this.state.jokes.map(joke => {
              return <Joke key={Math.random()} joke={joke} />;
            })}
          </div>
        ) : (
          <p>You're not logged in, redirecting...</p>
        )}
      </div>
    );
  }
}

export default Jokes;
