const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  book_name: {
    type: String,
  },
  book_ISBN: {
    type: Number,
    maxlength: 10,
  },
  book_Author: {
    type: String,
  },
  book_Published: {
    type: Date,
  },
  book_Publisher: {
    type: String,
  },
  book_Price: {
    type: Number,
  },
  book_Code: {
    type: String,
  },
});

const Books = mongoose.model("Books", BookSchema);
module.exports = Books;
