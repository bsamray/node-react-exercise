const path = require('path');
const rootDir = require('./util/path');
const express = require('express');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views'); //default anyway

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(rootDir, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.render('404', { pageTitle: '404-Page not Found', path: '/404' });
})

app.listen(3000);