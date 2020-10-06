/* USER DASHBOARD */
import React, { useEffect, useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/index";
import { Link } from "react-router-dom";
import moment from "moment";
import { getPurchaseHistory } from "./apiUser";

const Dashboard = () => {
  //User states
  const [history, setHistory] = useState([]);

  const {
    user: { _id, name, lastname, email, role },
  } = isAuthenticated();
  const token = isAuthenticated().token;

  const init = (userId, token) => {
    getPurchaseHistory(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setHistory(data);
      }
    });
  };

  useEffect(() => {
    init(_id, token);
  }, []);

  //Sidebar
  const userLinks = () => {
    return (
      <div className="card text-center">
        <h4 className="card-header">UserLinks</h4>
        <ul className="list-group">
          <li className="list-group-item border border-primary">
            <Link to="/cart" className="nav-link">
              My Cart
            </Link>
          </li>
          <li className="list-group-item">
            <Link to={`/profile/${_id}`} className="nav-link">
              Update Profile
            </Link>
          </li>
        </ul>
      </div>
    );
  };
  //center of page info
  const userInfo = () => {
    return (
      <div className="card mb-5 text-center">
        <h3 className="card-header">User Informations</h3>
        <ul className="list-group">
          <li className="list-group-item border border-primary">{name}</li>
          <li className="list-group-item">{lastname}</li>
          <li className="list-group-item border border-primary">{email}</li>
          <li className="list-group-item">{role === 1 ? "Admin" : "User"}</li>
        </ul>
      </div>
    );
  };
  //USER PURCHASE HISTORY
  const purchaseHistory = (history) => {
    return (
      <div className="card mb-5 text-center">
        <h2 className="card-header">Purchase history</h2>
        <ul className="list-group border border-primary">
          <li
            className="list-group-item "
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "start",
            }}
          >
            {history.map((h, i) => {
              return (
                <div className=" col-12 text-center m-3 border-bottom border-primary">
                  <hr />
                  {h.products.map((p, i) => {
                    return (
                      <div key={i} className="text-center">
                        <h4>Purchase:{i + 1}</h4>
                        <h6>Product name: {p.name}</h6>
                        <h6>Product price: ${p.price}</h6>
                        <h6>Purchased date: {moment(p.createdAt).fromNow()}</h6>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Layout
      title="Dashboard"
      description={`Greetings ${name},your informatins are safe with us!`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-3">{userLinks()}</div>
        <div className="col-9">
          {userInfo()}
          {purchaseHistory(history)}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
