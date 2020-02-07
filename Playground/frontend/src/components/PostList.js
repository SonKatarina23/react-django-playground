import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../actions";

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
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts // Get ALL posts from redux store and use it as props to the component
  };
};
export default connect(mapStateToProps, { fetchPosts })(PostList);
