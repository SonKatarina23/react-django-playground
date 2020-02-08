import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSingleUser, toggleFollowing } from "../actions/usersAction";
import { fetchPostsByOwner } from "../actions/postsActions";

import Navbar from "./Navbar";
import DefaultMale from "../static-images/default-male-pfp.png";
import DefaultFemale from "../static-images/default-female-pfp.png";
import DefaultUnknown from "../static-images/default-unknown-pfp.png";
import "../css/style.css";

export class Profile extends Component {
  state = {
    userToLoad: this.props.location.state.userToLoad
  };
  componentDidMount() {
    const { userToLoad } = this.state;
    const { fetchSingleUser, fetchPostsByOwner } = this.props;
    fetchSingleUser(userToLoad.id);
    fetchPostsByOwner(userToLoad.id);
  }

  getImage() {
    const { userToLoad } = this.state;
    if (userToLoad.profile_picture) {
      return (
        <img
          src={userToLoad.profile_picture}
          alt={userToLoad.username}
          className="ui middle aligned tiny image border"
          id="profile-picture"
        />
      );
    } else {
      let img;
      switch (userToLoad.gender) {
        case "M":
          img = DefaultMale;
          break;
        case "F":
          img = DefaultFemale;
          break;
        default:
          img = DefaultUnknown;
      }
      return (
        <img
          src={img}
          alt={userToLoad.username}
          className="ui middle aligned tiny image border"
          id="profile-picture"
        />
      );
    }
  }

  toggleFollowing = async () => {
    const { userToLoad } = this.state;
    await this.props.toggleFollowing(userToLoad.id);
    this.setState({
      userToLoad: this.props.users.find(user => user.id === userToLoad.id)
    });
  };

  logout() {
    console.log("Logging out . . .");
  }

  followBtn() {
    const { userToLoad } = this.state;
    const { currentUser } = this.props;

    if (userToLoad.id !== currentUser.id) {
      const isFollowing = userToLoad.followers.find(
        followerID => followerID === currentUser.id
      )
        ? true
        : false;
      if (isFollowing) {
        return (
          <div
            onClick={this.toggleFollowing}
            className="ui animated button"
            id="follow-profile"
          >
            <div className="visible content">Following</div>
            <div className="hidden content">
              <i className="minus circle icon"></i>
              Unfollow
            </div>
          </div>
        );
      } else {
        return (
          <button
            onClick={this.toggleFollowing}
            className="ui button small primary"
            id="follow-profile"
          >
            <i className="user icon"></i>
            Follow
          </button>
        );
      }
    } else {
      return (
        <button
          onClick={this.logout}
          className="ui button small grey"
          id="follow-profile"
        >
          <i className="user times icon m3-"></i>
          Logout
        </button>
      );
    }
  }

  renderGallery() {
    const { id } = this.state.userToLoad;
    const posts = this.props.posts.filter(post => post.owner.id === id);
    return posts.map(post => {
      return (
        <div key={post.id} className="five wide column mb-2">
          <Link
            to={{
              pathname: `/p/${id}`,
              state: {
                postToLoad: post
              }
            }}
          >
            <img
              src={post.photo}
              alt=""
              className="ui image fluid"
              id="photo-feed"
            />
          </Link>
        </div>
      );
    });
  }

  renderPage() {
    const {
      username,
      posts,
      followers,
      followings,
      first_name,
      last_name,
      bio
    } = this.state.userToLoad;
    return (
      <Fragment>
        <Navbar />
        {/* USER INFO */}
        <section className="mt-5">
          <div className="ui container">
            <div className="ui grid">
              {/* PROFILE PICTURE */}
              <div className="six wide column mt-5 py-3">{this.getImage()}</div>
              {/* USER DESCRIPTION */}
              <div className="ten wide column mt-5">
                <div className="ui grid mb-1">
                  <div className="nine wide column">
                    {/* USERNAME AND FOLLOW BUTTON */}
                    <div className="ui grid">
                      <div className="six wide column">
                        <h3 className="text-muted">{username}</h3>
                      </div>
                      <div className="ten wide column mr-auto">
                        {/* FOLLOW BUTTON */}
                        {this.followBtn()}
                      </div>
                    </div>

                    {/* POST, FOLLOWERS, FOLLOWINGS */}
                    <div className="ui grid">
                      <div className="four wide column">
                        <strong className="ui small header mr-1">
                          {posts.length}
                        </strong>
                        <span className="ui small header text-muted">
                          Posts
                        </span>
                      </div>
                      <div className="six wide column">
                        <strong className="ui small header mr-1">
                          {followers.length}
                        </strong>
                        <span className="ui small header text-muted">
                          Followers
                        </span>
                      </div>
                      <div className="six wide column">
                        <strong className="ui small header mr-1">
                          {followings.length}
                        </strong>
                        <span className="ui small header text-muted">
                          Followings
                        </span>
                      </div>
                    </div>

                    {/* FULL NAME AND BIO */}
                    <div className="ui small header">{`${first_name} ${last_name}`}</div>
                    <p className="text-justify">{bio}</p>
                  </div>
                  <div className="seven wide column"></div>
                </div>
              </div>
            </div>
            <hr />
            {/* GALLERY */}
            <div className="ui grid">
              <div className="thirteen wide column mx-auto">
                <div className="ui grid">{this.renderGallery()}</div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
  render() {
    return <div>{this.renderPage()}</div>;
  }
}

const mapStateToProps = state => {
  const { isAuthenticated, currentUser } = state.auth;
  return {
    isAuthenticated,
    currentUser,
    posts: state.posts,
    users: state.users
  };
};

export default connect(mapStateToProps, {
  fetchPostsByOwner,
  fetchSingleUser,
  toggleFollowing
})(Profile);
