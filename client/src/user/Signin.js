import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { signin, authenticate, isAuthenticated } from "../auth/index";

const Signin = () => {
  const [values, setValues] = useState({
    email: "mladen_ba@live.com",
    password: "123456",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  const { email, password, loading, error, redirectToReferrer } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true,
          });
        });
      }
    });
  };

  const singUpForm = () => (
    <div>
      <div className="col-12 text-center">
        <h1>Sign in</h1>
      </div>
      <div>
        <form className="form-content">
          <div className="form-group">
            <label className="text-muted" to="">
              E-mail:
            </label>
            <input
              id="email"
              onChange={handleChange("email")}
              type="email"
              className="form-control border border-secondary"
              value={email}
            />
          </div>
          <div className="form-group">
            <label className="text-muted" to="password">
              Password:
            </label>
            <input
              id="password"
              onChange={handleChange("password")}
              type="password"
              className="form-control border border-secondary"
              value={password}
            />
          </div>
          <div>
            <button
              onClick={clickSubmit}
              className="btn btn-outline-secondary mr-4 "
            >
              Submit
            </button>
            <div className="d-inline te ml-4 text-secondary">
              You dont have acc? What are you waiting for?{" "}
              <Link to="/signup">Click here</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/"></Redirect>;
    }
  };

  return (
    <Layout
      title="Greetings"
      description="Welcome to the world of games, mean games!"
      className="container col-md-8 offset-md-2"
    >
      {showLoading()}
      {showError()}
      {singUpForm()}
      {redirectUser()}
    </Layout>
  );
};

export default Signin;
