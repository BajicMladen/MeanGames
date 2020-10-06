/*CHECKOUT*/
import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/index";
import { Link } from "react-router-dom";
import {
  getBraintreeClientToken,
  processPayment,
  createOrder,
} from "./apiCore";
import DropIn from "braintree-web-drop-in-react";
import { emptyCart } from "./cartHelpers";

const Checkout = ({ products, setRun = (f) => f, run = undefined }) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address: "",
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then((data) => {
      if (data.err) {
        setData({ ...data, error: data.error });
      } else {
        setData({ clientToken: data.clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);
  // get total amount for all product in cart
  const getTotal = () => {
    return products.reduce((currentValuem, nextValue) => {
      return currentValuem + nextValue.count * nextValue.price;
    }, 0);
  };

  const showCheckout = () => {
    return isAuthenticated() ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to="/signin">
        <button className="btn btn-outline-primary">Sign in to buy</button>
      </Link>
    );
  };

  let deliveryAdress = data.address;
  // Buy action true payPal or credit card
  const buy = () => {
    //send nonce to server, nonce - data.instanc.req.PaymentMethod()
    setData({ loading: true });
    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((data) => {
        //console.log(data);
        nonce = data.nonce;

        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products),
        };

        processPayment(userId, token, paymentData)
          .then((response) => {
            //create order
            const createOrderData = {
              products: products,
              transaction_id: response.transaction.id,
              amount: response.transaction.amount,
              address: deliveryAdress,
            };

            createOrder(userId, token, createOrderData)
              .then((response) => {
                emptyCart(() => {
                  setRun(!run);
                  setData({
                    loading: false,
                    success: true,
                  });
                });
              })
              .catch((error) => {
                setData({ loading: false });
              });
          })
          .catch((error) => {
            console.log(error);
            setData({ loading: false });
          });
      })
      .catch((error) => {
        //console.log("dropin error", error);
        setData({ ...data, error: error.message });
      });
  };

  const handleAdress = (event) => {
    setData({ ...data, address: event.target.value });
  };
  //Address and address validation
  const showDropIn = () => {
    return (
      <div onBlur={() => setData({ ...data, error: "" })}>
        {data.clientToken !== null && products.length > 0 ? (
          <div>
            <div className="gorm-group mb-3 text-center">
              <label className="text-muted">Delivery address:</label>
              <textarea
                onChange={handleAdress}
                className="form-control border border-secondary"
                value={data.address}
                placeholder="Type your delivery address here..."
              />
            </div>
            <DropIn
              options={{
                authorization: data.clientToken,
                paypal: {
                  flow: "vault",
                },
              }}
              onInstance={(instance) => (data.instance = instance)}
            />
            {console.log(data.address)}
            {data.address !== "" && data.address !== undefined ? (
              <button onClick={buy} className="btn btn-outline-primary">
                Pay
              </button>
            ) : (
              <h2>U must insert address to buy!</h2>
            )}
          </div>
        ) : null}
      </div>
    );
  };
  //erroe message
  const showError = (error) => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };
  //show success message
  const showSuccess = (success) => {
    return (
      <div
        className="alert alert-info"
        style={{ display: success ? "" : "none" }}
      >
        Thank you player ! Transaction was succesifull!
      </div>
    );
  };
  // loading message
  const showLoading = (loading) =>
    loading && <h2 className="text-danger">Loading...</h2>;

  return (
    <div>
      <h2>Total: €{getTotal()}</h2>
      {showLoading(data.loading)}
      {showError(data.error)}
      {showSuccess(data.success)}

      {showCheckout()}
    </div>
  );
};

export default Checkout;
