require("dotenv").config();

const { prismaClient, PrismaClient } = require("@prisma/client");
const express = require("express");

const prisma = new PrismaClient();
const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello World !!")
});

app.get('/products', async(req, res) => {
    const products = await prisma.product.findMany();

    res.send(products);
});

app.get('/products/:id', async(req, res) => {
    const productId = req.params.id;

    const product = await prisma.product.findUnique({
        where: {
            id: parseInt(productId),
        },
    });

    res.send(product)
});

app.post('/products', async(req, res) => {
    const newDataProducts = req.body;
   
    const product = await prisma.product.create({
        data: {
            name: newDataProducts.name,
            description: newDataProducts.description,
            price: newDataProducts.price,
            image: newDataProducts.image            
        },
    });

    res.send({
        message: "Create Product Success",
        data: product
    })
});

app.delete('/products/:id', async(req, res) => {
    const productId = req.params.id; // String

    await prisma.product.delete({
        where: {
                id: parseInt(productId), // change string to integer
            },
        });
    
    res.send("product deleted")
});


app.put('/products/:id', async(req, res) => {
    const productId = req.params.id;
    const productData = req.body;
    
    const product = await prisma.product.update({
        where: {
            id: parseInt(productId),
        },
        data: {
            description: productData.description,
            image: productData.image,
            name: productData.name,
            price: productData.price,
        },
    })

    res.send({
        data: product,
        message: "edit product success !"
    })
});

app.patch('/products/:id', async(req, res) => {
    const productId = req.params.id;
    const productData = req.body;
    
    const product = await prisma.product.update({
        where: {
            id: parseInt(productId),
        },
        data: {
            description: productData.description,
            image: productData.image,
            name: productData.name,
            price: productData.price,
        },
    })

    res.send({
        data: product,
        message: "edit product success !"
    })
})

app.listen(PORT, () => {
    console.log(`server is runing at port : ${PORT}`)
  });