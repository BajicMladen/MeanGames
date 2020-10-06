import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { signup } from "../auth/index";

const Signup = () => {
  //States
  const [values, setValues] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, lastname, email, password, success, error } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  //on click function
  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, lastname, email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          lastname: "",
          email: "",
          password: "",
          error: "",
          success: true,
        });
      }
    });
  };
  // sign up form
  const singUpForm = () => (
    <div>
      <div className="col-12 text-center">
        <h1>Sign up</h1>
      </div>
      <div>
        <form className="form-content">
          <div className="form-group">
            <label className="text-muted">Name:</label>
            <input
              onChange={handleChange("name")}
              type="text"
              className="form-control border border-secondary"
              value={name}
            />
          </div>
          <div className="form-group">
            <label className="text-muted">Last Name:</label>
            <input
              onChange={handleChange("lastname")}
              type="text"
              className="form-control border border-secondary"
              value={lastname}
            />
          </div>
          <div className="form-group">
            <label className="text-muted">E-mail:</label>
            <input
              onChange={handleChange("email")}
              type="email"
              className="form-control border border-secondary"
              aria-describedby="emailHelp"
              value={email}
            />
            <small id="emailHelp" class="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label className="text-muted">Password:</label>
            <input
              onChange={handleChange("password")}
              type="password"
              className="form-control border border-secondary"
              value={password}
            />
          </div>
          <button onClick={clickSubmit} className="btn btn-outline-secondary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
  //error message
  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );
  //success message
  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      New account created.Please <Link to="/signin">Signin</Link>
    </div>
  );

  return (
    <Layout
      title="Hi Newbie"
      description="Sign up and enter the world of games,mean games!"
      className="container col-md-8 offset-md-2"
    >
      {showSuccess()}
      <h2>{showError()}</h2>
      {singUpForm()}
    </Layout>
  );
};

export default Signup;
