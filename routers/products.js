import express from 'express';
import Products from '../db/models/product.model.js';

import jwtAuthorizer from '../middlewares/jwtAuthorizer.js';

const productsRouter = express.Router();

productsRouter
  .route('/')
  .get(async (req, res) => {
    let products;
    const { category, tags, isOnSale, priceRange, inStock, ratingRange } =
      req.query;

    const query = {};

    if (category) {
      query.productCategory = category;
    }
    if (tags && tags.length > 0) {
      query.productTags = { $in: tags };
    }
    if (isOnSale) {
      query.productIsOnSale = isOnSale === 'true';
    }
    if (priceRange) {
      query.productSalePrice = {
        $gte: Number(priceRange[0]),
        $lte: Number(priceRange[1]),
      };
    }
    if (inStock) {
      query.productQuantityInStock = true;
    }
    if (ratingRange) {
      query.productRating = {
        $gte: Number(ratingRange[0]),
        $lte: Number(ratingRange[1]),
      };
    }
    try {
      products = await Products.find(query);
      res.send(products);
    } catch (err) {
      res.status(err.status || 500);
      res.render('error', { error: err.message });
    }
  })
  .post(jwtAuthorizer, async (req, res) => {
    if (req.user.role !== 'seller') {
      res.status(401).json({ message: 'Only sellers can create products' });
      return;
    }
    let products;
    try {
      products = await Products.insertMany(req.body.products);
      res.send(products);
    } catch (err) {
      res.status(err.status || 500);
      res.render('error', { error: err.message });
    }
  });

export default productsRouter;
