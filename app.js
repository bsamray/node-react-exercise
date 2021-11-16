const path = require('path');
const rootDir = require('./util/path');
const express = require('express');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views'); //default anyway

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(rootDir, 'public')));

app.use('/admin', adminRoutes);

app.use(shopRoutes);

app.use(errorController.get404);

app.listen(process.env.PORT || 5000);
