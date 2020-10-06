import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getCart } from "./cartHelpers";
import Card from "./Card";
import { Link } from "react-router-dom";
import Checkout from "./Checkout";

const Cart = () => {
  //States
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  //Cart products
  const showItems = (items) => {
    return (
      <div className="text-center">
        <h2 className="alert alert-secondary">
          You picked {`${items.length}`} games!
        </h2>
        <hr />
        {items.map((product, i) => (
          <Card
            key={i}
            product={product}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveProductButton={true}
            setRun={setRun}
            run={run}
          ></Card>
        ))}
      </div>
    );
  };
  //empty cart message
  const noItemsMessage = () => (
    <div className="text-center">
      <h2>
        Why is your cart empty? <br />
        <br></br>
        <Link to="/shop">{"----> BUY GAMES NOW! <----"}</Link>
      </h2>
    </div>
  );

  return (
    <Layout
      title="My Cart"
      description="Nice choice player, sure you don`t need more?"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-6 mb-3">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>

        <div className="col-6 text-center alert alert-secondary">
          <h2 className="m-4">Your cart summary</h2>
          <hr />
          <Checkout products={items} setRun={setRun} run={run}></Checkout>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
