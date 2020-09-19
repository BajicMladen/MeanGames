import React, { useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/index";
import { Link } from "react-router-dom";
import { createCategory } from "./apiAdmin";

const AddCatrgory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  //destucture user and token form localstorage

  const { user, token } = isAuthenticated();

  const handleChange = (e) => {
    setError("");
    setName(e.target.value);
    setSuccess(false);
  };
  const clickSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    // request to api to create category

    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
      }
    });
  };

  const newCategoryForm = () => (
    <div>
      <div className="text-center mb-3">
        <h1>Add Category</h1>
      </div>

      <form onSubmit={clickSubmit}>
        <div className="form-group">
          <label className="text-muted">Category Name</label>
          <input
            type="text"
            className="form-control border border-secondary"
            onChange={handleChange}
            value={name}
            autoFocus
            required
            placeholder=" Enter category name here..."
          />
        </div>
        <button className="btn btn-outline-primary">Create Category</button>
      </form>
    </div>
  );

  const showSucces = () => {
    if (success) {
      return <h3 className="text-success">{name} category is created!</h3>;
    }
  };

  const showError = () => {
    if (error) {
      return (
        <h3 className="text-danger">
          {name} alredy exist, category shoul be unique!
        </h3>
      );
    }
  };

  const goBack = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="text-warning">
        <h5>Back to profile</h5>
      </Link>
    </div>
  );

  return (
    <Layout
      title="RPG or FPS, That Is The Question! "
      description={`Greetings ${user.name}, We Need More Categories!`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showError()}
          {showSucces()}
          {newCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};

export default AddCatrgory;
