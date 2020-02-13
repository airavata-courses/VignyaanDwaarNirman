import React, { Component } from "react";
import _ from "lodash";
import { Table } from "semantic-ui-react";
import "./stylee.css";

class Session extends Component {
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
                  <Table.HeaderCell>Function Type</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>John Lilki</Table.Cell>
                  <Table.Cell>September 14, 2013</Table.Cell>
                  <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
                  <Table.Cell>No</Table.Cell>
                  <Table.Cell>Yes</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

export default Session;
