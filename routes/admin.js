const express = require('express');
const { truncateSync } = require('fs');
const path = require('path');
const rootDir = require('../util/path');
const productsController = require('../controllers/products');

const router = express.Router();

// get /admin/add-product
router.get('/add-product', productsController.getAddProduct); //just reference to the function, not execute it

// post /admin/add-product
router.post('/add-product', productsController.postAddProduct);

module.exports = router;