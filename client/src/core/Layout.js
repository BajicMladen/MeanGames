import React from "react";
import Menu from "./Menu";
import "../style.css";

const Layout = ({
  title = "Title",
  description = "Description",
  className,
  children,
}) => (
  <div>
    <Menu />

    <div className="jumbotron text-center">
      <h2>{title}</h2>
      <p className="lead">{description}</p>
    </div>
    <div className={className}>{children}</div>
    <hr />
    <div className="text-center m-4">
      <h3>Do Not Blame The Game, Blame The Player!</h3>
    </div>
    <hr />
  </div>
);

export default Layout;
