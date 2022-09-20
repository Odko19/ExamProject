const express = require("express");
const router = express.Router();
const bookController = require("../../modules/books/books.controller");

router.get("/", bookController.getAllBooks);
router.post("/", bookController.createBook);
router.get("/:id", bookController.getAllById);
router.put("/:id", bookController.updateBook);
router.delete("/:id", bookController.dltBook);

module.exports = router;
