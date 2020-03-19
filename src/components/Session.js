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
  renderTableData() {
    const items = this.state.items;
    return this.state.items.map((res, index) => {
      const {
        _id,
        user_id,
        function_type,
        radar_id,
        start_date,
        end_date,
        timestamp,
        filelocation
      } = res; //destructuring
      return (
        <tr key={_id}>
          <td>{timestamp}</td>
          <td>{radar_id}</td>
          <td>{start_date}</td>
          <td>{end_date}</td>
          <td>{function_type}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-10 mt-5 mx-auto">
            <table>
              <th>Timestamp</th>
              <th>Location</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Plot Type</th>
                </th>{this.renderTableData()}</table>
          </div>
        </div>
      </div>
    );
  }
}

export default Session;
