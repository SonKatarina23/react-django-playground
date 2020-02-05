import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../actions";

import SinglePost from "./SinglePost";

export class PostList extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderList() {
    const { posts } = this.props;
    return posts.map(post => {
      return <SinglePost posts={post} key={post.id} />; // Send single post prop to SinglePost component
    });
  }
  render() {
    return <div>{this.renderList()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts // Get ALL posts from redux store and use it as props to the component
  };
};
export default connect(mapStateToProps, { fetchPosts })(PostList);
