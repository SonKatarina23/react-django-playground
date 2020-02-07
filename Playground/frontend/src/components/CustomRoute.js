import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";

export class CustomRoute extends Component {
  render() {
    const { component: Component, auth, ...restProps } = this.props;
    // return <Component {...restProps} />;
    if (!auth.isAuthenticated) {
      console.log("NOT LOGGED IN SO GO BACK TO LOGIN PAGE");
      return <Redirect to="/login" />;
    } else return <Component {...restProps} />;
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(CustomRoute);
