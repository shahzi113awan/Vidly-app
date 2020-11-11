import React, { Component } from "react";
import Input from "./input";
import Form from "./form";
import Joi from "joi-browser";
class Login extends Form {
  schema = {
    userName: Joi.string().required().label("User Name"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = () => {
    console.log("submitted");
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("userName", "User Name")}
          {this.renderInput("password", "Password", "password")}

          {this.renderButton("login")}
        </form>
      </div>
    );
  }
}

export default Login;
