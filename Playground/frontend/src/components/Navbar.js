import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// Import static files
import "../css/style.css";
import Chadtagram from "../static-images/Chadtagram.png";

export class Navbar extends Component {
  render() {
    const { currentUser } = this.props;
    return (
      <section id="navbar" className="mb-5">
        <div className="ui pointing fixed menu mb-5">
          <div className="container">
            <Link to="/" className="item">
              <i className="instagram icon big"></i>
            </Link>
            <Link to="/" className="item">
              <img
                src={Chadtagram}
                alt="Chadtagram"
                className="ui small image"
              />
            </Link>

            <div className="ml-auto my-auto">
              <div className="item center mr-5">
                <div className="ui transparent icon input">
                  <div className="ui medium form mr-3">
                    <input type="text" placeholder="Search..." />
                  </div>
                </div>
                <i className="search link large icon"></i>
              </div>
            </div>
            <div className="right menu">
              <Link to="/" className="item">
                <i className="heart outline big icon"></i>
              </Link>

              <Link
                to={{
                  pathname: `/${currentUser.username}`,
                  state: {
                    userToLoad: currentUser
                  }
                }}
                className="item"
              >
                <i className="user circle big icon"></i>
              </Link>
              <Link to="/" className="item">
                <i className="mobile alternate big icon"></i>
              </Link>
            </div>
          </div>
        </div>
        <div className="ui huge horizontal divider header"></div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser
  };
};

export default connect(mapStateToProps)(Navbar);
