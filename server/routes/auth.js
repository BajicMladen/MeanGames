/* ROUTES FOR AUTHENTICATION WITH MIDDLEWARES*/

const express = require("express");
const router = express.Router();

/* middlewares */
const { userSignupValidator } = require("../validator/index");

const {
  signup,
  signin,
  signout,
  requireSignin,
} = require("../controllers/auth");

router.post("/signup", userSignupValidator, signup); // signup route

router.post("/signin", signin); // signin route

router.get("/signout", signout); //signout route

module.exports = router;
