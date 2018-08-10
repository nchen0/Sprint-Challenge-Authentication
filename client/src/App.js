import React, { Component } from "react";
import "./App.css";
import SignIn from "./components/SignIn";
import { Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import Jokes from "./components/Jokes";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Killer Jokes</h1>
        </header>
        <Route exact path="/" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/jokes" component={Jokes} />
      </div>
    );
  }
}

export default App;
