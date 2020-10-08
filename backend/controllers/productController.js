import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// get all products
// GET /api/products
// Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// get single product by id
// GET /api/products/:id
// Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Artikel nicht gefunden...');
  }
});

export { getProducts, getProductById };
