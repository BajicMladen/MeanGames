import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/index";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./apiAdmin";

const ManageProducts = () => {
  const [products, setProduts] = useState([]);

  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProduts(data);
      }
    });
  };

  const { user, token } = isAuthenticated();

  const destroy = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProducts();
      }
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Layout
      title="Update or Delete,That Is The Question! "
      description="Delete Old And Add Gold!"
    >
      <div className="text-center mb-4">
        <h1>Delete or Update products</h1>
      </div>
      <div className="row ">
        <div className="col-12">
          <ul className="list-group">
            <h3 className="text-center  border-top border-secondary">
              Total {products.length} products!
            </h3>
            {products.map((p, i) => (
              <li className="list-group-item d-flex justify-content-between align-items-center border border-secondary">
                <strong>{p.name}</strong>
                <Link to={`/admin/product/update/${p._id}`}>
                  <span className="badge badge-warning badge">Update</span>
                </Link>
                <span
                  onClick={() => destroy(p._id)}
                  className="badge badge-danger badge"
                >
                  Delete
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default ManageProducts;
