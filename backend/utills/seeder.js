// For inserting product in db file

const Product = require("../models/Product");
const dotenv = require("dotenv");
const connectDatabase = require("../config/database");
const products = require("../data/product.json");
const { connect } = require("mongoose");
const connnectDatabase = require("../config/database");

// set dotenv file
dotenv.config({ path: "backend/config/config.env" });

connnectDatabase();

const seedProduct = async () => {
  try {
    // delete products
    await Product.deleteMany();
    console.log("Products deleted");

    // then insert products
    await Product.insertMany(products);
    console.log("All products are added");

    // exit process
    process.exit();
  } catch (err) {
    console.log(err.messsage);
    process.exit();
  }
};

seedProduct();
