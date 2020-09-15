import React from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";

const Card = ({ product, showViewProductButton = true }) => {
  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn btn-outline-primary mt-2 mb-2">
            View Product
          </button>
        </Link>
      )
    );
  };

  const showAddToCardButton = () => {
    return (
      <button className="btn btn-outline-warning mt-2 mb-2">Add to cart</button>
    );
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock</span>
    ) : (
      <span className="badge badge-warning badge-pill">In Stock</span>
    );
  };
  return (
    <div className="card">
      <div
        className="card-header"
        style={{
          height: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h3>{product.name}</h3>
      </div>
      <div className="card-body">
        <ShowImage item={product} url="product" />
        <p className="lead mt-2">
          {product.description.substring(0, 50) + "..."}
        </p>
        <h4 className="black-10">{`${product.price}€`}</h4>
        <h5 className="black-8">
          Category: {product && product.category && product.category.name}
        </h5>
        {showStock(product.quantity)}
        <p className="black-6">
          Added on {moment(product.createdAt).fromNow()}
        </p>

        {showViewButton(showViewProductButton)}

        {showAddToCardButton()}
      </div>
    </div>
  );
};

export default Card;
