const express = require("express");
const app = express();
const mongoose = require("mongoose");
const router = require("./routes/v1/index");
const cors = require("cors");

require("dotenv").config();
const PORT = process.env.PORT;
const MONGO_SERVER_ATLAS = process.env.MONGO_SERVER_ATLAS;

app.use(cors());
app.use(express.json());
app.use("/", router);

mongoose.connect(MONGO_SERVER_ATLAS).then(() => {
  console.log("Mongo server Connection");
  app.listen(PORT, () => {
    console.log("server running" + PORT);
  });
});
