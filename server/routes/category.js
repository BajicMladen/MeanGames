/* ROUTES FOR CRUD OPERATIONS FOR CATEGORIES*/

const express = require("express");
const router = express.Router();

/* middlewares */
const {
  create,
  categoryById,
  read,
  update,
  remove,
  list,
} = require("../controllers/category");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.get("/category/:categoryId", read); // get single category
router.post("/category/create/:userId", requireSignin, isAuth, isAdmin, create); // admin route for creating category
router.put(
  "/category/:categoryId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  update
); // admin route for updating category
router.delete(
  "/category/:categoryId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  remove
); // admin route for delete category
router.get("/categories", list); // get all categories

router.param("categoryId", categoryById);
router.param("userId", userById);

module.exports = router;
