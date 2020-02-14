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

  handleDate(date){
    this.setState({date})
  }
  
  handleDateTimePicker = (moment, name) =>
    this.setState({ [name]: moment.toDate() });

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
	console.log(this.state.start)
    this.userData = JSON.parse(localStorage.getItem("email"));
    e.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      const plot = {
        selectedOption: this.state.selectedOption.value,
        selectedFuncOption: this.state.selectedFuncOption.value,
        consumer: this.userData.email,
        start: this.state.start,
        end: this.state.end
      }
      console.log("trying to send")
      getPlot(plot).then(res => {
        if (res) {
          console.log(res);
          this.props.history.push(`/profile`);
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
                  onChange={moment =>
                    this.handleDateTimePicker(moment, "start")
                  }
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
                  onChange={moment => this.handleDateTimePicker(moment, "end")}
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
  {value: 'KABR',label: 'ABERDEEN, SD'},
{value: 'KBIS',label: 'BISMARCK, ND'},
{value: 'KFTG',label: 'FRONT RANGE AP, CO'},
{value: 'KDMX',label: 'JOHNSTON, IA'},
{value: 'KDTX',label: 'WHITE LAKE, MI'},
{value: 'KDDC',label: 'DODGE CITY, KS'},
{value: 'KDLH',label: 'DULUTH, MN'},
{value: 'KCYS',label: 'CHEYENNE, WY'},
{value: 'KLOT',label: 'ROMEOVILLE, IL'},
{value: 'KGLD',label: 'GOODLAND, KS'},
{value: 'KUEX',label: 'BLUE HILL, NE'},
{value: 'KGJX',label: 'GRAND JUNCTION, CO'},
{value: 'KGRR',label: 'GRAND RAPIDS, MI'},
{value: 'KMVX',label: 'GRAND FORKS, ND'},
{value: 'KGRB',label: 'GREEN BAY, WI'},
{value: 'KIND',label: 'INDIANAPOLIS, IN'},
{value: 'KJKL',label: 'JACKSON, KY'},
{value: 'KARX',label: 'LA CROSSE, WI'},
{value: 'KILX',label: 'LINCOLN, IL'},
{value: 'KLVX',label: 'FORT KNOX, KY'},
{value: 'KMQT',label: 'NEGAUNEE, MI'},
{value: 'KMKX',label: 'DOUSMAN, WI'},
{value: 'KMPX',label: 'CHANHASSEN, MN'},
{value: 'KAPX',label: 'GAYLORD, MI'},
{value: 'KLNX',label: 'NORTH PLATTE, NE'},
{value: 'KIWX',label: 'NORTH WEBSTER, IN'},
{value: 'KOAX',label: 'VALLEY, NE'},
{value: 'KPAH',label: 'PADUCAH, KY'},
{value: 'KEAX',label: 'PLEASANT HILL, MO'},
{value: 'KPUX',label: 'PUEBLO, CO'},
{value: 'KDVN',label: 'DAVENPORT, IA'},
{value: 'KUDX',label: 'NEW UNDERWOOD, SD'},
{value: 'KRIW',label: 'RIVERTON, WY'},
{value: 'KSGF',label: 'SPRINGFIELD, MO'},
{value: 'KLSX',label: 'WELDON SPRING, MO'},
{value: 'KFSD',label: 'SIOUX FALLS, SD'},
{value: 'KTWX',label: 'TOPEKA, KS'},
{value: 'KICT',label: 'WICHITA, KS'},
{value: 'KVWX',label: 'OWENSVILLE, IN'},
{value: 'KLTX',label: 'SHALLOTTE, NC'},
{value: 'KCCX',label: 'STATE COLLEGE, PA'},
{value: 'KLWX',label: 'STERLING, VA'},
{value: 'KFCX',label: 'ROANOKE, VA'},
{value: 'KRAX',label: 'CLAYTON, NC'},
{value: 'KGYX',label: 'GRAY, ME'},
{value: 'KDIX',label: 'FORT DIX, NJ'},
{value: 'KPBZ',label: 'CORAOPOLIS, PA'},
{value: 'KAKQ',label: 'WAKEFIELD, VA'},
{value: 'KMHX',label: 'NEWPORT, NC'},
{value: 'KGSP',label: 'GREER, SC'},
{value: 'KILN',label: 'WILMINGTON, OH'},
{value: 'KCLE',label: 'CLEVELAND, OH'},
{value: 'KCAE',label: 'WEST COLUMBIA, SC'},
{value: 'KBGM',label: 'BINGHAMTON, NY'},
{value: 'KENX',label: 'EAST BERNE, NY'},
{value: 'KBUF',label: 'BUFFALO, NY'},
{value: 'KCXX',label: 'COLCHESTER, VT'},
{value: 'KCBW',label: 'HOULTON, ME'},
{value: 'KBOX',label: 'TAUNTON, MA'},
{value: 'KOKX',label: 'UPTON, NY'},
{value: 'KCLX',label: 'GRAYS, SC'},
{value: 'KRLX',label: 'CHARLESTON, WV'},
{value: 'KBRO',label: 'BROWNSVILLE, TX'},
{value: 'KABX',label: 'ALBUQUERQUE, NM'},
{value: 'KAMA',label: 'AMARILLO, TX'},
{value: 'KFFC',label: 'PEACHTREE CITY, GA'},
{value: 'KEWX',label: 'NEW BRAUNFELS, TX'},
{value: 'KBMX',label: 'ALABASTER, AL'},
{value: 'KCRP',label: 'CORPUS CHRISTI, TX'},
{value: 'KFWS',label: 'FORT WORTH, TX'},
{value: 'KEPZ',label: 'SANTA TERESA, NM'},
{value: 'KHGX',label: 'DICKINSON, TX'},
{value: 'KJAX',label: 'JACKSONVILLE, FL'},
{value: 'KBYX',label: 'BOCA CHICA KEY, FL'},
{value: 'KMRX',label: 'MORRISTOWN, TN'},
{value: 'KLBB',label: 'LUBBOCK, TX'},
{value: 'KLZK',label: 'NORTH LITTLE ROCK, AR'},
{value: 'KLCH',label: 'LAKE CHARLES, LA'},
{value: 'KOHX',label: 'OLD HICKORY, TN'},
{value: 'KMLB',label: 'MELBOURNE, FL'},
{value: 'KNQA',label: 'MILLINGTON, TN'},
{value: 'KAMX',label: 'MIAMI, FL'},
{value: 'KMAF',label: 'MIDLAND, TX'},
{value: 'KTLX',label: 'OKLAHOMA CITY, OK'},
{value: 'KHTX',label: 'HYTOP, AL'},
{value: 'KMOB',label: 'MOBILE, AL'},
{value: 'KTLH',label: 'TALLAHASSEE, FL'},
{value: 'KTBW',label: 'RUSKIN, FL'},
{value: 'KSJT',label: 'SAN ANGELO, TX'},
{value: 'KINX',label: 'INOLA, OK'},
{value: 'KSRX',label: 'CHAFFEE RIDGE, AR'},
{value: 'KLIX',label: 'SLIDELL, LA'},
{value: 'KDGX',label: 'BRANDON, MS'},
{value: 'KSHV',label: 'SHREVEPORT, LA'},
{value: 'KLGX',label: 'LANGLEY HILL, WA'},
{value: 'KOTX',label: 'SPOKANE, WA'},
{value: 'KEMX',label: 'TUCSON, AZ'},
{value: 'KYUX',label: 'YUMA, AZ'},
{value: 'KNKX',label: 'SAN DIEGO, CA'},
{value: 'KMUX',label: 'LOS GATOS, CA'},
{value: 'KHNX',label: 'HANFORD, CA'},
{value: 'KSOX',label: 'SANTA ANA MOUNTAINS, CA'},
{value: 'KATX',label: 'EVERETT, WA'},
{value: 'KIWA',label: 'PHOENIX, AZ'},
{value: 'KRTX',label: 'PORTLAND, OR'},
{value: 'KSFX',label: 'SPRINGFIELD, ID'},
{value: 'KRGX',label: 'NIXON, NV'},
{value: 'KDAX',label: 'DAVIS, CA'},
{value: 'KMTX',label: 'SALT LAKE CITY, UT'},
{value: 'KPDT',label: 'PENDLETON, OR'},
{value: 'KMSX',label: 'MISSOULA, MT'},
{value: 'KESX',label: 'LAS VEGAS, NV'},
{value: 'KVTX',label: 'LOS ANGELES, CA'},
{value: 'KMAX',label: 'MEDFORD, OR'},
{value: 'KFSX',label: 'FLAGSTAFF, AZ'},
{value: 'KGGW',label: 'GLASGOW, MT'},
{value: 'KLRX',label: 'ELKO, NV'},
{value: 'KBHX',label: 'EUREKA, CA'},
{value: 'KTFX',label: 'GREAT FALLS, MT'},
{value: 'KCBX',label: 'BOISE, ID'},
{value: 'KBLX',label: 'BILLINGS, MT'},
{value: 'KICX',label: 'CEDAR CITY, UT'}
];

export default Dashboard;
