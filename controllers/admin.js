const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        edit: false,
        product: {}
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = parseFloat(req.body.price);
    const description = req.body.description;
    const product = new Product(null, title, imageUrl, description, price);
    product.save(() => {
        res.redirect('/');
    });
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit; // gets String value
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    const product = Product.findById(prodId, product => {
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            edit: editMode,
            product: product
        });
    })
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updTitle = req.body.title;
    const updImageUrl = req.body.imageUrl;
    const updPrice = parseFloat(req.body.price);
    const updDescription = req.body.description;
    const updProduct = new Product(prodId, updTitle, updImageUrl, updDescription, updPrice);
    updProduct.save(() => {
        res.redirect('/admin/products');
    });
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.delete(prodId, () => {
        res.redirect('/admin/products');
    });
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        });
    });
}
