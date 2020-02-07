import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../actions/postsActions";
import { Link } from "react-router-dom";

import SinglePost from "./SinglePost";
import Navbar from "./Navbar";
import "../css/style.css";

export class PostList extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    const { posts } = this.props;
    return posts.map(post => {
      return <SinglePost posts={post} key={post.id} />; // Send single post prop to SinglePost component
    });
  }

  renderIdentity() {
    const { currentUser } = this.props;
    /**
     * P.S Note :
     * IDK for whatever reasons despite the fact that user's profile picture is clearly shown
     * with full URL in the back end, when axios fetches it with thunk through action creators,
     * it only gets 'media/....' as URL, so I have to add this somewhat strange configuration
     */
    const baseURL = "http://localhost:8000";
    console.log(currentUser);
    return (
      // IDENTITY
      <section id="identity">
        <div className="ui segment mt-5">
          <div className="ui items">
            <div className="item">
              <Link
                to={{
                  pathname: `/${currentUser.username}`,
                  state: {
                    userIdToLoad: currentUser.id
                  }
                }}
                className="ui mini circular image"
                id="identity-picture"
              >
                <img
                  src={baseURL + currentUser.profile_picture}
                  alt={currentUser.username}
                />
              </Link>
              <div className="content">
                <a href="" className="">
                  <strong>{`${currentUser.first_name} ${currentUser.last_name}`}</strong>
                </a>
                <div className="description">
                  <p className="ui meta tiny">{`@${currentUser.username}`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  render() {
    return (
      <div>
        <Navbar />
        <div className="ui container">
          <div className="ui grid">
            <div className="eleven wide column">
              <div id="scroll">
                <section id="post-list">{this.renderPosts()}</section>
              </div>
            </div>

            <div className="five wide column" id="right-side">
              {this.renderIdentity()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts, // Get ALL posts from redux store and use it as props to the component,
    currentUser: state.auth.currentUser
  };
};
export default connect(mapStateToProps, { fetchPosts })(PostList);
