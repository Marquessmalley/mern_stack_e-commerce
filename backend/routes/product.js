const express = require("express");
const router = express.Router();
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");
const { isAuthenticated, authorizeRoles } = require("../middleware/auth");

// get all products
router.get("/products", isAuthenticated, getProducts);

// get specfic product by id
router.get("/product/:id", getSingleProduct);

// update single product
router.put(
  "/admin/product/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  updateProduct
);

// create new product
router.post(
  "/admin/product/new",
  isAuthenticated,
  authorizeRoles("admin"),
  newProduct
);

// delete product
router.delete(
  "/admin/product/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteProduct
);

module.exports = router;
