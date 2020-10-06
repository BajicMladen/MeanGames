/* ROUTES FOR CRUD OPERATIONS FOR USER*/
const express = require("express");
const router = express.Router();

/* middlewares */
const {
  userById,
  read,
  update,
  purchaseHistory,
} = require("../controllers/user");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");

router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
  res.json({
    user: req.profile,
  });
}); // admin route for getting user

router.get("/user/:userId", requireSignin, isAuth, read); // get single user by ID

router.get("/orders/by/user/:userId", requireSignin, isAuth, purchaseHistory); // get user purchase history

router.put("/user/:userId", requireSignin, isAuth, update); // update user

router.param("userId", userById);

module.exports = router;
