import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Singup from "./user/Signup";
import Singin from "./user/Signin";
import Home from "./core/Home";
import PrivateRoute from "./auth/PrivateRoute";
import Dashboard from "./user/UserDashboard";
import AdminRoute from "./auth/AdminRoute";
import AdminDashboard from "./user/AdminDashboard";
import AddCategory from "./admin/AddCategory";
import AddCatrgory from "./admin/AddCategory";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Singin} />
        <Route path="/signup" exact component={Singup} />
        <PrivateRoute
          path="/user/dashboard"
          exact
          component={Dashboard}
        ></PrivateRoute>
        <AdminRoute
          path="/admin/dashboard"
          exact
          component={AdminDashboard}
        ></AdminRoute>

        <AdminRoute
          path="/create/category"
          exact
          component={AddCatrgory}
        ></AdminRoute>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
