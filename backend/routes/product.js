const express = require("express");
const router = express.Router();
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");

// get all products
router.get("/products", getProducts);

// get specfic product by id
router.get("/product/:id", getSingleProduct);

// update single product
router.put("/admin/product/:id", updateProduct);

// create new product
router.post("/admin/product/new", newProduct);

// delete product
router.delete("/admin/product/:id", deleteProduct);

module.exports = router;
