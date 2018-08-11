import React from "react";
import Joke from "./Joke";
import axios from "axios";
import { Route, Link } from "react-router-dom";
import PunchLine from "./PunchLine";

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
          localStorage.setItem("joke", JSON.stringify(response.data));
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
          <Route
            exact
            path="/jokes"
            render={() => (
              <div>
                {this.state.jokes.map(joke => {
                  return (
                    <Link to={`/jokes/${joke.id}`}>
                      <div>
                        <Joke key={joke.id} joke={joke} />
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          />
        ) : (
          <p>You're not logged in, redirecting...</p>
        )}
        {/*<Route exact path="/jokes/:id" render={props => <Joke key={Math.random()} {...props} />} />*/}
        <Route exact path="/jokes/:id" render={props => <PunchLine {...props} />} />
      </div>
    );
  }
}

export default Jokes;
