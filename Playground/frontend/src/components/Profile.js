import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  fetchSingleUser,
  followUser,
  unfollowUser
} from "../actions/usersAction";

import Navbar from "./Navbar";
import DefaultMale from "../static-images/default-male-pfp.png";
import DefaultFemale from "../static-images/default-female-pfp.png";
import DefaultUnknown from "../static-images/default-unknown-pfp.png";
import "../css/style.css";

export class Profile extends Component {
  componentDidMount() {
    const { userToLoad } = this.props.location.state;
    this.props.fetchSingleUser(userToLoad.id);
  }

  getImage() {
    const { userToLoad } = this.props.location.state;
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

  follow = () => {
    this.props.followUser(this.props.location.state.userToLoad.id);
  };

  unfollow = () => {
    this.props.unfollowUser(this.props.location.state.userToLoad.id);
  };

  followBtn() {
    const { userToLoad } = this.props.location.state;
    const { currentUser } = this.props;

    const isFollowing = userToLoad.followers.find(
      followerID => followerID === currentUser.id
    )
      ? true
      : false;

    if (userToLoad.id !== currentUser.id) {
      if (isFollowing) {
        return (
          <div
            onClick={this.unfollow}
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
            onClick={this.follow}
            className="ui button small primary"
            id="follow-profile"
          >
            <i className="user icon"></i>
            Follow
          </button>
        );
      }
    } else return <Fragment></Fragment>;
  }

  // renderGallery() {
  //   const { userID } = this.props.location.state.userToLoad;

  //   return posts.map(post => {
  //     return (
  //       <div key={post.id} className="five wide column mb-2">
  //         <a href="">
  //           <img
  //             src={post.photo}
  //             alt=""
  //             className="ui image fluid"
  //             id="photo-feed"
  //           />
  //         </a>
  //       </div>
  //     );
  //   });
  // }

  renderPage() {
    const {
      username,
      posts,
      followers,
      followings,
      first_name,
      last_name,
      bio
    } = this.props.location.state.userToLoad;
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
                {/* <div className="ui grid">{this.renderGallery()}</div> */}
                <div className="ui grid">asd</div>
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
  return {
    isAuthenticated: state.auth.isAuthenticated,
    currentUser: state.auth.currentUser
  };
};

export default connect(mapStateToProps, {
  fetchSingleUser,
  followUser,
  unfollowUser
})(Profile);
