const mongoose = require("mongoose");
require("dotenv").config();

const connectionParams = {
  useUnifiedTopology: true,
};

mongoose.set("strictQuery", false);

exports.dbConnect = mongoose
  .connect(process.env.DB_STRING, connectionParams)
  .then(() => console.log("db connected"))
  .catch((err) => console.log("error: ", err));
