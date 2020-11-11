import Joi from "joi-browser";
import React, { Component } from "react";

import Form from "./Common/form";
class Register extends Form {
  state = {
    data: { userName: "", password: "", Name: " " },
    errors: {},
  };
  schema = {
    userName: Joi.string().required().email().label("User Name"),
    password: Joi.string().required().min(5).label("Password"),
    Name: Joi.string().required().label("Name"),
  };
  doSubmit = () => {
    console.log("Registerd");
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("userName", "User Name")}
          {this.renderInput("password", "Password")}
          {this.renderInput("Name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default Register;
