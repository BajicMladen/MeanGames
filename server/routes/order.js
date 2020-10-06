/* ROUTES FOR CRUD OPERATIONS FOR ORDERS*/

const express = require("express");
const router = express.Router();

/* middlewares*/
const { userById, addOrderToUserHistory } = require("../controllers/user");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const {
  orderById,
  create,
  listOrders,
  getStatusValues,
  updateOrderStatus,
} = require("../controllers/order");
const { decreaseQuantity } = require("../controllers/product");

router.post(
  "/order/create/:userId",
  requireSignin,
  isAuth,
  addOrderToUserHistory,
  decreaseQuantity,
  create
); // creating order(purchase)

router.get("/order/list/:userId", requireSignin, isAuth, isAdmin, listOrders); // get all orders from one user
router.get(
  "/order/status-values/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  getStatusValues
); // geting status of order for Admin list of orders

router.put(
  "/order/:orderId/status/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  updateOrderStatus
); // updating  order status

router.param("userId", userById);
router.param("orderId", orderById);

module.exports = router;
