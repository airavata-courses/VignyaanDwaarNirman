import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Register from "./components/Register";
import Dashboard from "./components/DashboardSearch";
import Session from "./components/Session";
import Popup from "./components/Plot";
import Spinner from "./components/Spinner";
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route exact path="/" component={Landing} />
        <div className="container">
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/dashboardsearch" component={Dashboard} />
          <Route exact path="/session" component={Session} />
          <Route exact path="/plot" component={Popup} />
          <Route exact path="/spinner" component={Spinner} />
        </div>
      </div>
    </Router>
  );
}

export default App;
