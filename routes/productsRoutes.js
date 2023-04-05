const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const { isValidObjectId } = require("./productsMiddleware");
const Product = require("./productModel");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

router.get(
  "/:id",
  isValidObjectId,
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.json(product);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { nom, prix, description } = req.body;
    const product = new Product({ nom, prix, description });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  })
);

router.put(
  "/:id",
  isValidObjectId,
  asyncHandler(async (req, res) => {
    const { nom, prix, description } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      product.nom = nom;
      product.prix = prix;
      product.description = description;
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);

router.delete(
  "/:id",
  isValidObjectId,
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      res.json({ message: "Product removed" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);

module.exports = router;
