const Product = require("../models/Product");

// create new product  =>  /api/v1/admin/product/new
exports.newProduct = async (req, res, next) => {
  try {
    console.log(req.body);
    const product = await Product.create(req.body);

    res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    console.log(err);
  }
};

// getting all products  =>  /api/v1/products
module.exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (err) {
    console.log(err);
  }
};

// getting single product details  => /api/v1/product/:id

module.exports.getSingleProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "Prodcut not found" });
    }

    res.status(200).json({ success: true, product });
  } catch (err) {
    console.log(err);
  }
};

// Update product  => /api/v1/admin/product/:id
module.exports.updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "Prodcut not found" });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({ success: true, product });
  } catch (err) {
    console.log(err);
  }
};

// Delete product =>  /api/v1/admin/product/:id
module.exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "Prodcut not found" });
    }

    await Product.deleteOne();

    res.status(200).json({ success: true, message: "Product deleted." });
  } catch (err) {
    console.log(err);
  }
};
