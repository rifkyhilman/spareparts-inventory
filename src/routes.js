const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {

    res.render('Home.ejs', {
        nama: "Rifki",
        title: "Halaman Home"
    });
});

module.exports = router;