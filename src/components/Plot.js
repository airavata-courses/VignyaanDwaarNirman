import React, { Component } from "react";
import Spinner from "./Spinner";
const base64prefix = "data:image/png;base64, ";
class Plot extends Component {
  state = {
    url: "",
    loading: true
  };

  componentDidMount() {
    this.userData = JSON.parse(localStorage.getItem("plot_url"));

    if (localStorage.getItem("plot_url")) {
      this.setState({
        url: this.userData.file_location,
        loading: false
      });
    }
  }

  render() {
    const url = this.state.url;
    const loading = this.state.loading;
    return (
      <div className="container">
        <div>
          <img
            src={base64prefix + this.state.url}
            alt="img"
            className="plotImage"
          />
        </div>
      </div>
    );
  }
}

export default Plot;
