const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const app = express();
const connectDatabase = require("./config/database");

// import routes
const products = require("./routes/product");

dotenv.config({ path: "backend/config/config.env" });

// connect to database
connectDatabase();

// middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1", products);

app.listen(process.env.PORT, () => {
  console.log(
    `Sever started on port:${process.env.PORT} in ${process.env.NODE_ENV}`
  );
});
