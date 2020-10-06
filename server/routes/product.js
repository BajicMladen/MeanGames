/* ROUTES FOR CRUD OPERATIONS FOR PRODUCTS*/
const express = require("express");
const router = express.Router();

/* middlewares*/
const {
  create,
  productById,
  read,
  remove,
  update,
  list,
  listRelated,
  listCategories,
  listBySearch,
  listSearch,
  photo,
} = require("../controllers/product");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const product = require("../models/product");

router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create); //  create product route
router.get("/product/:productId", read); // getting product by its ID
router.delete(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  remove
); // route for product delete
router.put(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  update
); // route for product update

router.get("/products", list); // get all products
router.get("/products/search", listSearch); //
router.get("/products/related/:productId", listRelated); //get related products
router.get("/products/categories", listCategories); // get product category

router.post("/products/by/search", listBySearch); // GET products by search
router.get("/product/photo/:productId", photo); // get product photo from db

/* Param run when mentioned*/
router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
