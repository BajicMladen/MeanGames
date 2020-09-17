import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/index";
import { listOrders } from "./apiAdmin";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);

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

  useEffect(() => {
    loadOrders();
  }, []);

  const showOrdersLength = (orders) => {
    if (orders.length > 0) {
      return (
        <h1 className="text-danger display-2">Total orders: {orders.length}</h1>
      );
    } else {
      return <h1 className="text-danger">No orders yet!</h1>;
    }
  };

  const showInput = (key, value) => {
    return (
      <div className="input-group mb-2 mr-sm-2">
        <div className="input-group-prepend">
          <div className="input-group-text">{key}</div>
        </div>
        <input
          type="text"
          value={value}
          className="form-control"
          readOnly
        ></input>
      </div>
    );
  };

  return (
    <Layout
      title="Orders"
      description={`Hi Admin ${user.name},please menage orders fast!`}
      className=""
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showOrdersLength(orders)}

          {orders.map((order, oIndex) => {
            return (
              <div
                className="mt-5 mb-5"
                key={oIndex}
                style={{ borderBottom: "5px solid gray" }}
              >
                <h2 className="mb-5">
                  <span className="bg-primary">Order ID: {order._id}</span>
                </h2>

                <ul className="list-group mb-2">
                  <li className="list-group-item">Status: {order.status}</li>
                  <li className="list-group-item">
                    Transaction ID: {order.transaction_id}
                  </li>
                  <li className="list-group-item">Amount:{order.amount}</li>
                  <li className="list-group-item">
                    {`Ordered by: ${order.user.name} 
                    ${order.user.lastname}`}
                  </li>
                  <li className="list-group-item">
                    Oredered:{moment(order.createdAt).fromNow()}
                  </li>
                  <li className="list-group-item">Oredered:{order.address}</li>
                </ul>
                <h3 className="mt-4 mb-4 font-italic">
                  Total product in the order: {order.products.length}
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
