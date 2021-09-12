const Product = require("../models/Product");
const ErrorHandler = require("../utills/errorHandle");
const catchAysncErrors = require("../middleware/catchAsyncError");
const APIFeatures = require("../utills/apiFeatures");

// create new product  =>  /api/v1/admin/product/new
exports.newProduct = catchAysncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(200).json({
    success: true,
    product,
  });
});

// getting all products  =>  /api/v1/products?keyword=apple
module.exports.getProducts = catchAysncErrors(async (req, res, next) => {
  const apiFeatures = new APIFeatures(Product.find(), req.query).search();

  const products = await apiFeatures.query;

  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
});

// getting single product details  => /api/v1/product/:id

module.exports.getSingleProduct = catchAysncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({ success: true, product });
  console.log("sent");
});

// Update product  => /api/v1/admin/product/:id
module.exports.updateProduct = catchAysncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({ success: true, product });
});

// Delete product =>  /api/v1/admin/product/:id
module.exports.deleteProduct = catchAysncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  await Product.deleteOne();

  res.status(200).json({ success: true, message: "Product deleted." });
});
