const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const app = express();
const connectDatabase = require("./config/database");

// import routes
const products = require("./routes/product");

//import error middleware
const errorMiddleware = require("./middleware/errors");

// handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`Shutting down server due to uncaught exceptions`);
  process.exit(1);
});

dotenv.config({ path: "backend/config/config.env" });

// connect to database
connectDatabase();

// middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1", products);
app.use(errorMiddleware);

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Sever started on port:${process.env.PORT} in ${process.env.NODE_ENV}`
  );
});

// handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to unhandled promise rejection.`);
  server.close(() => {
    process.exit(1);
  });
});
