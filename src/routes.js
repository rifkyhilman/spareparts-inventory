  const router = require("express").Router();

const { getAllProducts } = require('./product/product.service');

router.get('/', async (req, res) => {

    const products = await getAllProducts();

    res.render('home.ejs', {
        title: "Home Page",
        data: products
    })
});

router.post('/add', (req, res) => {
    
    res.render('add_users.ejs', {
        title: "Add Users"
    })
});

module.exports = router;