import React, { Component } from "react";
import { connect } from "react-redux";

export class Profile extends Component {
  render() {
    const { currentUser } = this.props;
    return <div>Profile {currentUser.username}</div>;
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser
  };
};

export default connect(mapStateToProps)(Profile);
