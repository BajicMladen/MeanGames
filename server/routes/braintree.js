/* ROUTES FOR CHECKOUT(PAY)*/

const express = require("express");
const router = express.Router();

/* middlewares */
const { userById } = require("../controllers/user");
const { requireSignin, isAuth } = require("../controllers/auth");
const { generateToken, processPayment } = require("../controllers/braintree");

router.get("/braintree/getToken/:userId", requireSignin, isAuth, generateToken); // getting token from user
router.post(
  "/braintree/payment/:userId",
  requireSignin,
  isAuth,
  processPayment
); // proces payment

router.param("userId", userById);

module.exports = router;
