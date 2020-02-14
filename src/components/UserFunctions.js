import axios from "axios";

export const register = newUser => {
  return axios
    .post("users/register", {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password
    })
    .then(response => {
      console.log("Registered");
    });
};

export const login = user => {
  return axios
    .post("users/login", {
      email: user.email,
      password: user.password
    })
    .then(response => {
      localStorage.setItem("usertoken", response.data);
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
};

export const getProfile = user => {
  return axios
    .get("users/profile", {
      //headers: { Authorization: ` ${this.getToken()}` }
    })
    .then(response => {
      console.log(response);
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
};



export const getPlot = plot => {
  console.log(plot.selectedFuncOption);
    return axios
    .post("users/dashboardsearch", {
      radar_id: plot.selectedOption,
      start_date: plot.start,
      end_date: plot.end,
      user_id: plot.consumer,
      func_type: plot.selectedFuncOption
    })
    .then(response => {
      localStorage.setItem("timepass", response.data);
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
};



export const getSession = user => {
  return axios
    .get("users/session", {
      //headers: { Authorization: ` ${this.getToken()}` }
    })
    .then(response => {
      console.log(response);
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
};

