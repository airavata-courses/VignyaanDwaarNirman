import React, { Component } from "react";

class Plot extends Component {
  state = {
    url: ""
  };

  componentDidMount() {
    this.userData = JSON.parse(localStorage.getItem("plot_url"));
    if (localStorage.getItem("plot_url")) {
      this.setState({
        url: this.userData.url
      });
    }
  }

  render() {
    return (
      <div className="container">
        <div>
          <img src={this.state.url} alt="img" />
        </div>
      </div>
    );
  }
}

export default Plot;
