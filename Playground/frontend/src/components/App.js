import React, { Component, Fragment } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// Internal Component Imports

import PostList from "./PostList";
import Register from "./Register";
import Login from "./Login";
import CustomRoute from "./CustomRoute";

export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <Switch>
            <CustomRoute exact path="/" component={PostList} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
