const Books = require("./books.module");

const getAllBooks = async (req, res) => {
  const data = await Books.find();
  return data;
};
const createBook = async (req, res) => {
  const data = new Books(req.body);
  return data.save();
};

const updateBook = async (req) => {
  const { id } = req.params;
  console.log(id);
  await Books.findByIdAndUpdate(id, req.body);
  const data = await Books.findById(id);
  return data;
};

const dltBook = async (req) => {
  const { id } = req.params;
  const data = await Books.findByIdAndDelete(id);
  return data;
};

const getAllById = async (req) => {
  const { id } = req.params;
  const data = await Books.findById(id);
  return data;
};

module.exports = { getAllBooks, createBook, updateBook, dltBook, getAllById };
