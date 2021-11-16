const express = require('express');
const { truncateSync } = require('fs');
const path = require('path');
const rootDir = require('../util/path');
const adminController = require('../controllers/admin');

const router = express.Router();

// get /admin/add-product
router.get('/add-product', adminController.getAddProduct); //just reference to the function, not execute it

router.get('/products', adminController.getProducts);

// post /admin/add-product
router.post('/add-product', adminController.postAddProduct);

router.get('/add-product/:productId', adminController.getEditProduct);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;
