import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
import Search from "./Search";

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    return loadProductsByArrival(), loadProductsBySell();
  }, []);

  return (
    <Layout
      title="Game Page"
      description="Ohh...I Mean..Home Page.."
      className="container "
    >
      <Search></Search>
      <hr />
      <h2 className="alert alert-secondary mb-4 text-center">Best Sellers</h2>
      <div className="row">
        {productsBySell.map((product, i) => (
          <div key={i} className="col-4 mb-3">
            <Card product={product} />
          </div>
        ))}
      </div>
      <br></br>
      <hr></hr>
      <br></br>

      <h2 className="alert alert-secondary mb-4 text-center">New Games</h2>
      <div className="row">
        {productsByArrival.map((product, i) => (
          <div key={i} className="col-4 mb-4">
            <Card product={product} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
