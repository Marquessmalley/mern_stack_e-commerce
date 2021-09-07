const mongoose = require("mongoose");

const connnectDatabase = () => {
  mongoose
    .connect(process.env.DB_LOCAL_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con) => {
      console.log(`Mongodb successfully conncted to DB:${con.connection.name}`);
    });
};

module.exports = connnectDatabase;
