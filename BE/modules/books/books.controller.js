const bookService = require("./books.service");

const getAllBooks = async (req, res) => {
  try {
    const data = await bookService.getAllBooks(req, res);
    res.json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};
const createBook = async (req, res) => {
  try {
    const data = await bookService.createBook(req, res);
    res.json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateBook = async (req, res) => {
  try {
    const data = await bookService.updateBook(req);
    res.json({
      success: true,
      data: data,
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
};
const dltBook = async (req, res) => {
  try {
    const data = await bookService.dltBook(req);
    res.json({
      success: true,
      data: data,
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

const getAllById = async (req, res) => {
  try {
    const data = await bookService.getAllById(req);
    res.json({
      success: true,
      data: data,
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

module.exports = { getAllBooks, createBook, getAllById, dltBook, updateBook };
