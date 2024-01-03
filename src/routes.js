const router = require("express").Router();


router.get('/', (req, res) => {
    res.render('home.ejs', {
        title: "Home Page"
    })
});

router.get('/add', (req, res) => {
    res.render('add_users.ejs', {
        title: "Add Users"
    })
});

module.exports = router;