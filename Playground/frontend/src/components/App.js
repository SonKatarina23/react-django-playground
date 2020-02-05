import React, { Component } from "react";
import ChadAPI from "../api/ChadAPI";

export class App extends Component {
  state = {
    user: []
  };
  test = [
    { name: "Houwen", state: "Virgin" },
    { name: "Jess", state: "Virgin" },
    { name: "Carin", state: "Thotty" },
    { name: "asdasd", state: "Chad" },
    { name: "qwe", state: "incel" }
  ];

  componentDidMount() {
    ChadAPI.get("User/").then(res => {
      console.log(res.data);
      this.setState({ user: res.data });
    });
  }

  renderList() {
    // return (
    //   <ul>
    //     {this.test.map(i => {
    //       return (
    //         <li>
    //           {i.name} is a {i.state}
    //         </li>
    //       );
    //     })}
    //   </ul>
    if (this.state.user === []) return <div>Loading . . .</div>;
    else {
      return (
        <ul>
          {this.state.user.map(i => {
            return <li key={i.id}>{i.username}</li>;
          })}
        </ul>
      );
    }
  }
  render() {
    return <div>{this.renderList()}</div>;
  }
}

export default App;
