import React from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";

const Card = ({ product }) => {
  return (
    <div className="col-3 mb-3">
      <div className="card">
        <div className="card-header">
          <h3>{product.name}</h3>
        </div>
        <div className="card-body">
          <ShowImage item={product} url="product" />
          <h6>{product.description.substring(0, 50)}</h6>
          <h4>{`${product.price}€`}</h4>
          <Link to="/">
            <button className="btn btn-outline-primary mt-2 mb-2">
              View Game
            </button>
          </Link>
          <Link to="/">
            <button className="btn btn-outline-warning mt-2 mb-2">
              Add to card
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
