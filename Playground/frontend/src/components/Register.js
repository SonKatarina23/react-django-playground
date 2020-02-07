import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../actions";

// Import static images
import Chadtagram from "../static-images/Chadtagram.png";

export class Register extends Component {
  state = {
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    password2: ""
  };

  onSubmit = e => {
    e.preventDefault();
    const {
      first_name,
      last_name,
      username,
      email,
      password,
      password2,
      gender
    } = this.state;
    if (password !== password2) console.log("Passwords do not match");

    this.props.register({
      first_name,
      last_name,
      username,
      email,
      password,
      gender
    });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }

    const {
      first_name,
      last_name,
      username,
      email,
      password,
      password2,
      gender
    } = this.state;

    return (
      <div className="container">
        <div className="col-md-4 m-auto">
          <div className="card card-body mt-5 mb-2">
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
                  name="first_name"
                  value={first_name}
                  placeholder="First Name"
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="last_name"
                  value={last_name}
                  placeholder="Last Name"
                  onChange={this.onChange}
                />
              </div>
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
                  name="password"
                  value={password}
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
                <select
                  className="form-control"
                  onChange={this.onChange}
                  name="gender"
                  value={gender}
                >
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="X">Prefer not to mention</option>
                </select>
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
            Already have an account ?<Link to="/login"> Login</Link>
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps, { register })(Register);
