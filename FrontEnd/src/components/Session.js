import React, { Component } from "react";
import _ from "lodash";
import { Table } from "semantic-ui-react";
import "./stylee.css";
import {getSession} from "./UserFunctions"

class Session extends Component {
  constructor(props){
    super(props)
    this.state = {
      items: {}
    }
  }
  componentDidMount(){
    this.userData = JSON.parse(localStorage.getItem("email"))
    console.log(this.userData.email)

    const user = {user_id: this.userData.email}
    console.log("sending user_id", user)
    getSession(user).then(res => {
      if(res){
        console.log(res)
        this.setState({items: res})
      }
    })
  }
  render() {
    return (
      <div className="container">
      
        <div className="row">
          <div className="col-md-10 mt-5 mx-auto">
            <Table striped>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Timestamp</Table.HeaderCell>
                  <Table.HeaderCell>Radar Location</Table.HeaderCell>
                  <Table.HeaderCell>Start Date</Table.HeaderCell>
                  <Table.HeaderCell>End Date</Table.HeaderCell>
                  <Table.HeaderCell>Function Type </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

export default Session;
