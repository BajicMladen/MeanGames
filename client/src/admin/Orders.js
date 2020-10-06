/* LIST OF ORDERS TO MENAGE*/

import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/index";
import { listOrders, getStatusValues, updateOrderStatus } from "./apiAdmin";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState([]);

  const { user, token } = isAuthenticated();

  const loadOrders = () => {
    listOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  const loadStatusValues = () => {
    getStatusValues(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setStatusValues(data);
      }
    });
  };

  useEffect(() => {
    loadOrders();
    loadStatusValues();
  }, []);

  const showOrdersLength = (orders) => {
    if (orders.length > 0) {
      return (
        <div className="text-center mb-4">
          <h1 className="alert alert-secondary">
            Total orders: {orders.length}
          </h1>
        </div>
      );
    } else {
      return (
        <div className="text-center mb-4">
          <h1 className="alert alert-secondary">No orders yet!</h1>
        </div>
      );
    }
  };

  const showInput = (key, value) => {
    return (
      <div className="input-group mb-2 mr-sm-2 text-center">
        <div className="input-group">
          <div className="input-group-text">{key}</div>
        </div>
        <input
          type="text"
          value={value}
          className="custom-select my-1 mr-sm-2  border border-secondary"
          readOnly
        ></input>
      </div>
    );
  };

  const handleStatusChange = (e, orderId) => {
    updateOrderStatus(user._id, token, orderId, e.target.value).then((data) => {
      if (data.error) {
        console.log("Status update failed");
      } else {
        loadOrders();
      }
    });
  };

  const showStatus = (o) => (
    <div className="form-group text-center">
      <h3 className="alert alert-primary">Status: {o.status}</h3>
      <select
        className="custom-select my-1 mr-sm-2  border border-secondary"
        onChange={(e) => handleStatusChange(e, o._id)}
      >
        <option>UpdateStatus</option>
        {statusValues.map((status, index) => (
          <option key={index} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <Layout
      title="Orders"
      description={`Hi Admin ${user.name}, Please Menage Orders Fast!`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showOrdersLength(orders)}

          {orders.map((order, oIndex) => {
            return (
              <div
                className="mt-5 mb-5 text-center"
                key={oIndex}
                style={{ borderBottom: "5px solid gray" }}
              >
                <h2 className="m-3">
                  <span className="alert alert-info">
                    Order ID: {order._id}
                  </span>
                </h2>

                <ul className="list-group border border-secondary">
                  <li className="list-group-item border border-secondary">
                    {showStatus(order)}
                  </li>
                  <li className="list-group-item border border-secondary">
                    <h5>Transaction ID: {order.transaction_id}</h5>
                  </li>
                  <li className="list-group-item border border-secondary">
                    <h5>Amount:{order.amount}</h5>
                  </li>
                  <li className="list-group-item border border-secondary">
                    <h5>{`Ordered by: ${order.user.name} 
                    ${order.user.lastname}`}</h5>
                  </li>
                  <li className="list-group-item border border-secondary">
                    <h5> Oredered:{moment(order.createdAt).fromNow()}</h5>
                  </li>
                  <li className="list-group-item border border-secondary">
                    <h5> Order address:{order.address}</h5>
                  </li>
                </ul>

                <h3 className="mt-4 mb-4 font-italic">
                  Total product in the order: {order.products.length}
                  <br />
                  Product/s info:
                </h3>

                {order.products.map((p, pIndex) => (
                  <div
                    className="mb-4"
                    key={pIndex}
                    style={{ padding: "20px", border: "1px solid gray" }}
                  >
                    {showInput("Product name: ", p.name)}
                    {showInput("Product price: ", p.price)}
                    {showInput("Product total:", p.count)}
                    {showInput("Product Id: ", p._id)}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
