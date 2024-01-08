const express = require('express');

const { getProductById, createProduct, deletProductById, editProductById } = require('./product.service');

const router = express.Router();

router.get('/:id', async(req, res) => {
    try {
        const productId = parseInt(req.params.id);
    
        const product = await getProductById(productId);
    
        res.send(product)
        
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.post('/add', async(req, res) => {
    try {
        const newProductData = req.body;
       
        const product = await createProduct(newProductData)
        res.session.message = {
            message: "Create Product Success",
            data: product
        };
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