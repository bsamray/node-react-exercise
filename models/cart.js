const fs = require('fs');
const { parse } = require('path');
const path = require('path');
const rootDir = require('../util/path');

const p = path.join(rootDir, 'data', 'cart.json');

module.exports = class Cart {
    static addProduct(id, productPrice) {
        let cart = {products: [], totalPrice: 0};
            fs.readFile(p, (err, fileContent) => {
                if (!err) {
                    cart = JSON.parse(fileContent);
                }
                const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
                const existingProduct = cart.products[existingProductIndex];
                let updatedProduct;
                if (existingProduct) {
                    updatedProduct = { ...existingProduct};
                    updatedProduct.qty = updatedProduct.qty + 1;
                    cart.products = [...cart.products];
                    cart.products[existingProductIndex] = updatedProduct;
                } else {
                    updatedProduct = { id: id, qty: 1};
                    cart.products = [...cart.products, updatedProduct];
                }
                cart.totalPrice = cart.totalPrice + productPrice;
                fs.writeFile(p, JSON.stringify(cart), err => {
                    if (err) {
                        console.log(err);
                    }
                })
            });
            cart.products = [...cart.products];
    }

    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return;
            }
            const updatedCart = { ...JSON.parse(fileContent) };
            console.log("11111112" + JSON.stringify(updatedCart));
            const product = updatedCart.products.find(prod => prod.id === id);
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
            console.log("11111113" + updatedCart.totalPrice + "!!!" + productPrice + "%%%" + productQty + "***" +  (updatedCart.totalPrice - productPrice * productQty));
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;
            console.log("11111114" + JSON.stringify(updatedCart));
        });
    }
}