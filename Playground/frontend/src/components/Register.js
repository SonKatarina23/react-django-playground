import React, { Component } from "react";
// import { Link, Redirect } from "react-router-dom";
// import { connect } from "react-redux";

// Import static images
import Chadtagram from "../static-images/Chadtagram.png";

export class Register extends Component {
  state = {
    username: "",
    email: "",
    password1: "",
    password2: ""
  };

  onSubmit = e => {
    e.preventDefault();
    const { username, email, password1, password2 } = this.state;
    console.log("register submitted");
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { username, email, password1, password2 } = this.state;

    return (
      <div className="container">
        <div className="col-md-4 m-auto">
          <div className="card card-body mt-5 mb-5">
            <img
              className="ui medium mx-auto image mb-3"
              src={Chadtagram}
              alt="Chadtagram"
            />
            <div className="text-center text-muted mb-2 px-3">
              <h6>
                Sign up to see photos from your friends, families and colleagues
              </h6>
            </div>
            <form onSubmit={this.onSubmit} className="mt-3">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  placeholder="Username"
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={email}
                  placeholder="Email"
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  name="password1"
                  value={password1}
                  placeholder="Password"
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  name="password2"
                  value={password2}
                  placeholder="Re-Password"
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">
                  Register
                </button>
              </div>
              <p className="text-muted text-center">
                By signing up, you agree to our Terms , Data Policy and Cookies
                Policy .
              </p>
            </form>
          </div>
          <p className="text-center mb-3">
            Already have an account?
            <a href="">Login</a>
          </p>
        </div>
      </div>
    );
  }
}

export default Register;
