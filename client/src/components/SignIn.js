import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }
  addLogin = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  submitLogin = event => {
    event.preventDefault();
    const loginUser = { username: this.state.username, password: this.state.password };
    axios
      .post("http://localhost:5000/api/login", loginUser)
      .then(response => {
        localStorage.setItem("jwt", response.data);
        this.props.history.push("/jokes");
      })
      .catch(err => {
        alert("Invalid Username or Password");
      });
  };

  render() {
    return (
      <div>
        <h2>Log In, or Register Below</h2>
        <form>
          <input
            onChange={this.addLogin}
            name="username"
            type="text"
            placeholder="Enter your username"
          />
          <input
            onChange={this.addLogin}
            name="password"
            type="password"
            placeholder="Enter your password"
          />
        </form>
        <button onClick={this.submitLogin}>Log In</button>
        <hr />
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
      </div>
    );
  }
}

export default SignIn;
