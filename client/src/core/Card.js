/* CARD LAYOUT FOR GAMES(PRODUCTS) */

import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";
import { addItem, updateItem, removeItem } from "./cartHelpers";

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = (f) => f, // default value of function
  run = undefined, // default value of undefined
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn btn-outline-primary mt-2 mb-2 card-btn-1">
            View Product
          </button>
        </Link>
      )
    );
  };

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart"></Redirect>;
    }
  };
  /*BUTTONS*/
  const showAddToCartBtn = (showAddToCartButton) => {
    return (
      showAddToCartButton && (
        <button
          onClick={addToCart}
          className="btn btn-outline-warning mt-2 mb-2 card-btn-1  "
        >
          Add to cart
        </button>
      )
    );
  };

  const showRemoveBtn = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run);
          }}
          className="btn btn-outline-danger mt-2 mb-2 card-btn-1  "
        >
          Remove Product
        </button>
      )
    );
  };
  // is in stoc?
  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary ">In Stock</span>
    ) : (
      <span className="badge badge-warning ">In Stock</span>
    );
  };

  const handleChange = (productId) => (event) => {
    setRun(!run);
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };
  //Quantity  show
  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h5 className="m-3">Quantity:</h5>
          <input
            type="number"
            className="form-control border border-secondary mt-0 "
            value={count}
            onChange={handleChange(product._id)}
            style={{ width: "100px" }}
          />
        </div>
      )
    );
  };

  return (
    <div className="card border border-secondary">
      <div
        className="card-header bg-info text-center font-weight-bold text-justify"
        style={{
          height: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>{product.name}</h2>
      </div>
      <div className="card-body text-center">
        {shouldRedirect(redirect)}

        <ShowImage item={product} url="product" className="black-10" />
        {showStock(product.quantity)}
        {showViewProductButton ? (
          <p className="lead mt-2 black-9">
            {product.description.substring(0, 50) + "..."}
          </p>
        ) : (
          <p className="lead mt-2 black-9">{product.description}</p>
        )}
        <h4 className="black-8 mt-1">{`${product.price}€`}</h4>
        <h5 className="black-7 mt-1">
          Category: {product && product.category && product.category.name}
        </h5>

        <p className="black-5 mt-1">
          Added on {moment(product.createdAt).fromNow()}
        </p>

        {showViewButton(showViewProductButton)}

        {showAddToCartBtn(showAddToCartButton)}

        {showRemoveBtn(showRemoveProductButton)}

        {showCartUpdateOptions(cartUpdate)}
      </div>
    </div>
  );
};

export default Card;
