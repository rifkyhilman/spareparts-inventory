const express = require('express');
const multer = require('multer');
const path = require('path');


const { getProductById, createProduct, deletProductById, editProductById } = require('./product.service');

const router = express.Router();

// image upload
var Storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../uploads"));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + "_" + path.extname(file.originalname));
    },
});

var upload = multer({
    storage: Storage,
}).single("image");




router.get('/:id', async(req, res) => {
    try {
        const productId = parseInt(req.params.id);
    
        const product = await getProductById(productId);
    
        res.send(product)
        
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.post('/add', upload, async(req, res) => {
    try {
        
        const newProductData = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: req.file.filename,
        };

        
        console.log(newProductData);

        const product = await createProduct(newProductData);

        res.session.message = {
            type: "success",
            message: "User added successfully!",
        };
        res.send(product);
        res.redirect('/');
    } catch (err) {
        res.json({
            message: err.message,
            type: "danger"
        });
    }
});

router.get('/delete/:id', async(req, res) => {
    try {
        const productId = req.params.id; // String
    
        await deletProductById(parseInt(productId));
        
        res.redirect('/');
        
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.put('/:id', async(req, res) => {
    try {
        const productId = req.params.id;
        const productData = req.body;

        if(
            !(
                productData.image &&
                productData.description &&
                productData.name &&
                productData.price
            )
        ) {
            return res.status(400).send("Some fields are missing");
        }
        
        const product = await editProductById(parseInt(productId), productData);
        
        res.send({
            data: product,
            message: "edit product success !"
        })
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.patch('/:id', async(req, res) => {
    try {
        const productId = req.params.id;
        const productData = req.body;
        
        const product = await editProductById(parseInt(productId), productData);
    
        res.send({
            data: product,
            message: "edit product success !"
        });
    } catch (err) {
        res.status(400).send(err.message);
    };
});

module.exports = router;