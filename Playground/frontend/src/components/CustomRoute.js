import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";

export class CustomRoute extends Component {
  render() {
    const { component: Component, auth, ...restProps } = this.props;

    if (!auth.isAuthenticated) return <Redirect to="/login" />;
    else return <Component {...restProps} />;
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(CustomRoute);
