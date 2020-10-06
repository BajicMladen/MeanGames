/*TOP MENU*/
import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/index";
import { itemTotal } from "./cartHelpers";
import logo from "./logo.png";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#e3bf0b" };
  } else {
    return { color: "#ffffff" };
  }
};

const Menu = ({ history }) => (
  <nav>
    <div className="nav nav-tabs bg-secondary justify-content-center">
      <div className="col-1">
        <img src={logo} />
      </div>
      <div className="col-6 mt-4">
        <h4>MeanGames</h4>
      </div>
      <li className="nav-item m-1">
        <Link className="nav-link" style={isActive(history, "/")} to="/">
          <h6>Home</h6>
        </Link>
      </li>

      <li className="nav-item m-1">
        <Link
          className="nav-link"
          style={isActive(history, "/shop")}
          to="/shop"
        >
          <h6>Shop</h6>
        </Link>
      </li>

      <li className="nav-item m-1">
        <Link
          className="nav-link"
          style={isActive(history, "/cart")}
          to="/cart"
        >
          <h6>
            Cart <span className="badge badge-primary">{itemTotal()}</span>
          </h6>
        </Link>
      </li>

      {isAuthenticated() && isAuthenticated().user.role === 0 && (
        <li className="nav-item m-1">
          <Link
            className="nav-link"
            style={isActive(history, "/user/dashboard")}
            to="/user/dashboard"
          >
            <h6>Profile</h6>
          </Link>
        </li>
      )}

      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <li className="nav-item m-1">
          <Link
            className="nav-link"
            style={isActive(history, "/admin/dashboard")}
            to="/admin/dashboard"
          >
            <h6>Profile</h6>
          </Link>
        </li>
      )}

      {!isAuthenticated() && (
        <Fragment>
          <li className="nav-item m-1">
            <Link
              className="nav-link"
              style={isActive(history, "/signin")}
              to="/signin"
            >
              <h6>Sign in</h6>
            </Link>
          </li>

          <li className="nav-item m-1">
            <Link
              className="nav-link"
              style={isActive(history, "/signup")}
              to="/signup"
            >
              <h6>Sign up</h6>
            </Link>
          </li>
        </Fragment>
      )}

      {isAuthenticated() && (
        <li className="nav-item m-1">
          <span
            className="nav-link"
            style={{ cursor: "pointer", color: "#ffffff" }}
            onClick={() =>
              signout(() => {
                history.push("/");
              })
            }
          >
            <h6>Sign out</h6>
          </span>
        </li>
      )}
    </div>
  </nav>
);

export default withRouter(Menu);
