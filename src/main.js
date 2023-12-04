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

app.listen(PORT, ()=>{
    console.log(`server is runing at port : ${PORT}`)
  });