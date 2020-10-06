import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/index";
import { Link, Redirect } from "react-router-dom";
import { read, update, updateUser } from "./apiUser";

const Profile = ({ match }) => {
  //States
  const [values, setValues] = useState({
    name: "",
    lastname: "",
    password: "",
    error: "",
    success: "",
  });

  const { token } = isAuthenticated();
  const { name, lastname, password, error, success } = values;

  const init = (userId) => {
    read(userId, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        setValues({
          ...values,
          name: data.name,
          lastname: data.lastname,
        });
      }
    });
  };

  useEffect(() => {
    init(match.params.userId);
  }, []);

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };
  // after click action
  const clickSubmit = (e) => {
    e.preventDefault();

    update(match.params.userId, token, { name, lastname, password }).then(
      (data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          updateUser(data, () => {
            setValues({
              ...values,
              name: data.name,
              lastname: data.lastname,
              success: true,
            });
          });
        }
      }
    );
  };
  // after action
  const redirectUser = (success) => {
    if (success) {
      return <Redirect to="/cart" />;
    }
  };
  // update form
  const profileUpdate = (name, lastname, password) => (
    <form className="container">
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          onChange={handleChange("name")}
          className="form-control"
          value={name}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Lastname</label>
        <input
          type="text"
          onChange={handleChange("lastname")}
          className="form-control"
          value={lastname}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          type="text"
          onChange={handleChange("password")}
          className="form-control"
          value={password}
        />
      </div>
      <button className="btn btn-primary" onClick={clickSubmit}>
        Submit
      </button>
    </form>
  );

  return (
    <Layout title="Profile Update" description="Changing something player?">
      {profileUpdate(name, lastname, password)}
      {redirectUser(success)}
    </Layout>
  );
};

export default Profile;
