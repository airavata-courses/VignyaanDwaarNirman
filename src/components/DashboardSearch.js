import React, { Component } from "react";
import "./stylee.css";
import DateTime from "react-datetime";
import Select from "react-select";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "./rdt.css";
import Lightbox from "react-image-lightbox";
import { useCookies } from "react-cookies";
import { getPlot } from "./UserFunctions";

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

const funcOptions = [
  { value: "ref", label: "Reflexivity" },
  { value: "vel", label: "Velocity" }
];

var yesterday = DateTime.moment().subtract(1, "day");
var valid = function(current) {
  return current.isBefore(yesterday);
};
class Dashboard extends Component {
  userData;
  constructor(props) {
    super(props);
    this.state = {
      start: new Date(new Date().setDate(new Date().getDate() - 1)),
      end: new Date(new Date().setDate(new Date().getDate() - 1)),
      selectedOption: "",
      selectedFuncOption: "",
      startError: "",
      endError: "",
      selectedFuncOptionsError: "",
      selectedOptionsError: "",
      username: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };

  handleFuncChange = selectedFuncOption => {
    this.setState({ selectedFuncOption });
  };

  validate = () => {
    let startError = "";
    let endError = "";
    let selectedFuncOptionsError = "";
    let selectedOptionsError = "";

    if (!this.state.start) {
      startError = "Start Date cannot be empty";
    }
    if (!this.state.end) {
      endError = "End Date cannot be empty";
    }
    if (!this.state.selectedFuncOption) {
      selectedFuncOptionsError = "Function cannot be empty";
    }
    if (!this.state.selectedOption) {
      selectedOptionsError = "State cannot be empty";
    }

    if (
      startError ||
      endError ||
      selectedFuncOptionsError ||
      selectedOptionsError
    ) {
      this.setState({
        startError,
        endError,
        selectedFuncOptionsError,
        selectedOptionsError
      });
      return false;
    }

    return true;
  };

  componentDidMount() {
    this.userData = JSON.parse(localStorage.getItem("email"));
    if (localStorage.getItem("email")) {
      this.setState({
        username: this.userData.email
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      const user = {
        email: this.state.email,
        selectedOption: this.state.selectedOption,
        selectedFuncOption: this.state.selectedFuncOption,
        consumer: this.state.consumer,
        start: this.state.start,
        end: this.state.end
      };
      getPlot(user).then(res => {
        if (res) {
          console.log(res);
          this.props.history.push(`/plot`);
        }
      });
    }
  }

  render() {
    const { selectedOption } = this.state;
    const { selectedFuncOption } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">
                Welcome, Check how's the velocity and reflexitivity been in all
                these years
              </h1>
              <div className="form-group">
                <Select
                  placeholder="State"
                  value={selectedOption}
                  onChange={this.handleChange}
                  options={options}
                />
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.selectedOptionsError}
                </div>
              </div>
              <div className="form-group">
                <Select
                  placeholder="Functions"
                  value={selectedFuncOption}
                  onChange={this.handleFuncChange}
                  options={funcOptions}
                />
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.selectedFuncOptionsError}
                </div>
              </div>
              <div className="form-group">
                <DateTime
                  isValidDate={valid}
                  value={this.state.start}
                  onChange={this.onChange}
                />
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.startError}
                </div>
              </div>

              <div className="form-group">
                <DateTime
                  placeholderText="MM/DD/YYYY"
                  isValidDate={valid}
                  value={this.state.end}
                  onChange={this.onChange}
                />
                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.endError}
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Get Curves
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const options = [
  {
    value: "Alabama",
    label: "AL"
  },
  {
    value: "Alaska",
    label: "AK"
  },
  {
    value: "American Samoa",
    label: "AS"
  },
  {
    value: "Arizona",
    label: "AZ"
  },
  {
    value: "Arkansas",
    label: "AR"
  },
  {
    value: "California",
    label: "CA"
  },
  {
    value: "Colorado",
    label: "CO"
  },
  {
    value: "Connecticut",
    label: "CT"
  },
  {
    value: "Delaware",
    label: "DE"
  },
  {
    value: "District Of Columbia",
    label: "DC"
  },
  {
    value: "Federated States Of Micronesia",
    label: "FM"
  },
  {
    value: "Florida",
    label: "FL"
  },
  {
    value: "Georgia",
    label: "GA"
  },
  {
    value: "Guam",
    label: "GU"
  },
  {
    value: "Hawaii",
    label: "HI"
  },
  {
    value: "Idaho",
    label: "ID"
  },
  {
    value: "Illinois",
    label: "IL"
  },
  {
    value: "Indiana",
    label: "IN"
  },
  {
    value: "Iowa",
    label: "IA"
  },
  {
    value: "Kansas",
    label: "KS"
  },
  {
    value: "Kentucky",
    label: "KY"
  },
  {
    value: "Louisiana",
    label: "LA"
  },
  {
    value: "Maine",
    label: "ME"
  },
  {
    value: "Marshall Islands",
    label: "MH"
  },
  {
    value: "Maryland",
    label: "MD"
  },
  {
    value: "Massachusetts",
    label: "MA"
  },
  {
    value: "Michigan",
    label: "MI"
  },
  {
    value: "Minnesota",
    label: "MN"
  },
  {
    value: "Mississippi",
    label: "MS"
  },
  {
    value: "Missouri",
    label: "MO"
  },
  {
    value: "Montana",
    label: "MT"
  },
  {
    value: "Nebraska",
    label: "NE"
  },
  {
    value: "Nevada",
    label: "NV"
  },
  {
    value: "New Hampshire",
    label: "NH"
  },
  {
    value: "New Jersey",
    label: "NJ"
  },
  {
    value: "New Mexico",
    label: "NM"
  },
  {
    value: "New York",
    label: "NY"
  },
  {
    value: "North Carolina",
    label: "NC"
  },
  {
    value: "North Dakota",
    label: "ND"
  },
  {
    value: "Northern Mariana Islands",
    label: "MP"
  },
  {
    value: "Ohio",
    label: "OH"
  },
  {
    value: "Oklahoma",
    label: "OK"
  },
  {
    value: "Oregon",
    label: "OR"
  },
  {
    value: "Palau",
    label: "PW"
  },
  {
    value: "Pennsylvania",
    label: "PA"
  },
  {
    value: "Puerto Rico",
    label: "PR"
  },
  {
    value: "Rhode Island",
    label: "RI"
  },
  {
    value: "South Carolina",
    label: "SC"
  },
  {
    value: "South Dakota",
    label: "SD"
  },
  {
    value: "Tennessee",
    label: "TN"
  },
  {
    value: "Texas",
    label: "TX"
  },
  {
    value: "Utah",
    label: "UT"
  },
  {
    value: "Vermont",
    label: "VT"
  },
  {
    value: "Virgin Islands",
    label: "VI"
  },
  {
    value: "Virginia",
    label: "VA"
  },
  {
    value: "Washington",
    label: "WA"
  },
  {
    value: "West Virginia",
    label: "WV"
  },
  {
    value: "Wisconsin",
    label: "WI"
  },
  {
    value: "Wyoming",
    label: "WY"
  }
];

export default Dashboard;
