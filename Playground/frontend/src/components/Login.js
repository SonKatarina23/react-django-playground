import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../actions";

// Load static image
import Chadtagram from "../static-images/Chadtagram.png";
import Appstore from "../static-images/appstore.png";
import GooglePlay from "../static-images/googleplay.png";

export class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  onSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;
    this.setState({ username: "", password: "" });
    this.props.login(username, password);
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const { username, password } = this.state;

    return (
      <div className="container">
        <div className="col-md-4 m-auto">
          <div className="card card-body mt-5 mb-3">
            <img
              className="ui medium mx-auto image mb-3"
              src={Chadtagram}
              alt="Chadtagram"
            />
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
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  placeholder="Password"
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">
                  Login
                </button>
              </div>
            </form>
            <hr />
            <div className="text-center">
              <p className="lead">Get the App</p>
              <div className="row">
                <div className="col-md-6 mx-auto">
                  <a href="https://itunes.apple.com/app/instagram/id389801252?pt=428156&ct=igweb.loginPage.badge&mt=8&vt=lo">
                    <img
                      src={Appstore}
                      alt="App Store"
                      className="img img-fluid py-2"
                    />
                  </a>
                </div>
                <div className="col-md-6">
                  <a href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb%26utm_campaign%3DloginPage%26ig_mid%3D129B8C52-B566-458E-B2E8-93863A15D688%26utm_content%3Dlo%26utm_medium%3Dbadge">
                    <img
                      src={GooglePlay}
                      alt="Google Play"
                      className="img img-fluid py-2"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center mb-5">
            Don't have an account ?<Link to="/register"> Register</Link>
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

export default connect(mapStateToProps, { login })(Login);
