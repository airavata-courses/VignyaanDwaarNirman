import React, { Component } from "react";
import _ from "lodash";
import { Table } from "semantic-ui-react";
import "./stylee.css";
import { getSession } from "./UserFunctions";

class Session extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }
  componentDidMount() {
    this.userData = JSON.parse(localStorage.getItem("email"));
    console.log(this.userData.email);

    const user = { user_id: this.userData.email };
    console.log("sending user_id", user);
    getSession(user).then(res => {
      if (res) {
        console.log(res);
        this.setState({ items: res.data });
      }
    });
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-10 mt-5 mx-auto">
            <table className="table">
              <tr>
                {this.state.items.map(item => (
                  <item>{item.radar_id} </item>
                ))}
              </tr>
              <tr>
                {" "}
                {this.state.items.map(item => (
                  <item>{item.start_date}</item>
                ))}
              </tr>
              <tr>
                {this.state.items.map(item => (
                  <item>{item.end_date}</item>
                ))}{" "}
              </tr>
              <tr>
                {this.state.items.map(item => (
                  <item>{item.timestamp} </item>
                ))}{" "}
              </tr>
              <tr>
                {this.state.items.map(item => (
                  <item>{item.function_type}</item>
                ))}{" "}
              </tr>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Session;
