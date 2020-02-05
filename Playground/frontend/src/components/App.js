import React, { Component, Fragment } from "react";
import PostList from "./PostList";

export class App extends Component {
  render() {
    return (
      <Fragment>
        <PostList />
      </Fragment>
    );
  }
}

export default App;
