import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { toggleLike } from "../actions/postsActions";
import { fetchUsersFromPost, toggleFollowing } from "../actions/usersAction";

import Navbar from "./Navbar";
import "../css/style.css";

export class PostDetail extends Component {
  state = {
    postToLoad: this.props.location.state.postToLoad,
    isLoading: true
  };

  componentDidMount = async () => {
    const { id } = this.state.postToLoad;
    const { fetchUsersFromPost, posts } = this.props;
    await fetchUsersFromPost(id);

    this.setState({
      postToLoad: posts.find(post => post.id === id),
      isLoading: false
    });
  };

  toggleFollowing = () => {};

  followBtn = () => {
    const { owner } = this.state.postToLoad;
    const { currentUser } = this.props;

    if (owner.id !== currentUser.id) {
      const isFollowing = owner.followers.find(
        followerID => followerID === currentUser.id
      )
        ? true
        : false;

      if (isFollowing) {
        return (
          <div
            onClick={this.toggleFollowing}
            className="ui mini animated button"
          >
            <div className="visible content">Following</div>
            <div className="hidden content">
              <i className="minus circle icon"></i>
              Unfollow
            </div>
          </div>
          // <button
          //   onClick={this.toggleFollowing}
          //   class="ui button mini negative"
          // >
          //   <i class="minus circle icon"></i>
          //   Unfollow
          // </button>
        );
      } else {
        // Render button for following
        return (
          <button
            onClick={this.toggleFollowing}
            className="ui button mini primary"
          >
            <i className="user icon"></i>
            Follow
          </button>
        );
      }
    } else {
      // This post is auth user's
      return <div></div>;
    }
  };

  renderComment = () => {
    return (
      <div className="comment mb-4">
        <a className="avatar">
          <img src="theabernice1.jpg" />
        </a>
        <div className="content">
          <a className="author">Thea</a>
          <div className="metadata">
            <span className="date">Today at 5:42PM</span>
          </div>
          <div className="text">How artistic!</div>
        </div>
      </div>
    );
  };

  renderPage = () => {
    const { isLoading } = this.state;
    if (isLoading) {
      return (
        <div className="ui segment">
          <div className="ui active dimmer">
            <div className="ui massive text loader">Loading</div>
          </div>
          <p></p>
          <p></p>
          <p></p>
        </div>
      );
    }
    const { photo, owner, captions } = this.state.postToLoad;
    console.log(photo);
    return (
      <Fragment>
        <Navbar />
        <div className="ui container">
          <div className="ui grid">
            <div className="ten wide column" id="left-side">
              {/* PHOTO ITSELF */}
              <div className="ui fluid image my-5">
                <img src={photo} alt={owner.username} />
              </div>
            </div>

            <div className="six wide column">
              <div id="post-info">
                {/* USER CAPTIONS COMMENTS */}
                <div className="ui segment mt-5">
                  <div className="mr-auto">
                    {/* USER */}
                    <section className="mb-3">
                      <img
                        className="ui avatar image"
                        src={owner.profile_picture}
                      />
                      <span className="mr-3">
                        <strong>{`${owner.first_name} ${owner.last_name}`}</strong>
                      </span>
                      {this.followBtn()}
                    </section>

                    <div id="scroll" className="mx-auto">
                      {/* CAPTIONS */}
                      <section className="mt-3 mb-3">{captions}</section>

                      {/* COMMENTS */}
                      <section>
                        {/* Sample Comment */}
                        <div className="ui comments">
                          <h3 className="ui dividing header"></h3>
                          {this.renderComment()}
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };
  render() {
    return <div>{this.renderPage()}</div>;
    // return <div>asd</div>;
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
    posts: state.posts
  };
};

export default connect(mapStateToProps, {
  fetchUsersFromPost,
  toggleLike,
  toggleFollowing
})(PostDetail);
