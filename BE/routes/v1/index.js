const express = require("express");
const router = express.Router();
const bookRoute = require("./route.book");

router.use("/v1", bookRoute);

module.exports = router;
