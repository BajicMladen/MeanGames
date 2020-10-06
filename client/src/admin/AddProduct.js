import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/index";
import { createProduct, getCategories } from "./apiAdmin";

const AddProduct = () => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: "",
    success: false,
  });

  const {
    name,
    description,
    price,
    categories,
    quantity,
    loading,
    error,
    createdProduct,
    formData,
    success,
  } = values;

  // load categoris and set formData
  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, success: false });
  };

  const clickSubmit = (event) => {
    event.preventDefault();

    setValues({ ...values, error: "", loading: true });

    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          photo: "",
          quantity: "",
          shipping: "",
          loading: false,
          createProduct: data.name,
          success: true,
        });
      }
    });
  };
  /* Product form */
  const newPostForm = () => {
    return (
      <div>
        <div className="text-center mb-3">
          <h1>Add Product</h1>
        </div>
        <form className="mb-3 form-content" onSubmit={clickSubmit}>
          <h3>Post Photo</h3>
          <div className="form-group">
            <input
              className="btn btn-outline-secondary"
              onChange={handleChange("photo")}
              type="file"
              name="photo"
              accept="image/*"
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Name:</label>
            <input
              onChange={handleChange("name")}
              type="text"
              className="form-control border border-secondary"
              value={name}
              placeholder=" Enter here..."
            ></input>
          </div>

          <div className="form-group">
            <label className="text-muted">Description:</label>
            <textarea
              onChange={handleChange("description")}
              className="form-control border border-secondary"
              value={description}
              placeholder=" Enter here..."
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Price:</label>
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control border border-secondary"
              value={price}
              placeholder=" Enter here..."
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Category:</label>
            <select
              onChange={handleChange("category")}
              className="form-control border border-secondary"
            >
              <option>Select Category?</option>
              {categories &&
                categories.map((c, i) => (
                  <option key={i} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="form-group">
            <label className="text-muted">Shipping:</label>
            <select
              onChange={handleChange("shipping")}
              className="form-control border border-secondary"
            >
              <option>Shipping?</option>
              <option value="0">NO</option>
              <option value="1">YES</option>
            </select>
          </div>

          <div className="form-group">
            <label className="text-muted">Quantity:</label>
            <input
              onChange={handleChange("quantity")}
              type="number"
              className="form-control border border-secondary"
              value={quantity}
              placeholder=" Enter here..."
            ></input>
          </div>

          <button className="btn btn-outline-primary">Create Product</button>
        </form>
      </div>
    );
  };
  /*Error message*/
  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      <h2>{error}</h2>
    </div>
  );
  /*Success message*/
  const showSuccess = () => (
    <div className="alert alert">
      {success ? (
        <h2 className="alert alert-info">New product is created!</h2>
      ) : (
        ""
      )}
    </div>
  );
  /*Loading message*/
  const showLoading = () =>
    loading && (
      <div className="alert alert-success">
        <h2>Loading...</h2>
      </div>
    );

  return (
    <Layout
      title="Add Something Good Please!"
      description={`Greetings ${user.name}, we want new games NOW `}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showError()}
          {showLoading()}
          {showSuccess()}
          {newPostForm()}
        </div>
      </div>
    </Layout>
  );
};

export default AddProduct;
