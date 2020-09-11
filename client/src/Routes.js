import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Singup from "./user/Signup";
import Singin from "./user/Signin";
import Home from "./core/Home";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Singin} />
        <Route path="/signup" exact component={Singup} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
