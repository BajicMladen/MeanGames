/* ADMIN DASHBOARD */
import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/index";
import { Link } from "react-router-dom";
const AdminDashboard = () => {
  const {
    user: { name, lastname, email, role },
  } = isAuthenticated();
  // sidebar links in admin dashboard
  const adminLinks = () => {
    return (
      <div className="card text-center">
        <h4 className="card-header">Admin Links</h4>
        <ul className="list-group">
          <li className="list-group-item border border-primary ">
            <Link to="/create/category" className="nav-link">
              <h5>Create Category</h5>
            </Link>
          </li>
          <li className="list-group-item ">
            <Link to="/create/product" className="nav-link">
              <h5>Create Product</h5>
            </Link>
          </li>

          <li className="list-group-item border border-primary">
            <Link to="/admin/products" className="nav-link">
              <h5>Manage Products</h5>
            </Link>
          </li>

          <li className="list-group-item">
            <Link to="/admin/orders" className="nav-link">
              <h5>View Orders</h5>
            </Link>
          </li>
        </ul>
      </div>
    );
  };
  // center of page- admin info
  const adminInfo = () => {
    return (
      <div className="card mb-5 border border-primary text-center">
        <h3 className="card-header">Admin Informations</h3>
        <ul className="list-group">
          <li className="list-group-item border border-primary">
            <h5>{name}</h5>
          </li>
          <li className="list-group-item ">
            <h5>{lastname}</h5>
          </li>
          <li className="list-group-item border border-primary">
            <h5>{email}</h5>
          </li>
          <li className="list-group-item">
            <h5>{role === 1 ? "Admin" : "User"}</h5>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Layout
      title="Dashboard"
      description={`Greetings ${name}, u wanna play?`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-3">{adminLinks()}</div>
        <div className="col-9">{adminInfo()}</div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
