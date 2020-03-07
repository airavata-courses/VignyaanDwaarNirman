import React from "react";

const Form = props => {
  return (
    <div className="container h-100">
      <form onSubmit={props.loadweather}>
        <div>{props.error ? error() : ""}</div>
        <div className="row">
          <div className="form-group col-md-3 offset-md-2">
            <input
              type="text"
              className="form-control"
              name="city"
              placeholder="City"
            />
          </div>
          <div className="form-group ">
            <input
              type="text"
              className="form-control"
              name="country"
              placeholder="Country"
            />
          </div>
          <div className="col-md-3 mt-md-0 mt-2 text-md-left ">
            <button className="btn btn-primary">Get Weather</button>
          </div>
        </div>
      </form>
    </div>
  );
};

const error = props => {
  return (
    <div className="alert alert-danger mx-5" role="alert">
      Please Enter City and Country...!
    </div>
  );
};

export default Form;
