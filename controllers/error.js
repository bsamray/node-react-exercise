exports.get404 = (req, res, next) => {
    res.render('404', { pageTitle: '404-Page not Found', path: '/404' });
};