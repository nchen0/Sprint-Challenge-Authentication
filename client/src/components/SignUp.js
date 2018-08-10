import React from "react";
import axios from "axios";

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }
  inputAccount = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  submitRegistration = event => {
    event.preventDefault();
    const newUser = { username: this.state.username, password: this.state.password };
    if (!newUser.username || !newUser.password) {
      alert("Please enter a username and password.");
    }
    axios
      .post("http://localhost:5000/api/register", newUser)
      .then(response => {
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <div>
        <h2>Sign Up for an account</h2>
        <form>
          <input
            onChange={this.inputAccount}
            type="text"
            name="username"
            placeholder="Create a username"
          />
          <input
            onChange={this.inputAccount}
            type="password"
            name="password"
            placeholder="Create a password"
          />
        </form>
        <button onClick={this.submitRegistration}>Submit Registration</button>
      </div>
    );
  }
}

export default SignUp;
