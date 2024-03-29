import { rest } from "lodash";
import React from "react";
const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input id={name} className="form-control" name={name} {...rest} />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
